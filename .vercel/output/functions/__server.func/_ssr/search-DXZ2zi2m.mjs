import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { s as Route$7 } from "./router-DZ_dB8j4.mjs";
import { n as SearchFilters, t as ListingPage } from "./listing-page-CghkdkA7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-DXZ2zi2m.js
var import_jsx_runtime = require_jsx_runtime();
function SearchPage() {
	const data = Route$7.useLoaderData();
	const search = Route$7.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-6xl px-4 pt-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchFilters, {
			townHall: search.th,
			baseType: search.type,
			q: search.q
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingPage, {
		heading: search.q ? `نتایج «${search.q}»` : "جستجوی مپ",
		intro: "جستجو با فیلتر تالار و نوع مپ ترکیب می‌شود.",
		items: data.items,
		total: data.total,
		sort: "latest",
		townHall: search.th,
		baseType: search.type,
		query: search.q,
		hideFilters: true
	})] });
}
//#endregion
export { SearchPage as component };
