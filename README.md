# کلش‌مپ (ClashMap)

Persian, RTL, mobile-first web app for discovering Clash of Clans base layouts and copying them into the game with one tap.

This content is not affiliated with, endorsed, sponsored, or specifically approved by Supercell. Clash of Clans is a trademark of Supercell. See [Supercell’s Fan Content Policy](https://supercell.com/en/fan-content-policy/).

## What it does

- Browse bases by Town Hall (TH4–TH18) and type (war, trophy, farming, hybrid, legend, anti-2, anti-3)
- Combine filters, e.g. Town Hall 17 + war
- Search across titles, builders, tags and descriptions
- Copy the official `link.clashofclans.com` OpenLayout URL
- Track copy counts for popular and trending lists
- Daily automatic ingest from permitted sources
- Installable PWA, dark/light mode, Persian SEO pages

## Data sources (investigated before ingest)

| Source | API? | Automated retrieval | Used? |
| --- | --- | --- | --- |
| Official Clash of Clans API (`api.clashofclans.com`) | Yes | Permitted with a developer token | **No** — no layout endpoints |
| `nschmeller/clash-bases` `bases.json` | GitHub raw JSON | MIT licensed public dataset | **Primary** |
| Extra JSON catalogs (`EXTRA_CATALOG_URLS`) | JSON | Only URLs you control / have rights to | Optional |
| RSS/Atom feeds containing OpenLayout links (`LAYOUT_RSS_FEEDS`) | RSS | Public feeds you configure | Optional |
| Reddit `.json` / unofficial scrape | Unofficial | **Not permitted** without Reddit Data API approval | **No** |
| Third-party layout sites (cocbases, basemelon, clashbases.de, …) | HTML | Scraping typically violates their terms | **No** |

The primary catalog is fetched over HTTPS, deduplicated by the official layout id (`TH18:WB:…`), and stored with the discovery timestamp. Unavailable sources are logged; existing rows are kept.

Duplicates are blocked by unique `layout_key` (normalized OpenLayout id) and unique `(source, source_id)`.

Town Hall and type are taken from the source when present, otherwise inferred from the OpenLayout slot (`WB` / `HV`), title and tags. Overrides live on the row (`town_hall_override`, `base_type_override`) so classifications can be corrected later.

## Daily updates

- Vercel Cron hits `GET/POST /api/cron/sync` at `0 3 * * *` (`vercel.json`)
- Empty databases ingest automatically on first request
- Set `CRON_SECRET` in production so the route requires `Authorization: Bearer …` (Vercel Cron is still accepted via `x-vercel-cron`)

## Stack

TanStack Start, React 19, Tailwind v4, Postgres (Neon in production, PGLite in preview). Auth is off; catalog rows are shared world data.

## Environment

Copy `env.example`. Do not put secrets in the client. `DATABASE_URL` is injected on deploy.

## Scripts

- `npm run dev` — development server
- `npm run build` — production build + migrations
- `npm run typecheck` — TypeScript
- `node --experimental-strip-types --test src/lib/catalog.test.ts` — ingest/categorize unit tests
