import { getSql } from "@/lib/db";
import {
  BASE_TYPES,
  PAGE_SIZE,
  type BaseCard,
  type BaseDetail,
  type BaseType,
  type SortKey,
  isBaseType,
} from "@/lib/catalog";
import { ensureCatalogReady } from "@/lib/ingest.server";

export type ListQuery = {
  townHall?: number | null;
  baseType?: BaseType | null;
  sort?: SortKey;
  q?: string | null;
  offset?: number;
  limit?: number;
};

type BaseRow = {
  id: string;
  title: string;
  title_fa: string;
  town_hall: number;
  town_hall_override: number | null;
  base_type: string;
  base_type_override: string | null;
  tags: unknown;
  image_url: string | null;
  copy_url: string;
  builder: string | null;
  discovered_at: string;
  copy_count: number;
  description: string | null;
  description_fa: string | null;
  source: string;
  source_published_at: string | null;
  view_count: number;
  last_copied_at: string | null;
  recent_copies: number | null;
};

function parseTags(raw: unknown): string[] {
  if (Array.isArray(raw)) return raw.filter((t): t is string => typeof t === "string");
  if (typeof raw === "string") {
    try {
      const v = JSON.parse(raw) as unknown;
      return Array.isArray(v) ? v.filter((t): t is string => typeof t === "string") : [];
    } catch {
      return [];
    }
  }
  return [];
}

function toCard(row: BaseRow, trendingIds: Set<string>): BaseCard {
  const typeRaw = row.base_type_override ?? row.base_type;
  return {
    id: row.id,
    title: row.title,
    titleFa: row.title_fa,
    townHall: row.town_hall_override ?? row.town_hall,
    baseType: isBaseType(typeRaw) ? typeRaw : "other",
    tags: parseTags(row.tags),
    imageUrl: row.image_url,
    copyUrl: row.copy_url,
    builder: row.builder,
    discoveredAt: typeof row.discovered_at === "string" ? row.discovered_at : String(row.discovered_at),
    copyCount: Number(row.copy_count) || 0,
    trending: trendingIds.has(row.id) || (Number(row.recent_copies) || 0) >= 3,
  };
}

function toDetail(row: BaseRow, trendingIds: Set<string>): BaseDetail {
  return {
    ...toCard(row, trendingIds),
    description: row.description,
    descriptionFa: row.description_fa,
    source: row.source,
    sourcePublishedAt: row.source_published_at,
    viewCount: Number(row.view_count) || 0,
    lastCopiedAt: row.last_copied_at,
  };
}

async function trendingIdSet(sql: Awaited<ReturnType<typeof getSql>>): Promise<Set<string>> {
  const rows = await sql<{ base_id: string }>`
    select base_id
      from copy_events
     where copied_at > now() - interval '7 days'
     group by base_id
     having count(*) >= 2
     order by count(*) desc
     limit 48
  `;
  return new Set(rows.map((r) => r.base_id));
}

function filtersSql(query: ListQuery): { where: string; params: unknown[] } {
  const clauses: string[] = [];
  const params: unknown[] = [];

  if (query.townHall) {
    params.push(query.townHall);
    clauses.push(`coalesce(town_hall_override, town_hall) = $${params.length}`);
  }
  if (query.baseType) {
    params.push(query.baseType);
    const i = params.length;
    clauses.push(
      `(coalesce(base_type_override, base_type) = $${i} or tags @> jsonb_build_array($${i}::text))`,
    );
  }
  if (query.q && query.q.trim()) {
    const q = `%${query.q.trim().slice(0, 80)}%`;
    params.push(q);
    const i = params.length;
    clauses.push(
      `(title ilike $${i} or title_fa ilike $${i} or coalesce(description,'') ilike $${i} or coalesce(builder,'') ilike $${i} or tags::text ilike $${i})`,
    );
  }
  return { where: clauses.length ? `where ${clauses.join(" and ")}` : "", params };
}

function orderSql(sort: SortKey | undefined): string {
  switch (sort) {
    case "popular":
      return `order by copy_count desc,
        coalesce(town_hall_override, town_hall) desc,
        discovered_at desc`;
    case "trending":
      return `order by recent_copies desc, copy_count desc, coalesce(town_hall_override, town_hall) desc, discovered_at desc`;
    default:
      return `order by coalesce(source_published_at, discovered_at) desc, coalesce(town_hall_override, town_hall) desc, discovered_at desc`;
  }
}

const SELECT_COLS = `
  id, title, title_fa,
  town_hall, town_hall_override, base_type, base_type_override,
  tags, image_url, copy_url, builder, discovered_at, copy_count,
  description, description_fa, source, source_published_at, view_count, last_copied_at,
  (
    select count(*)::int from copy_events ce
     where ce.base_id = bases.id and ce.copied_at > now() - interval '7 days'
  ) as recent_copies
`;

export async function listBases(query: ListQuery): Promise<{
  items: BaseCard[];
  total: number;
  offset: number;
}> {
  await ensureCatalogReady();
  const sql = await getSql();
  const limit = Math.min(Math.max(query.limit ?? PAGE_SIZE, 1), 48);
  const offset = Math.max(query.offset ?? 0, 0);
  const { where, params } = filtersSql(query);
  const sort = query.sort ?? "latest";

  const countRows = await sql.query<{ n: number }>(
    `select count(*)::int as n from bases ${where}`,
    params,
  );
  const total = countRows[0]?.n ?? 0;

  const limitIdx = params.length + 1;
  const offsetIdx = params.length + 2;
  const items = await sql.query<BaseRow>(
    `select ${SELECT_COLS} from bases ${where} ${orderSql(sort)} limit $${limitIdx} offset $${offsetIdx}`,
    [...params, limit, offset],
  );
  const trending = await trendingIdSet(sql);
  return { items: items.map((r) => toCard(r, trending)), total, offset };
}

export async function getBase(id: string): Promise<BaseDetail | null> {
  await ensureCatalogReady();
  const sql = await getSql();
  const rows = await sql.query<BaseRow>(
    `select ${SELECT_COLS} from bases where id = $1 limit 1`,
    [id],
  );
  const row = rows[0];
  if (!row) return null;
  await sql.query(`update bases set view_count = view_count + 1 where id = $1`, [id]);
  const trending = await trendingIdSet(sql);
  return toDetail(row, trending);
}

export async function relatedBases(base: BaseDetail, limit = 6): Promise<BaseCard[]> {
  const sql = await getSql();
  const rows = await sql.query<BaseRow>(
    `select ${SELECT_COLS} from bases
      where id <> $1
        and coalesce(town_hall_override, town_hall) = $2
        and coalesce(base_type_override, base_type) = $3
      order by copy_count desc, discovered_at desc
      limit $4`,
    [base.id, base.townHall, base.baseType, limit],
  );
  const trending = await trendingIdSet(sql);
  return rows.map((r) => toCard(r, trending));
}

export async function recordCopy(id: string): Promise<{ copyCount: number; copyUrl: string } | null> {
  const sql = await getSql();
  const updated = await sql.query<{ copy_count: number; copy_url: string }>(
    `update bases
        set copy_count = copy_count + 1, last_copied_at = now()
      where id = $1
      returning copy_count, copy_url`,
    [id],
  );
  const row = updated[0];
  if (!row) return null;
  await sql.query(`insert into copy_events (base_id) values ($1)`, [id]);
  return { copyCount: Number(row.copy_count) || 0, copyUrl: row.copy_url };
}

export async function reportBase(id: string, reason: string): Promise<boolean> {
  const sql = await getSql();
  const exists = await sql.query<{ id: string }>(`select id from bases where id = $1`, [id]);
  if (!exists[0]) return false;
  await sql.query(`insert into base_reports (base_id, reason) values ($1, $2)`, [
    id,
    reason.slice(0, 200),
  ]);
  return true;
}

export async function homeSections(): Promise<{
  today: BaseCard[];
  popular: BaseCard[];
  trending: BaseCard[];
  counts: { total: number; today: number };
  lastSync: string | null;
}> {
  await ensureCatalogReady();
  const sql = await getSql();
  const trendingIds = await trendingIdSet(sql);

  const [today, popular, trending, totals, sync] = await Promise.all([
    sql.query<BaseRow>(
      `select ${SELECT_COLS} from bases
        order by coalesce(source_published_at, discovered_at) desc,
                 coalesce(town_hall_override, town_hall) desc
        limit 8`,
    ),
    sql.query<BaseRow>(
      `select ${SELECT_COLS} from bases
        order by copy_count desc, coalesce(town_hall_override, town_hall) desc, discovered_at desc
        limit 8`,
    ),
    sql.query<BaseRow>(
      `select ${SELECT_COLS} from bases
        order by recent_copies desc, copy_count desc, coalesce(town_hall_override, town_hall) desc
        limit 8`,
    ),
    sql.query<{ total: number; today: number }>(
      `select
         count(*)::int as total,
         count(*) filter (where coalesce(town_hall_override, town_hall) = 18)::int as today
       from bases`,
    ),
    sql.query<{ last_success_at: string | null }>(
      `select last_success_at from ingest_state order by last_success_at desc nulls last limit 1`,
    ),
  ]);

  return {
    today: today.map((r) => toCard(r, trendingIds)),
    popular: popular.map((r) => toCard(r, trendingIds)),
    trending: trending.map((r) => toCard(r, trendingIds)),
    counts: { total: totals[0]?.total ?? 0, today: totals[0]?.today ?? 0 },
    lastSync: sync[0]?.last_success_at ?? null,
  };
}

export async function countsByTownHall(): Promise<Array<{ townHall: number; n: number }>> {
  await ensureCatalogReady();
  const sql = await getSql();
  const rows = await sql<{ th: number; n: number }>`
    select coalesce(town_hall_override, town_hall) as th, count(*)::int as n
      from bases
     group by 1
     order by 1 desc
  `;
  return rows.map((r) => ({ townHall: r.th, n: r.n }));
}

export async function countsByType(): Promise<Array<{ type: BaseType; n: number }>> {
  await ensureCatalogReady();
  const sql = await getSql();
  const out: Array<{ type: BaseType; n: number }> = [];
  for (const type of BASE_TYPES) {
    const rows = await sql.query<{ n: number }>(
      `select count(*)::int as n from bases
        where coalesce(base_type_override, base_type) = $1
           or tags @> jsonb_build_array($1::text)`,
      [type],
    );
    out.push({ type, n: rows[0]?.n ?? 0 });
  }
  return out;
}

export async function sitemapEntries(limit = 4000): Promise<
  Array<{ loc: string; lastmod: string }>
> {
  await ensureCatalogReady();
  const sql = await getSql();
  const rows = await sql<{ id: string; discovered_at: string }>`
    select id, discovered_at from bases
     order by discovered_at desc
     limit ${limit}
  `;
  return rows.map((r) => ({
    loc: `/base/${r.id}`,
    lastmod: String(r.discovered_at).slice(0, 10),
  }));
}
