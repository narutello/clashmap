import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as BASE_TYPE_FA, o as faNum } from "./catalog-DAYv4YM6.mjs";
import { n as Route } from "./router-DZ_dB8j4.mjs";
import { t as ListingPage } from "./listing-page-CghkdkA7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/th._th._type-CfGouGc2.js
var import_jsx_runtime = require_jsx_runtime();
function CombinedPage() {
	const data = Route.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingPage, {
		heading: `${BASE_TYPE_FA[data.type]} تالار ${faNum(data.th)}`,
		intro: `مپ‌های ${BASE_TYPE_FA[data.type]} مخصوص Town Hall ${data.th} با لینک کپی مستقیم.`,
		items: data.items,
		total: data.total,
		sort: "latest",
		townHall: data.th,
		baseType: data.type
	});
}
//#endregion
export { CombinedPage as component };
