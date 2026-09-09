import { extractCopyLinks, parseCopyLink } from "@/lib/copy-link";
import { env } from "@/lib/env.server";
import type { CatalogSource, NormalizedBase, SourceFetchResult } from "./types";

const SOURCE_ID = "openlayout-rss";
const USER_AGENT = "ClashMap/1.0 (layout-rss; +https://grok.com)";

function decodeXml(s: string): string {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .replace(/&/g, "&")
    .replace(/"/g, '"')
    .replace(/&#39;/g, "'");
}

function tag(block: string, name: string): string | null {
  const re = new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, "i");
  const m = block.match(re);
  return m ? decodeXml(m[1]).trim() : null;
}

function parseFeed(xml: string, feedUrl: string): NormalizedBase[] {
  const items: NormalizedBase[] = [];
  const chunks = xml.split(/<item[\s>]/i).slice(1);
  const entries = chunks.length ? chunks : xml.split(/<entry[\s>]/i).slice(1);
  for (const chunk of entries) {
    const title = tag(chunk, "title") ?? "Layout";
    const link =
      chunk.match(/<link[^>]+href=["']([^"']+)["']/i)?.[1] ?? tag(chunk, "link");
    const body = [title, tag(chunk, "description"), tag(chunk, "content"), chunk].join("\n");
    const pub = tag(chunk, "pubDate") ?? tag(chunk, "updated") ?? tag(chunk, "published");
    const image =
      chunk.match(/<media:content[^>]+url=["']([^"']+)["']/i)?.[1] ??
      chunk.match(/<img[^>]+src=["']([^"']+)["']/i)?.[1] ??
      null;
    const urls = extractCopyLinks(body);
    urls.forEach((copyUrl, idx) => {
      const parsed = parseCopyLink(copyUrl);
      if (!parsed) return;
      const sourceId = `${parsed.layoutKey}:${idx}`;
      items.push({
        source: SOURCE_ID,
        sourceId,
        name: title.slice(0, 120),
        townHall: parsed.townHall,
        sourceType: parsed.slot === "WB" ? "War" : null,
        copyUrl: parsed.copyUrl,
        imageUrl: image,
        builder: feedUrl,
        description: tag(chunk, "description")?.replace(/<[^>]+>/g, " ").slice(0, 400) ?? null,
        tags: ["rss"],
        publishedAt: pub,
      });
    });
    if (!urls.length && link) {
      const parsed = parseCopyLink(link);
      if (parsed) {
        items.push({
          source: SOURCE_ID,
          sourceId: parsed.layoutKey,
          name: title.slice(0, 120),
          townHall: parsed.townHall,
          sourceType: parsed.slot === "WB" ? "War" : null,
          copyUrl: parsed.copyUrl,
          imageUrl: image,
          builder: feedUrl,
          description: null,
          tags: ["rss"],
          publishedAt: pub,
        });
      }
    }
  }
  return items;
}

export function rssLayoutSource(): CatalogSource {
  return {
    id: SOURCE_ID,
    label: "OpenLayout RSS",
    async fetch(): Promise<SourceFetchResult> {
      const raw = env("LAYOUT_RSS_FEEDS");
      const feeds = (raw ?? "")
        .split(",")
        .map((s) => s.trim())
        .filter((s) => /^https:\/\//i.test(s));
      if (!feeds.length) {
        return { source: SOURCE_ID, items: [], warning: "no-feeds-configured" };
      }
      const items: NormalizedBase[] = [];
      const errors: string[] = [];
      for (const feed of feeds) {
        try {
          const res = await fetch(feed, {
            headers: { "User-Agent": USER_AGENT, Accept: "application/rss+xml, application/atom+xml, text/xml" },
            redirect: "follow",
          });
          if (!res.ok) {
            errors.push(`${feed} → ${res.status}`);
            continue;
          }
          const xml = await res.text();
          items.push(...parseFeed(xml, feed));
        } catch (err) {
          errors.push(`${feed} → ${err instanceof Error ? err.message : "error"}`);
        }
      }
      return {
        source: SOURCE_ID,
        items,
        warning: errors.length ? errors.join("; ") : null,
      };
    },
  };
}
