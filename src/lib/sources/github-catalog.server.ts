import { parseCopyLink } from "@/lib/copy-link";
import type { CatalogSource, NormalizedBase, SourceFetchResult } from "./types";

const DEFAULT_URL =
  "https://raw.githubusercontent.com/nschmeller/clash-bases/main/bases.json";
const SOURCE_ID = "github-clash-bases";
const USER_AGENT = "ClashMap/1.0 (base-catalog; +https://grok.com; MIT catalog ingest)";

type RawEntry = {
  id?: unknown;
  name?: unknown;
  town_hall?: unknown;
  type?: unknown;
  link?: unknown;
  image?: unknown;
  builder?: unknown;
  description?: unknown;
  tags?: unknown;
  added?: unknown;
};

function asString(v: unknown): string | null {
  return typeof v === "string" && v.trim() ? v.trim() : null;
}

function mapEntry(raw: RawEntry): NormalizedBase | null {
  const sourceId = asString(raw.id);
  const name = asString(raw.name);
  const link = asString(raw.link);
  if (!sourceId || !name || !link) return null;
  const parsed = parseCopyLink(link);
  if (!parsed) return null;
  const tags = Array.isArray(raw.tags)
    ? raw.tags.filter((t): t is string => typeof t === "string" && t.length < 48)
    : [];
  const th =
    typeof raw.town_hall === "number"
      ? raw.town_hall
      : parsed.townHall;
  return {
    source: SOURCE_ID,
    sourceId,
    name,
    townHall: th,
    sourceType: asString(raw.type),
    copyUrl: parsed.copyUrl,
    imageUrl: asString(raw.image),
    builder: asString(raw.builder),
    description: asString(raw.description),
    tags,
    publishedAt: asString(raw.added),
  };
}

export function githubCatalogSource(url = DEFAULT_URL): CatalogSource {
  return {
    id: SOURCE_ID,
    label: "GitHub Clash Bases (MIT)",
    async fetch({ etag }): Promise<SourceFetchResult> {
      const headers: Record<string, string> = {
        Accept: "application/json",
        "User-Agent": USER_AGENT,
      };
      if (etag) headers["If-None-Match"] = etag;
      const token = process.env.GITHUB_TOKEN?.trim();
      if (token) headers.Authorization = `Bearer ${token}`;

      const res = await fetch(url, { headers, redirect: "follow" });
      if (res.status === 304) {
        return { source: SOURCE_ID, items: [], etag: etag ?? null, skippedUnchanged: true };
      }
      if (!res.ok) {
        throw new Error(`کاتالوگ گیت‌هاب پاسخ ${res.status} داد`);
      }
      const nextEtag = res.headers.get("etag");
      const json: unknown = await res.json();
      const list = Array.isArray(json)
        ? json
        : json && typeof json === "object" && Array.isArray((json as { bases?: unknown }).bases)
          ? (json as { bases: RawEntry[] }).bases
          : null;
      if (!list) throw new Error("ساختار کاتالوگ گیت‌هاب نامعتبر است");

      const items: NormalizedBase[] = [];
      for (const entry of list) {
        if (!entry || typeof entry !== "object") continue;
        const mapped = mapEntry(entry as RawEntry);
        if (mapped) items.push(mapped);
      }
      return { source: SOURCE_ID, items, etag: nextEtag };
    },
  };
}
