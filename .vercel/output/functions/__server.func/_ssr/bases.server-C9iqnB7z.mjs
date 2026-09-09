import { l as isBaseType, r as BASE_TYPES } from "./catalog-DAYv4YM6.mjs";
import { ensureCatalogReady, t as getSql } from "./ingest.server-loOY8Pcl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bases.server-C9iqnB7z.js
function parseTags(raw) {
	if (Array.isArray(raw)) return raw.filter((t) => typeof t === "string");
	if (typeof raw === "string") try {
		const v = JSON.parse(raw);
		return Array.isArray(v) ? v.filter((t) => typeof t === "string") : [];
	} catch {
		return [];
	}
	return [];
}
function toCard(row, trendingIds) {
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
		trending: trendingIds.has(row.id) || (Number(row.recent_copies) || 0) >= 3
	};
}
function toDetail(row, trendingIds) {
	return {
		...toCard(row, trendingIds),
		description: row.description,
		descriptionFa: row.description_fa,
		source: row.source,
		sourcePublishedAt: row.source_published_at,
		viewCount: Number(row.view_count) || 0,
		lastCopiedAt: row.last_copied_at
	};
}
async function trendingIdSet(sql) {
	const rows = await sql`
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
function filtersSql(query) {
	const clauses = [];
	const params = [];
	if (query.townHall) {
		params.push(query.townHall);
		clauses.push(`coalesce(town_hall_override, town_hall) = $${params.length}`);
	}
	if (query.baseType) {
		params.push(query.baseType);
		const i = params.length;
		clauses.push(`(coalesce(base_type_override, base_type) = $${i} or tags @> jsonb_build_array($${i}::text))`);
	}
	if (query.q && query.q.trim()) {
		const q = `%${query.q.trim().slice(0, 80)}%`;
		params.push(q);
		const i = params.length;
		clauses.push(`(title ilike $${i} or title_fa ilike $${i} or coalesce(description,'') ilike $${i} or coalesce(builder,'') ilike $${i} or tags::text ilike $${i})`);
	}
	return {
		where: clauses.length ? `where ${clauses.join(" and ")}` : "",
		params
	};
}
function orderSql(sort) {
	switch (sort) {
		case "popular": return `order by copy_count desc,
        coalesce(town_hall_override, town_hall) desc,
        discovered_at desc`;
		case "trending": return `order by recent_copies desc, copy_count desc, coalesce(town_hall_override, town_hall) desc, discovered_at desc`;
		default: return `order by coalesce(source_published_at, discovered_at) desc, coalesce(town_hall_override, town_hall) desc, discovered_at desc`;
	}
}
var SELECT_COLS = `
  id, title, title_fa,
  town_hall, town_hall_override, base_type, base_type_override,
  tags, image_url, copy_url, builder, discovered_at, copy_count,
  description, description_fa, source, source_published_at, view_count, last_copied_at,
  (
    select count(*)::int from copy_events ce
     where ce.base_id = bases.id and ce.copied_at > now() - interval '7 days'
  ) as recent_copies
`;
async function listBases(query) {
	await ensureCatalogReady();
	const sql = await getSql();
	const limit = Math.min(Math.max(query.limit ?? 24, 1), 48);
	const offset = Math.max(query.offset ?? 0, 0);
	const { where, params } = filtersSql(query);
	const sort = query.sort ?? "latest";
	const total = (await sql.query(`select count(*)::int as n from bases ${where}`, params))[0]?.n ?? 0;
	const limitIdx = params.length + 1;
	const offsetIdx = params.length + 2;
	const items = await sql.query(`select ${SELECT_COLS} from bases ${where} ${orderSql(sort)} limit $${limitIdx} offset $${offsetIdx}`, [
		...params,
		limit,
		offset
	]);
	const trending = await trendingIdSet(sql);
	return {
		items: items.map((r) => toCard(r, trending)),
		total,
		offset
	};
}
async function getBase(id) {
	await ensureCatalogReady();
	const sql = await getSql();
	const row = (await sql.query(`select ${SELECT_COLS} from bases where id = $1 limit 1`, [id]))[0];
	if (!row) return null;
	await sql.query(`update bases set view_count = view_count + 1 where id = $1`, [id]);
	return toDetail(row, await trendingIdSet(sql));
}
async function relatedBases(base, limit = 6) {
	const sql = await getSql();
	const rows = await sql.query(`select ${SELECT_COLS} from bases
      where id <> $1
        and coalesce(town_hall_override, town_hall) = $2
        and coalesce(base_type_override, base_type) = $3
      order by copy_count desc, discovered_at desc
      limit $4`, [
		base.id,
		base.townHall,
		base.baseType,
		limit
	]);
	const trending = await trendingIdSet(sql);
	return rows.map((r) => toCard(r, trending));
}
async function recordCopy(id) {
	const sql = await getSql();
	const row = (await sql.query(`update bases
        set copy_count = copy_count + 1, last_copied_at = now()
      where id = $1
      returning copy_count, copy_url`, [id]))[0];
	if (!row) return null;
	await sql.query(`insert into copy_events (base_id) values ($1)`, [id]);
	return {
		copyCount: Number(row.copy_count) || 0,
		copyUrl: row.copy_url
	};
}
async function reportBase(id, reason) {
	const sql = await getSql();
	if (!(await sql.query(`select id from bases where id = $1`, [id]))[0]) return false;
	await sql.query(`insert into base_reports (base_id, reason) values ($1, $2)`, [id, reason.slice(0, 200)]);
	return true;
}
async function homeSections() {
	await ensureCatalogReady();
	const sql = await getSql();
	const trendingIds = await trendingIdSet(sql);
	const [today, popular, trending, totals, sync] = await Promise.all([
		sql.query(`select ${SELECT_COLS} from bases
        order by coalesce(source_published_at, discovered_at) desc,
                 coalesce(town_hall_override, town_hall) desc
        limit 8`),
		sql.query(`select ${SELECT_COLS} from bases
        order by copy_count desc, coalesce(town_hall_override, town_hall) desc, discovered_at desc
        limit 8`),
		sql.query(`select ${SELECT_COLS} from bases
        order by recent_copies desc, copy_count desc, coalesce(town_hall_override, town_hall) desc
        limit 8`),
		sql.query(`select
         count(*)::int as total,
         count(*) filter (where coalesce(town_hall_override, town_hall) = 18)::int as today
       from bases`),
		sql.query(`select last_success_at from ingest_state order by last_success_at desc nulls last limit 1`)
	]);
	return {
		today: today.map((r) => toCard(r, trendingIds)),
		popular: popular.map((r) => toCard(r, trendingIds)),
		trending: trending.map((r) => toCard(r, trendingIds)),
		counts: {
			total: totals[0]?.total ?? 0,
			today: totals[0]?.today ?? 0
		},
		lastSync: sync[0]?.last_success_at ?? null
	};
}
async function countsByTownHall() {
	await ensureCatalogReady();
	return (await (await getSql())`
    select coalesce(town_hall_override, town_hall) as th, count(*)::int as n
      from bases
     group by 1
     order by 1 desc
  `).map((r) => ({
		townHall: r.th,
		n: r.n
	}));
}
async function countsByType() {
	await ensureCatalogReady();
	const sql = await getSql();
	const out = [];
	for (const type of BASE_TYPES) {
		const rows = await sql.query(`select count(*)::int as n from bases
        where coalesce(base_type_override, base_type) = $1
           or tags @> jsonb_build_array($1::text)`, [type]);
		out.push({
			type,
			n: rows[0]?.n ?? 0
		});
	}
	return out;
}
async function sitemapEntries(limit = 4e3) {
	await ensureCatalogReady();
	return (await (await getSql())`
    select id, discovered_at from bases
     order by discovered_at desc
     limit ${limit}
  `).map((r) => ({
		loc: `/base/${r.id}`,
		lastmod: String(r.discovered_at).slice(0, 10)
	}));
}
//#endregion
export { countsByTownHall, countsByType, getBase, homeSections, listBases, recordCopy, relatedBases, reportBase, sitemapEntries };
