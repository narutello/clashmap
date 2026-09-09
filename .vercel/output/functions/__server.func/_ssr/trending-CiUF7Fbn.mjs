import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { o as Route$5 } from "./router-DZ_dB8j4.mjs";
import { t as ListingPage } from "./listing-page-CghkdkA7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/trending-CiUF7Fbn.js
var import_jsx_runtime = require_jsx_runtime();
function TrendingPage() {
	const data = Route$5.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingPage, {
		heading: "مپ‌های ترند",
		intro: "بیس‌هایی که در روزهای اخیر بیشتر کپی شده‌اند و در حال رشد هستند.",
		items: data.items,
		total: data.total,
		sort: "trending"
	});
}
//#endregion
export { TrendingPage as component };
