import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { c as Route$8 } from "./router-DZ_dB8j4.mjs";
import { t as ListingPage } from "./listing-page-CghkdkA7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/popular-DdJgvrkX.js
var import_jsx_runtime = require_jsx_runtime();
function PopularPage() {
	const data = Route$8.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingPage, {
		heading: "محبوب‌ترین مپ‌ها",
		intro: "بیس‌هایی که بیشترین تعداد کپی را داشته‌اند. برای هر تالار هم می‌توانید فیلتر کنید.",
		items: data.items,
		total: data.total,
		sort: "popular"
	});
}
//#endregion
export { PopularPage as component };
