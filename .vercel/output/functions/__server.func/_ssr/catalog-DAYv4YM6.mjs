//#region node_modules/.nitro/vite/services/ssr/assets/catalog-DAYv4YM6.js
var APP_NAME = "کلش‌مپ";
var APP_TAGLINE = "کشف و کپی مپ‌های کلش آو کلنز";
var TOWN_HALLS = [
	18,
	17,
	16,
	15,
	14,
	13,
	12,
	11,
	10,
	9,
	8,
	7,
	6,
	5,
	4
];
var BASE_TYPES = [
	"war",
	"trophy",
	"farming",
	"hybrid",
	"legend",
	"anti2",
	"anti3",
	"other"
];
var BASE_TYPE_FA = {
	war: "مپ جنگ",
	trophy: "مپ کاپ",
	farming: "مپ فارم",
	hybrid: "مپ ترکیبی",
	legend: "مپ لجند",
	anti2: "ضد دو ستاره",
	anti3: "ضد سه ستاره",
	other: "سایر"
};
var FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
function faNum(value) {
	return String(value).replace(/\d/g, (d) => FA_DIGITS[Number(d)] ?? d);
}
function isTownHall(value) {
	return typeof value === "number" && TOWN_HALLS.includes(value);
}
function isBaseType(value) {
	return typeof value === "string" && BASE_TYPES.includes(value);
}
function parseTownHallParam(raw) {
	if (!raw) return null;
	const n = Number.parseInt(raw, 10);
	return isTownHall(n) ? n : null;
}
function formatFaDate(iso) {
	if (!iso) return "";
	const d = typeof iso === "string" ? new Date(iso) : iso;
	if (Number.isNaN(d.getTime())) return "";
	return new Intl.DateTimeFormat("fa-IR", {
		year: "numeric",
		month: "short",
		day: "numeric"
	}).format(d);
}
function formatFaCompact(n) {
	if (n >= 1e6) return `${faNum((n / 1e6).toFixed(1))} میلیون`;
	if (n >= 1e3) return `${faNum((n / 1e3).toFixed(n >= 1e4 ? 0 : 1))} هزار`;
	return faNum(n);
}
function pageTitle(parts) {
	return [...parts, APP_NAME].join(" | ");
}
function listingSeo(opts) {
	const th = opts.townHall;
	const type = opts.baseType;
	if (th && type) return {
		title: pageTitle([`مپ‌های ${BASE_TYPE_FA[type]} تالار ${faNum(th)}`]),
		description: `بهترین مپ‌های ${BASE_TYPE_FA[type]} کلش آو کلنز برای تالار شهر ${faNum(th)}. فیلتر، مشاهده تصویر و کپی مستقیم بیس.`
	};
	if (th) return {
		title: pageTitle([`مپ‌های تالار ${faNum(th)} کلش آو کلنز`]),
		description: `جدیدترین و محبوب‌ترین بیس‌های کلش آو کلنز برای Town Hall ${th}. مپ جنگ، فارم، کاپ و لجند با لینک کپی.`
	};
	if (type) return {
		title: pageTitle([`${BASE_TYPE_FA[type]} کلش آو کلنز`]),
		description: `مجموعه ${BASE_TYPE_FA[type]} برای همه تالارهای شهر. انتخاب تالار، مشاهده تصویر و کپی بیس در یک لمس.`
	};
	if (opts.sort === "popular") return {
		title: pageTitle(["محبوب‌ترین مپ‌های کلش آو کلنز"]),
		description: "بیس‌هایی که بیشترین تعداد کپی را در کلش‌مپ داشته‌اند."
	};
	if (opts.sort === "trending") return {
		title: pageTitle(["مپ‌های ترند کلش آو کلنز"]),
		description: "بیس‌های داغ و در حال رشد کلش آو کلنز؛ بر اساس کپی‌های روزهای اخیر."
	};
	if (opts.query) return {
		title: pageTitle([`جستجو: ${opts.query}`]),
		description: `نتایج جستجو برای «${opts.query}» در مپ‌های کلش آو کلنز.`
	};
	return {
		title: pageTitle(["جدیدترین مپ‌های کلش آو کلنز"]),
		description: "تازه‌ترین بیس‌های اضافه‌شده به کلش‌مپ را ببینید و مستقیم کپی کنید."
	};
}
//#endregion
export { TOWN_HALLS as a, formatFaDate as c, pageTitle as d, parseTownHallParam as f, BASE_TYPE_FA as i, isBaseType as l, APP_TAGLINE as n, faNum as o, BASE_TYPES as r, formatFaCompact as s, APP_NAME as t, listingSeo as u };
