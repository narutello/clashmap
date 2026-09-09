import { l as isBaseType } from "./catalog-DAYv4YM6.mjs";
import { t as env } from "./env.server-DPOgKb4J.mjs";
import { createHash } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/ingest.server-loOY8Pcl.js
var _0002_bases_default = "-- Clash of Clans base catalogue. Rows are unowned (no user_id): shared world data.\n-- Future features (users, favorites, ratings) can join on bases.id without a rewrite.\n\ncreate table if not exists bases (\n  id                   text primary key,\n  source               text not null,\n  source_id            text not null,\n  layout_key           text not null,\n  copy_url             text not null,\n  title                text not null,\n  title_fa             text not null,\n  town_hall            integer not null,\n  town_hall_override   integer,\n  base_type            text not null,\n  base_type_override   text,\n  tags                 jsonb not null default '[]'::jsonb,\n  image_url            text,\n  builder              text,\n  description          text,\n  description_fa       text,\n  discovered_at        timestamptz not null default now(),\n  source_published_at  timestamptz,\n  copy_count           integer not null default 0,\n  view_count           integer not null default 0,\n  last_copied_at       timestamptz,\n  metadata             jsonb not null default '{}'::jsonb,\n  unique (layout_key),\n  unique (source, source_id)\n);\n\ncreate index if not exists bases_th_type_idx\n  on bases (coalesce(town_hall_override, town_hall), coalesce(base_type_override, base_type));\ncreate index if not exists bases_discovered_idx on bases (discovered_at desc);\ncreate index if not exists bases_copies_idx on bases (copy_count desc);\ncreate index if not exists bases_last_copied_idx on bases (last_copied_at desc nulls last);\ncreate index if not exists bases_title_idx on bases (title);\n\ncreate table if not exists copy_events (\n  id         serial primary key,\n  base_id    text not null references bases(id) on delete cascade,\n  copied_at  timestamptz not null default now()\n);\ncreate index if not exists copy_events_base_time_idx on copy_events (base_id, copied_at desc);\ncreate index if not exists copy_events_time_idx on copy_events (copied_at desc);\n\ncreate table if not exists ingest_logs (\n  id              serial primary key,\n  source          text not null,\n  started_at      timestamptz not null default now(),\n  finished_at     timestamptz,\n  status          text not null,\n  inserted_count  integer not null default 0,\n  skipped_count   integer not null default 0,\n  error_message   text,\n  details         jsonb not null default '{}'::jsonb\n);\ncreate index if not exists ingest_logs_started_idx on ingest_logs (started_at desc);\n\ncreate table if not exists ingest_state (\n  source            text primary key,\n  last_success_at   timestamptz,\n  last_error_at     timestamptz,\n  last_etag         text,\n  last_error        text,\n  total_inserted    integer not null default 0\n);\n\ncreate table if not exists base_reports (\n  id          serial primary key,\n  base_id     text not null references bases(id) on delete cascade,\n  reason      text not null,\n  created_at  timestamptz not null default now()\n);\n\ncreate table if not exists category_corrections (\n  id          serial primary key,\n  base_id     text not null references bases(id) on delete cascade,\n  field       text not null,\n  old_value   text,\n  new_value   text not null,\n  created_at  timestamptz not null default now()\n);\n";
/**
* Migration bookkeeping shared by the two appliers — `scripts/migrate.mjs`
* (deploy, `readdir`) and `src/lib/db.ts` (PGLite preview, `import.meta.glob`).
*
* Applied files are keyed by BASENAME, so the same file applies once no matter
* which directory it is globbed from. That is what makes the auth schema safe to
* copy from `migrations/auth/` into `migrations/` when an app turns sign-in on:
* a database that already has `0001_auth.sql` will not re-run it.
*
* Neither applier descends into subdirectories, so `migrations/auth/*.sql` is
* out of scope for both until it is copied up.
*/
/**
* The `_migrations` key for a migration path (or bare filename).
* @param {string} path
* @returns {string}
*/
function migrationName(path) {
	return path.split("/").pop() ?? path;
}
/**
* @param {string} path
* @returns {boolean}
*/
function isMigrationFile(path) {
	return path.endsWith(".sql");
}
/**
* Migrations in `paths` that are not yet in `applied`, in apply order.
* Non-`.sql` entries (a `readdir` also yields `migrations/auth/`) are dropped.
* @param {Iterable<string>} paths
* @param {Iterable<string>} applied
* @returns {Array<{ name: string, path: string }>}
*/
function pendingMigrations(paths, applied) {
	const done = new Set(applied);
	return [...paths].filter(isMigrationFile).map((path) => ({
		name: migrationName(path),
		path
	})).sort((a, b) => a.name.localeCompare(b.name)).filter(({ name }) => !done.has(name));
}
var rawDatabaseUrl = typeof process !== "undefined" ? process.env.DATABASE_URL : void 0;
var databaseUrl = rawDatabaseUrl && rawDatabaseUrl.trim() ? rawDatabaseUrl : void 0;
/**
* Active backend: real **Neon** when `DATABASE_URL` is set (deployed / configured
* sandbox), otherwise a local embedded **PGLite** (Postgres compiled to WASM) so
* the app has a working database even with nothing configured — the live preview
* included. Swap in Neon later by just setting `DATABASE_URL`; no code changes.
*/
var dbSource = databaseUrl ? "neon" : "pglite";
/**
* Init state lives on globalThis as promises: dev HMR creates new instances of
* this module, and two instances racing module-level state would open a second
* pool or run two concurrent PGLite migration passes (whose duplicate
* `_migrations` insert rejects — and would get memoized, poisoning every later
* `getSql()`). A failed init clears its slot so the next call retries.
*/
var globalRef$1 = globalThis;
/**
* Result-type parity: Postgres sends every value as text plus a type OID — the
* JS value is the DRIVER's parsing choice, and pg and PGLite disagree (pg:
* int8 -> string, date -> local-midnight Date; PGLite: int8 -> BigInt, which
* JSON.stringify rejects, date -> UTC Date). Normalize both so preview and
* production return identical, JSON-safe shapes:
*   int8/bigint (incl. count(*)) -> number (past 2^53 loses precision — cast
*                                   `::text` if you ever need huge integers)
*   date                         -> 'YYYY-MM-DD' string
*   interval                     -> Postgres interval text
* numeric already comes back as a string on both (arbitrary precision).
*/
var OID_INT8 = 20;
var OID_DATE = 1082;
var OID_INTERVAL = 1186;
var identity = (v) => v;
/** Wrap a query runner in the tagged-template + `.query()` `Sql` surface. */
function toSql(run) {
	const sql = (async (strings, ...values) => {
		let text = strings[0];
		for (let i = 0; i < values.length; i += 1) text += `$${i + 1}${strings[i + 1]}`;
		return run(text, values);
	});
	sql.query = (text, params = []) => run(text, params);
	return sql;
}
function createNeonSql() {
	globalRef$1.__pgSqlPromise__ ??= (async () => {
		const { Pool, types } = await import("../_libs/pg.mjs").then((n) => n.t);
		types.setTypeParser(OID_INT8, Number);
		types.setTypeParser(OID_DATE, identity);
		types.setTypeParser(OID_INTERVAL, identity);
		const pool = new Pool({ connectionString: databaseUrl });
		return toSql(async (text, params) => {
			return (await pool.query(text, params)).rows;
		});
	})().catch((err) => {
		globalRef$1.__pgSqlPromise__ = void 0;
		throw err;
	});
	return globalRef$1.__pgSqlPromise__;
}
async function createPgliteSql() {
	globalRef$1.__pgliteInstance__ ??= (async () => {
		const { PGlite } = await import("../_libs/electric-sql__pglite.mjs").then((n) => n.t);
		const pg = new PGlite({ parsers: {
			[OID_INT8]: Number,
			[OID_DATE]: identity,
			[OID_INTERVAL]: identity
		} });
		await pg.waitReady;
		await pg.exec("create table if not exists _migrations (name text primary key, applied_at timestamptz not null default now())");
		return pg;
	})().catch((err) => {
		globalRef$1.__pgliteInstance__ = void 0;
		throw err;
	});
	const pg = await globalRef$1.__pgliteInstance__;
	const migrate = async () => {
		const migrations = /* #__PURE__ */ Object.assign({ "/migrations/0002_bases.sql": _0002_bases_default });
		const done = (await pg.query("select name from _migrations")).rows.map((r) => r.name);
		for (const { name, path } of pendingMigrations(Object.keys(migrations), done)) await pg.transaction(async (tx) => {
			await tx.exec(migrations[path]);
			await tx.query("insert into _migrations (name) values ($1)", [name]);
		});
	};
	const pass = (globalRef$1.__pgliteMigrateChain__ ?? Promise.resolve()).catch(() => void 0).then(migrate);
	globalRef$1.__pgliteMigrateChain__ = pass;
	await pass;
	return toSql(async (text, params) => {
		return (await pg.query(text, params)).rows;
	});
}
var sqlPromise = null;
async function createSql() {
	if (typeof window !== "undefined") throw new Error("@/lib/db is server-only — call getSql() from a createServerFn handler or a server route loader, never from client code.");
	return dbSource === "neon" ? createNeonSql() : createPgliteSql();
}
/**
* Get the shared, **server-only** SQL client. Neon when `DATABASE_URL` is set,
* otherwise the local PGLite fallback. Memoized — safe to call per request.
*
* Schema comes from `migrations/*.sql`, auto-applied before the first query on
* both backends — define tables there, never inline in server functions.
*/
function getSql() {
	sqlPromise ??= createSql().catch((err) => {
		sqlPromise = null;
		throw err;
	});
	return sqlPromise;
}
/**
* Finish DB bootstrap before the server handles traffic.
*
* - **PGLite** (preview / no `DATABASE_URL`): open the in-memory DB and apply
*   `migrations/*.sql`. Idempotent — concurrent callers share one promise.
* - **Neon**: no-op (pool is created lazily on first query).
*
* Vite `configureServer` awaits this at dev startup; production imports of this
* module kick it off immediately (see bottom of file).
*/
function ensureDbReady() {
	if (dbSource !== "pglite") return Promise.resolve();
	return getSql().then(() => void 0);
}
var globalBoot = globalThis;
if (typeof window === "undefined" && dbSource === "pglite") globalBoot.__pgBootstrapPromise__ ??= ensureDbReady().catch((err) => {
	globalBoot.__pgBootstrapPromise__ = void 0;
	console.error("[db] PGLite bootstrap failed:", err);
	throw err;
});
var TYPE_ALIASES = {
	war: "war",
	wb: "war",
	cwl: "war",
	"war base": "war",
	trophy: "trophy",
	cup: "trophy",
	"trophy base": "trophy",
	farm: "farming",
	farming: "farming",
	"farming base": "farming",
	hv: "farming",
	progress: "farming",
	"progress-base": "farming",
	hybrid: "hybrid",
	"home village": "hybrid",
	legend: "legend",
	"legend league": "legend",
	legends: "legend",
	anti2: "anti2",
	"anti-2": "anti2",
	"anti-2-star": "anti2",
	"anti 2 star": "anti2",
	anti3: "anti3",
	"anti-3": "anti3",
	"anti-3-star": "anti3",
	"anti 3 star": "anti3",
	fun: "other",
	other: "other",
	troll: "other"
};
function norm(s) {
	return s.trim().toLowerCase().replace(/[_/]+/g, " ").replace(/\s+/g, " ");
}
function aliasType(value) {
	if (!value) return null;
	return TYPE_ALIASES[norm(value)] ?? null;
}
function categorizeBase(input) {
	const rawTags = (input.tags ?? []).map((t) => norm(t)).filter(Boolean);
	const blob = [
		input.name,
		input.description,
		input.sourceType,
		rawTags.join(" ")
	].filter(Boolean).join(" ").toLowerCase();
	const extra = [];
	if (/\blegend/.test(blob)) extra.push("legend");
	if (/anti[-\s]?2/.test(blob)) extra.push("anti2");
	if (/anti[-\s]?3/.test(blob) || /\banti\b/.test(blob) && /\bstars?\b/.test(blob)) extra.push("anti3");
	if (/\bcwl\b/.test(blob)) extra.push("war");
	if (/\bhybrid\b/.test(blob)) extra.push("hybrid");
	if (/\bfarm/.test(blob)) extra.push("farming");
	if (/\btroph/.test(blob)) extra.push("trophy");
	if (/\bwar\b/.test(blob) || input.slot === "WB") extra.push("war");
	let baseType = aliasType(input.sourceType);
	if (!baseType && input.slot === "WB") baseType = "war";
	for (const tag of rawTags) {
		const mapped = aliasType(tag);
		if (mapped && mapped !== "other") {
			extra.push(mapped);
			if (!baseType) baseType = mapped;
		}
	}
	for (const t of [
		"anti3",
		"anti2",
		"legend"
	]) if (extra.includes(t)) {
		baseType = t;
		break;
	}
	if (!baseType) {
		if (extra.includes("war")) baseType = "war";
		else if (extra.includes("hybrid")) baseType = "hybrid";
		else if (extra.includes("trophy")) baseType = "trophy";
		else if (extra.includes("farming")) baseType = "farming";
		else if (input.slot === "HV") baseType = "farming";
		else baseType = "other";
	}
	const thFromBlob = blob.match(/\bth\s*([0-9]{1,2})\b/)?.[1];
	const townHall = typeof input.townHall === "number" && input.townHall >= 3 && input.townHall <= 18 ? input.townHall : thFromBlob ? Number.parseInt(thFromBlob, 10) : null;
	const tags = [.../* @__PURE__ */ new Set([...rawTags, ...extra])].filter((t) => t.length < 40);
	const confidence = aliasType(input.sourceType) && townHall ? "high" : townHall ? "medium" : "low";
	return {
		townHall,
		baseType,
		tags,
		confidence
	};
}
function persianTitle(townHall, type, name) {
	const clean = name.replace(/\s*\(TH\s*\d+\)\s*/i, "").trim();
	const short = clean.length > 42 ? `${clean.slice(0, 40)}…` : clean;
	return `مپ ${typeLabelShort(type)} تالار ${toFa(townHall)}${short ? ` — ${short}` : ""}`;
}
function typeLabelShort(type) {
	switch (type) {
		case "war": return "جنگ";
		case "trophy": return "کاپ";
		case "farming": return "فارم";
		case "hybrid": return "ترکیبی";
		case "legend": return "لجند";
		case "anti2": return "ضد ۲ ستاره";
		case "anti3": return "ضد ۳ ستاره";
		default: return "بیس";
	}
}
function toFa(n) {
	return String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)] ?? d);
}
var OPEN_LAYOUT_HOST = /(?:^|\.)clashofclans\.com$/i;
function normalizeCopyUrl(raw) {
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
function parseCopyLink(raw) {
	const copyUrl = normalizeCopyUrl(raw);
	if (!copyUrl) return null;
	try {
		const id = new URL(copyUrl).searchParams.get("id") ?? "";
		const parts = id.split(":");
		const thRaw = parts[0]?.match(/^TH(\d{1,2})$/i)?.[1];
		return {
			copyUrl,
			layoutKey: id,
			townHall: thRaw ? Number.parseInt(thRaw, 10) : null,
			slot: parts[1]?.toUpperCase() ?? null
		};
	} catch {
		return null;
	}
}
function extractCopyLinks(text) {
	const found = /* @__PURE__ */ new Set();
	for (const match of text.match(/https?:\/\/(?:link\.)?clashofclans\.com[^\s"'<>]*action=OpenLayout[^\s"'<>]*/gi) ?? []) {
		const normalized = normalizeCopyUrl(match.replace(/[),.;]+$/, ""));
		if (normalized) found.add(normalized);
	}
	return [...found];
}
var DEFAULT_URL = "https://raw.githubusercontent.com/nschmeller/clash-bases/main/bases.json";
var SOURCE_ID$1 = "github-clash-bases";
var USER_AGENT$1 = "ClashMap/1.0 (base-catalog; +https://grok.com; MIT catalog ingest)";
function asString(v) {
	return typeof v === "string" && v.trim() ? v.trim() : null;
}
function mapEntry(raw) {
	const sourceId = asString(raw.id);
	const name = asString(raw.name);
	const link = asString(raw.link);
	if (!sourceId || !name || !link) return null;
	const parsed = parseCopyLink(link);
	if (!parsed) return null;
	const tags = Array.isArray(raw.tags) ? raw.tags.filter((t) => typeof t === "string" && t.length < 48) : [];
	return {
		source: SOURCE_ID$1,
		sourceId,
		name,
		townHall: typeof raw.town_hall === "number" ? raw.town_hall : parsed.townHall,
		sourceType: asString(raw.type),
		copyUrl: parsed.copyUrl,
		imageUrl: asString(raw.image),
		builder: asString(raw.builder),
		description: asString(raw.description),
		tags,
		publishedAt: asString(raw.added)
	};
}
function githubCatalogSource(url = DEFAULT_URL) {
	return {
		id: SOURCE_ID$1,
		label: "GitHub Clash Bases (MIT)",
		async fetch({ etag }) {
			const headers = {
				Accept: "application/json",
				"User-Agent": USER_AGENT$1
			};
			if (etag) headers["If-None-Match"] = etag;
			const token = process.env.GITHUB_TOKEN?.trim();
			if (token) headers.Authorization = `Bearer ${token}`;
			const res = await fetch(url, {
				headers,
				redirect: "follow"
			});
			if (res.status === 304) return {
				source: SOURCE_ID$1,
				items: [],
				etag: etag ?? null,
				skippedUnchanged: true
			};
			if (!res.ok) throw new Error(`کاتالوگ گیت‌هاب پاسخ ${res.status} داد`);
			const nextEtag = res.headers.get("etag");
			const json = await res.json();
			const list = Array.isArray(json) ? json : json && typeof json === "object" && Array.isArray(json.bases) ? json.bases : null;
			if (!list) throw new Error("ساختار کاتالوگ گیت‌هاب نامعتبر است");
			const items = [];
			for (const entry of list) {
				if (!entry || typeof entry !== "object") continue;
				const mapped = mapEntry(entry);
				if (mapped) items.push(mapped);
			}
			return {
				source: SOURCE_ID$1,
				items,
				etag: nextEtag
			};
		}
	};
}
var SOURCE_ID = "openlayout-rss";
var USER_AGENT = "ClashMap/1.0 (layout-rss; +https://grok.com)";
function decodeXml(s) {
	return s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").replace(/</g, "<").replace(/>/g, ">").replace(/&/g, "&").replace(/"/g, "\"").replace(/&#39;/g, "'");
}
function tag(block, name) {
	const re = new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, "i");
	const m = block.match(re);
	return m ? decodeXml(m[1]).trim() : null;
}
function parseFeed(xml, feedUrl) {
	const items = [];
	const chunks = xml.split(/<item[\s>]/i).slice(1);
	const entries = chunks.length ? chunks : xml.split(/<entry[\s>]/i).slice(1);
	for (const chunk of entries) {
		const title = tag(chunk, "title") ?? "Layout";
		const link = chunk.match(/<link[^>]+href=["']([^"']+)["']/i)?.[1] ?? tag(chunk, "link");
		const body = [
			title,
			tag(chunk, "description"),
			tag(chunk, "content"),
			chunk
		].join("\n");
		const pub = tag(chunk, "pubDate") ?? tag(chunk, "updated") ?? tag(chunk, "published");
		const image = chunk.match(/<media:content[^>]+url=["']([^"']+)["']/i)?.[1] ?? chunk.match(/<img[^>]+src=["']([^"']+)["']/i)?.[1] ?? null;
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
				publishedAt: pub
			});
		});
		if (!urls.length && link) {
			const parsed = parseCopyLink(link);
			if (parsed) items.push({
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
				publishedAt: pub
			});
		}
	}
	return items;
}
function rssLayoutSource() {
	return {
		id: SOURCE_ID,
		label: "OpenLayout RSS",
		async fetch() {
			const feeds = (env("LAYOUT_RSS_FEEDS") ?? "").split(",").map((s) => s.trim()).filter((s) => /^https:\/\//i.test(s));
			if (!feeds.length) return {
				source: SOURCE_ID,
				items: [],
				warning: "no-feeds-configured"
			};
			const items = [];
			const errors = [];
			for (const feed of feeds) try {
				const res = await fetch(feed, {
					headers: {
						"User-Agent": USER_AGENT,
						Accept: "application/rss+xml, application/atom+xml, text/xml"
					},
					redirect: "follow"
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
			return {
				source: SOURCE_ID,
				items,
				warning: errors.length ? errors.join("; ") : null
			};
		}
	};
}
var globalRef = globalThis;
function safeId(source, sourceId, layoutKey) {
	if (/^[a-z0-9][a-z0-9-]{1,80}$/i.test(sourceId)) return sourceId;
	return `b-${createHash("sha1").update(`${source}:${layoutKey}`).digest("hex").slice(0, 16)}`;
}
function extraJsonSources() {
	const raw = env("EXTRA_CATALOG_URLS");
	if (!raw) return [];
	return raw.split(",").map((s) => s.trim()).filter((s) => /^https:\/\//i.test(s)).map((url, i) => {
		return {
			...githubCatalogSource(url),
			id: `extra-catalog-${i + 1}`,
			label: `Extra catalog ${i + 1}`
		};
	});
}
function catalogSources() {
	return [
		githubCatalogSource(),
		rssLayoutSource(),
		...extraJsonSources()
	];
}
function toInsertRow(item) {
	const parsed = parseCopyLink(item.copyUrl);
	if (!parsed) return null;
	const cat = categorizeBase({
		sourceType: item.sourceType,
		tags: item.tags,
		name: item.name,
		description: item.description,
		slot: parsed.slot,
		townHall: item.townHall ?? parsed.townHall
	});
	const th = cat.townHall;
	if (!th || th < 4 || th > 18) return null;
	const type = isBaseType(cat.baseType) ? cat.baseType : "other";
	const published = item.publishedAt ? new Date(item.publishedAt) : null;
	const publishedIso = published && !Number.isNaN(published.getTime()) ? published.toISOString() : null;
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
		source_published_at: publishedIso
	};
}
async function insertBatch(items) {
	const sql = await getSql();
	const prepared = [];
	let skipped = 0;
	const seen = /* @__PURE__ */ new Set();
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
	if (!prepared.length) return {
		inserted: 0,
		skipped
	};
	let inserted = 0;
	const chunkSize = 400;
	for (let i = 0; i < prepared.length; i += chunkSize) {
		const chunk = prepared.slice(i, i + chunkSize);
		const result = await sql.query(`insert into bases (
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
       returning id`, [JSON.stringify(chunk.map((r) => ({
			...r,
			tags: JSON.stringify(r.tags)
		})))]);
		inserted += result.length;
		skipped += chunk.length - result.length;
	}
	return {
		inserted,
		skipped
	};
}
async function runIngest() {
	if (globalRef.__clashmapIngest__) return globalRef.__clashmapIngest__;
	const run = (async () => {
		const startedAt = /* @__PURE__ */ new Date();
		const sql = await getSql();
		const sources = catalogSources();
		const summary = {
			startedAt: startedAt.toISOString(),
			finishedAt: startedAt.toISOString(),
			sources: [],
			inserted: 0,
			skipped: 0
		};
		for (const source of sources) {
			const logId = (await sql`
        insert into ingest_logs (source, status) values (${source.id}, ${"running"})
        returning id
      `)[0]?.id;
			const state = await sql`
        select last_etag from ingest_state where source = ${source.id}
      `;
			try {
				const result = await source.fetch({ etag: state[0]?.last_etag ?? null });
				if (result.skippedUnchanged) {
					if (logId) await sql`
              update ingest_logs
                 set finished_at = now(), status = ${"unchanged"},
                     details = ${JSON.stringify({ warning: result.warning })}::jsonb
               where id = ${logId}
            `;
					summary.sources.push({
						source: source.id,
						status: "unchanged",
						inserted: 0,
						skipped: 0
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
				if (logId) await sql`
            update ingest_logs
               set finished_at = now(),
                   status = ${"success"},
                   inserted_count = ${inserted},
                   skipped_count = ${skipped},
                   details = ${JSON.stringify({
					warning: result.warning,
					fetched: result.items.length
				})}::jsonb
             where id = ${logId}
          `;
				summary.sources.push({
					source: source.id,
					status: "success",
					inserted,
					skipped,
					error: result.warning
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
				if (logId) await sql`
            update ingest_logs
               set finished_at = now(), status = ${"error"}, error_message = ${message}
             where id = ${logId}
          `;
				summary.sources.push({
					source: source.id,
					status: "error",
					inserted: 0,
					skipped: 0,
					error: message
				});
			}
		}
		summary.finishedAt = (/* @__PURE__ */ new Date()).toISOString();
		return summary;
	})().finally(() => {
		globalRef.__clashmapIngest__ = void 0;
	});
	globalRef.__clashmapIngest__ = run;
	return run;
}
async function ensureCatalogReady() {
	if (globalRef.__clashmapReady__) return globalRef.__clashmapReady__;
	globalRef.__clashmapReady__ = (async () => {
		if (((await (await getSql())`select count(*)::int as n from bases`)[0]?.n ?? 0) > 0) return;
		await runIngest();
	})().catch((err) => {
		globalRef.__clashmapReady__ = void 0;
		throw err;
	});
	return globalRef.__clashmapReady__;
}
//#endregion
export { ensureCatalogReady, runIngest, getSql as t };
