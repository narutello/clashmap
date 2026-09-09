import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { o as faNum } from "./catalog-DAYv4YM6.mjs";
import { i as Route$3 } from "./router-DZ_dB8j4.mjs";
import { t as ListingPage } from "./listing-page-CghkdkA7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/th._th-IIYsy8yV.js
var import_jsx_runtime = require_jsx_runtime();
function TownHallPage() {
	const data = Route$3.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingPage, {
		heading: `مپ‌های تالار ${faNum(data.th)}`,
		intro: `همه بیس‌های Town Hall ${data.th}؛ جنگ، فارم، کاپ، لجند و ضد ستاره.`,
		items: data.items,
		total: data.total,
		sort: "latest",
		townHall: data.th
	});
}
//#endregion
export { TownHallPage as component };
