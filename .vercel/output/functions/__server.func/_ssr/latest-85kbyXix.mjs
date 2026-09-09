import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { l as Route$9 } from "./router-DZ_dB8j4.mjs";
import { t as ListingPage } from "./listing-page-CghkdkA7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/latest-85kbyXix.js
var import_jsx_runtime = require_jsx_runtime();
function LatestPage() {
	const data = Route$9.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingPage, {
		heading: "جدیدترین مپ‌ها",
		intro: "تازه‌ترین بیس‌هایی که امروز و روزهای اخیر به کاتالوگ اضافه شده‌اند.",
		items: data.items,
		total: data.total,
		sort: "latest"
	});
}
//#endregion
export { LatestPage as component };
