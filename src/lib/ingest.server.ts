import { createHash } from "node:crypto";
import { getSql } from "@/lib/db";
import { env } from "@/lib/env.server";
import { categorizeBase, persianTitle } from "@/lib/categorize";
import { parseCopyLink } from "@/lib/copy-link";
import { githubCatalogSource } from "@/lib/sources/github-catalog.server";
import { rssLayoutSource } from "@/lib/sources/rss-layouts.server";
import type { CatalogSource, NormalizedBase } from "@/lib/sources/types";
import type { BaseType } from "@/lib/catalog";
import { isBaseType } from "@/lib/catalog";

export type IngestSummary = {
  startedAt: string;
  finishedAt: string;
  sources: Array<{
    source: string;
    status: "success" | "unchanged" | "error" | "skipped";
    inserted: number;
    skipped: number;
    error?: string | null;
  }>;
  inserted: number;
  skipped: number;
};

const globalRef = globalThis as typeof globalThis & {
  __clashmapIngest__?: Promise<IngestSummary>;
  __clashmapReady__?: Promise<void>;
};

function safeId(source: string, sourceId: string, layoutKey: string): string {
  if (/^[a-z0-9][a-z0-9-]{1,80}$/i.test(sourceId)) return sourceId;
  const hash = createHash("sha1").update(`${source}:${layoutKey}`).digest("hex").slice(0, 16);
  return `b-${hash}`;
}

function extraJsonSources(): CatalogSource[] {
  const raw = env("EXTRA_CATALOG_URLS");
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter((s) => /^https:\/\//i.test(s))
    .map((url, i) => {
      const src = githubCatalogSource(url);
      return {
        ...src,
        id: `extra-catalog-${i + 1}`,
        label: `Extra catalog ${i + 1}`,
      };
    });
}

export function catalogSources(): CatalogSource[] {
  return [githubCatalogSource(), rssLayoutSource(), ...extraJsonSources()];
}

type InsertRow = {
  id: string;
  source: string;
  source_id: string;
  layout_key: string;
  copy_url: string;
  title: string;
  title_fa: string;
  town_hall: number;
  base_type: BaseType;
  tags: string[];
  image_url: string | null;
  builder: string | null;
  description: string | null;
  source_published_at: string | null;
};

function toInsertRow(item: NormalizedBase): InsertRow | null {
  const parsed = parseCopyLink(item.copyUrl);
  if (!parsed) return null;
  const cat = categorizeBase({
    sourceType: item.sourceType,
    tags: item.tags,
    name: item.name,
    description: item.description,
    slot: parsed.slot,
    townHall: item.townHall ?? parsed.townHall,
  });
  const th = cat.townHall;
  if (!th || th < 4 || th > 18) return null;
  const type: BaseType = isBaseType(cat.baseType) ? cat.baseType : "other";
  const published = item.publishedAt ? new Date(item.publishedAt) : null;
  const publishedIso =
    published && !Number.isNaN(published.getTime()) ? published.toISOString() : null;
  return {
    id: safeId(item.source, item.sourceId, parsed.layoutKey),
    source: item.source,
    source_id: item.sourceId,
    layout_key: parsed.layoutKey,
    copy_url: parsed.copyUrl,
    title: item.name.slice(0, 180),
    title_fa: persianTitle(th, type, item.name).slice(0, 220),
    town_hall: th,
    base_type: type,
    tags: cat.tags.slice(0, 24),
    image_url: item.imageUrl,
    builder: item.builder,
    description: item.description?.slice(0, 800) ?? null,
    source_published_at: publishedIso,
  };
}

async function insertBatch(items: NormalizedBase[]): Promise<{ inserted: number; skipped: number }> {
  const sql = await getSql();
  const prepared: InsertRow[] = [];
  let skipped = 0;
  const seen = new Set<string>();
  for (const item of items) {
    const row = toInsertRow(item);
    if (!row) {
      skipped += 1;
      continue;
    }
    if (seen.has(row.layout_key) || seen.has(row.id)) {
      skipped += 1;
      continue;
    }
    seen.add(row.layout_key);
    seen.add(row.id);
    prepared.push(row);
  }
  if (!prepared.length) return { inserted: 0, skipped };

  let inserted = 0;
  const chunkSize = 400;
  for (let i = 0; i < prepared.length; i += chunkSize) {
    const chunk = prepared.slice(i, i + chunkSize);
    const result = await sql.query<{ id: string }>(
      `insert into bases (
         id, source, source_id, layout_key, copy_url, title, title_fa,
         town_hall, base_type, tags, image_url, builder, description, source_published_at
       )
       select
         id, source, source_id, layout_key, copy_url, title, title_fa,
         town_hall, base_type, tags::jsonb, image_url, builder, description, source_published_at
       from jsonb_to_recordset($1::jsonb) as x(
         id text, source text, source_id text, layout_key text, copy_url text,
         title text, title_fa text, town_hall int, base_type text, tags text,
         image_url text, builder text, description text, source_published_at timestamptz
       )
       on conflict do nothing
       returning id`,
      [JSON.stringify(chunk.map((r) => ({ ...r, tags: JSON.stringify(r.tags) })))],
    );
    inserted += result.length;
    skipped += chunk.length - result.length;
  }
  return { inserted, skipped };
}

export async function runIngest(): Promise<IngestSummary> {
  if (globalRef.__clashmapIngest__) return globalRef.__clashmapIngest__;
  const run = (async () => {
    const startedAt = new Date();
    const sql = await getSql();
    const sources = catalogSources();
    const summary: IngestSummary = {
      startedAt: startedAt.toISOString(),
      finishedAt: startedAt.toISOString(),
      sources: [],
      inserted: 0,
      skipped: 0,
    };

    for (const source of sources) {
      const logRows = await sql<{ id: number }>`
        insert into ingest_logs (source, status) values (${source.id}, ${"running"})
        returning id
      `;
      const logId = logRows[0]?.id;
      const state = await sql<{ last_etag: string | null }>`
        select last_etag from ingest_state where source = ${source.id}
      `;
      try {
        const result = await source.fetch({ etag: state[0]?.last_etag ?? null });
        if (result.skippedUnchanged) {
          if (logId) {
            await sql`
              update ingest_logs
                 set finished_at = now(), status = ${"unchanged"},
                     details = ${JSON.stringify({ warning: result.warning })}::jsonb
               where id = ${logId}
            `;
          }
          summary.sources.push({
            source: source.id,
            status: "unchanged",
            inserted: 0,
            skipped: 0,
          });
          continue;
        }
        const { inserted, skipped } = await insertBatch(result.items);
        await sql`
          insert into ingest_state (source, last_success_at, last_etag, total_inserted)
          values (${source.id}, now(), ${result.etag ?? null}, ${inserted})
          on conflict (source) do update set
            last_success_at = now(),
            last_etag = coalesce(excluded.last_etag, ingest_state.last_etag),
            last_error = null,
            total_inserted = ingest_state.total_inserted + excluded.total_inserted
        `;
        if (logId) {
          await sql`
            update ingest_logs
               set finished_at = now(),
                   status = ${"success"},
                   inserted_count = ${inserted},
                   skipped_count = ${skipped},
                   details = ${JSON.stringify({ warning: result.warning, fetched: result.items.length })}::jsonb
             where id = ${logId}
          `;
        }
        summary.sources.push({
          source: source.id,
          status: "success",
          inserted,
          skipped,
          error: result.warning,
        });
        summary.inserted += inserted;
        summary.skipped += skipped;
      } catch (err) {
        const message = err instanceof Error ? err.message : "خطای ناشناخته در جمع‌آوری داده";
        console.error(`[ingest] ${source.id} failed:`, err);
        await sql`
          insert into ingest_state (source, last_error_at, last_error, total_inserted)
          values (${source.id}, now(), ${message}, 0)
          on conflict (source) do update set last_error_at = now(), last_error = excluded.last_error
        `;
        if (logId) {
          await sql`
            update ingest_logs
               set finished_at = now(), status = ${"error"}, error_message = ${message}
             where id = ${logId}
          `;
        }
        summary.sources.push({
          source: source.id,
          status: "error",
          inserted: 0,
          skipped: 0,
          error: message,
        });
      }
    }
    summary.finishedAt = new Date().toISOString();
    return summary;
  })().finally(() => {
    globalRef.__clashmapIngest__ = undefined;
  });
  globalRef.__clashmapIngest__ = run;
  return run;
}

export async function ensureCatalogReady(): Promise<void> {
  if (globalRef.__clashmapReady__) return globalRef.__clashmapReady__;
  globalRef.__clashmapReady__ = (async () => {
    const sql = await getSql();
    const rows = await sql<{ n: number }>`select count(*)::int as n from bases`;
    if ((rows[0]?.n ?? 0) > 0) return;
    await runIngest();
  })().catch((err) => {
    globalRef.__clashmapReady__ = undefined;
    throw err;
  });
  return globalRef.__clashmapReady__;
}
