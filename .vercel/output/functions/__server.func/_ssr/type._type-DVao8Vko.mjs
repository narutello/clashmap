import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as BASE_TYPE_FA } from "./catalog-DAYv4YM6.mjs";
import { r as Route$2 } from "./router-DZ_dB8j4.mjs";
import { t as ListingPage } from "./listing-page-CghkdkA7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/type._type-DVao8Vko.js
var import_jsx_runtime = require_jsx_runtime();
function TypePage() {
	const data = Route$2.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingPage, {
		heading: BASE_TYPE_FA[data.type],
		intro: `همه ${BASE_TYPE_FA[data.type]}‌ها در تمام تالارهای شهر. تالار را از فیلتر بالا انتخاب کنید.`,
		items: data.items,
		total: data.total,
		sort: "latest",
		baseType: data.type
	});
}
//#endregion
export { TypePage as component };
