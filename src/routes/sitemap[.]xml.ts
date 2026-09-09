import { createFileRoute } from "@tanstack/react-router";
import { BASE_TYPES, TOWN_HALLS } from "@/lib/catalog";

function xmlEscape(s: string): string {
  return s.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">");
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { sitemapEntries } = await import("@/lib/bases.server");
        const origin = new URL(request.url).origin;
        const staticPaths = [
          "/",
          "/latest",
          "/popular",
          "/trending",
          "/search",
          "/how-to",
          ...TOWN_HALLS.map((th) => `/th/${th}`),
          ...BASE_TYPES.map((t) => `/type/${t}`),
          ...TOWN_HALLS.flatMap((th) => BASE_TYPES.map((t) => `/th/${th}/${t}`)),
        ];
        const bases = await sitemapEntries(3000);
        const urls = [
          ...staticPaths.map((loc) => ({ loc, lastmod: new Date().toISOString().slice(0, 10) })),
          ...bases,
        ];
        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url><loc>${xmlEscape(origin + u.loc)}</loc><lastmod>${u.lastmod}</lastmod></url>`,
  )
  .join("\n")}
</urlset>`;
        return new Response(body, {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
