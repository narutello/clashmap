const OPEN_LAYOUT_HOST = /(?:^|\.)clashofclans\.com$/i;

export type ParsedCopyLink = {
  copyUrl: string;
  layoutKey: string;
  townHall: number | null;
  slot: string | null;
};

export function normalizeCopyUrl(raw: string): string | null {
  try {
    const url = new URL(raw.trim());
    if (!OPEN_LAYOUT_HOST.test(url.hostname) && url.hostname !== "link.clashofclans.com") {
      if (!/clashofclans\.com$/i.test(url.hostname)) return null;
    }
    const action = url.searchParams.get("action");
    const id = url.searchParams.get("id");
    if (!id) return null;
    if (action && action !== "OpenLayout") return null;
    const decoded = decodeURIComponent(id);
    url.searchParams.set("action", "OpenLayout");
    url.searchParams.set("id", decoded);
    url.protocol = "https:";
    url.hostname = "link.clashofclans.com";
    url.pathname = "/";
    url.hash = "";
    return url.toString();
  } catch {
    return null;
  }
}

export function parseCopyLink(raw: string): ParsedCopyLink | null {
  const copyUrl = normalizeCopyUrl(raw);
  if (!copyUrl) return null;
  try {
    const url = new URL(copyUrl);
    const id = url.searchParams.get("id") ?? "";
    const parts = id.split(":");
    const thRaw = parts[0]?.match(/^TH(\d{1,2})$/i)?.[1];
    const townHall = thRaw ? Number.parseInt(thRaw, 10) : null;
    const slot = parts[1]?.toUpperCase() ?? null;
    return { copyUrl, layoutKey: id, townHall, slot };
  } catch {
    return null;
  }
}

export function extractCopyLinks(text: string): string[] {
  const found = new Set<string>();
  const re =
    /https?:\/\/(?:link\.)?clashofclans\.com[^\s"'<>]*action=OpenLayout[^\s"'<>]*/gi;
  for (const match of text.match(re) ?? []) {
    const normalized = normalizeCopyUrl(match.replace(/[),.;]+$/, ""));
    if (normalized) found.add(normalized);
  }
  return [...found];
}
