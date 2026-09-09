import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
import { l as isBaseType } from "./catalog-DAYv4YM6.mjs";
import { a as string, i as object, r as number, t as _enum } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-BY8x8gDS.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var listInput = object({
	townHall: number().int().min(4).max(18).nullable().optional(),
	baseType: string().nullable().optional(),
	sort: _enum([
		"latest",
		"popular",
		"trending"
	]).optional(),
	q: string().max(80).nullable().optional(),
	offset: number().int().min(0).max(2e4).optional(),
	limit: number().int().min(1).max(48).optional()
});
var listBasesFn_createServerFn_handler = createServerRpc({
	id: "24e662a23604df0f779641dfaef62cb43b5246b6883e9eb11022e83e4150dac2",
	name: "listBasesFn",
	filename: "src/lib/api.ts"
}, (opts) => listBasesFn.__executeServer(opts));
var listBasesFn = createServerFn({ method: "GET" }).validator(listInput).handler(listBasesFn_createServerFn_handler, async ({ data }) => {
	const { listBases } = await import("./bases.server-C9iqnB7z.mjs");
	const baseType = data.baseType && isBaseType(data.baseType) ? data.baseType : null;
	return listBases({
		townHall: data.townHall ?? null,
		baseType,
		sort: data.sort ?? "latest",
		q: data.q ?? null,
		offset: data.offset ?? 0,
		limit: data.limit ?? 24
	});
});
var getBaseFn_createServerFn_handler = createServerRpc({
	id: "3d36a1b39a2248d23f5e8d3c48ec59ca597cb761fc4d9065c59230958a12c65b",
	name: "getBaseFn",
	filename: "src/lib/api.ts"
}, (opts) => getBaseFn.__executeServer(opts));
var getBaseFn = createServerFn({ method: "GET" }).validator(object({ id: string().min(1).max(96) })).handler(getBaseFn_createServerFn_handler, async ({ data }) => {
	const { getBase, relatedBases } = await import("./bases.server-C9iqnB7z.mjs");
	const base = await getBase(data.id);
	if (!base) return {
		base: null,
		related: []
	};
	return {
		base,
		related: await relatedBases(base)
	};
});
var homeFn_createServerFn_handler = createServerRpc({
	id: "b14c2f976d327c0a01dc247ae918d17c82e23c630d8e7b81cb21534db8760045",
	name: "homeFn",
	filename: "src/lib/api.ts"
}, (opts) => homeFn.__executeServer(opts));
var homeFn = createServerFn({ method: "GET" }).handler(homeFn_createServerFn_handler, async () => {
	const { homeSections, countsByTownHall, countsByType } = await import("./bases.server-C9iqnB7z.mjs");
	const [home, thCounts, typeCounts] = await Promise.all([
		homeSections(),
		countsByTownHall(),
		countsByType()
	]);
	return {
		...home,
		thCounts,
		typeCounts
	};
});
var copyBaseFn_createServerFn_handler = createServerRpc({
	id: "b0077d02d250f2023f251ba3ac7626e2c4842a730432b4003fb948c944cc771c",
	name: "copyBaseFn",
	filename: "src/lib/api.ts"
}, (opts) => copyBaseFn.__executeServer(opts));
var copyBaseFn = createServerFn({ method: "POST" }).validator(object({ id: string().min(1).max(96) })).handler(copyBaseFn_createServerFn_handler, async ({ data }) => {
	const { recordCopy } = await import("./bases.server-C9iqnB7z.mjs");
	const result = await recordCopy(data.id);
	if (!result) throw new Error("بیس پیدا نشد");
	return result;
});
var reportBaseFn_createServerFn_handler = createServerRpc({
	id: "3ec9b54aaad7d79f944c0d5df8c060223bdb6309d4fc9dedc8c0eb90eff62b34",
	name: "reportBaseFn",
	filename: "src/lib/api.ts"
}, (opts) => reportBaseFn.__executeServer(opts));
var reportBaseFn = createServerFn({ method: "POST" }).validator(object({
	id: string().min(1).max(96),
	reason: _enum([
		"broken",
		"wrong-th",
		"wrong-type",
		"other"
	])
})).handler(reportBaseFn_createServerFn_handler, async ({ data }) => {
	const { reportBase } = await import("./bases.server-C9iqnB7z.mjs");
	if (!await reportBase(data.id, data.reason)) throw new Error("بیس پیدا نشد");
	return { ok: true };
});
var syncNowFn_createServerFn_handler = createServerRpc({
	id: "1b991017110b873dff846120f8f183891e9b4854a5e709780b653f9532fe5aec",
	name: "syncNowFn",
	filename: "src/lib/api.ts"
}, (opts) => syncNowFn.__executeServer(opts));
var syncNowFn = createServerFn({ method: "POST" }).handler(syncNowFn_createServerFn_handler, async () => {
	const { runIngest } = await import("./ingest.server-loOY8Pcl.mjs");
	return runIngest();
});
//#endregion
export { copyBaseFn_createServerFn_handler, getBaseFn_createServerFn_handler, homeFn_createServerFn_handler, listBasesFn_createServerFn_handler, reportBaseFn_createServerFn_handler, syncNowFn_createServerFn_handler };
