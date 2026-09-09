import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as TOWN_HALLS, i as BASE_TYPE_FA, o as faNum, s as formatFaCompact } from "./catalog-DAYv4YM6.mjs";
import { h as ArrowLeft, i as Swords, n as Trophy, t as Wheat } from "../_libs/lucide-react.mjs";
import { d as Button, u as Route$11 } from "./router-DZ_dB8j4.mjs";
import { n as BaseCard } from "./base-card-kntXB2n2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Dk5B0fNP.js
var import_jsx_runtime = require_jsx_runtime();
function Section({ title, to, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-end justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-semibold md:text-xl",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to,
				className: "inline-flex items-center gap-1 text-sm text-primary",
				children: ["مشاهده همه", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" })]
			})]
		}), children]
	});
}
function Home() {
	const data = Route$11.useLoaderData();
	const featuredTypes = [
		{
			type: "war",
			icon: Swords
		},
		{
			type: "trophy",
			icon: Trophy
		},
		{
			type: "farming",
			icon: Wheat
		},
		{
			type: "hybrid",
			icon: Swords
		},
		{
			type: "legend",
			icon: Trophy
		},
		{
			type: "anti3",
			icon: Swords
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-6xl space-y-12 px-4 py-6 md:py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "overflow-hidden rounded-2xl bg-card p-5 md:p-8",
				style: { boxShadow: "var(--shadow-border)" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "village-grid -mx-5 -mt-5 mb-5 h-24 md:-mx-8 md:-mt-8 md:h-32" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-primary",
						children: "پلتفرم فارسی مپ کلش آو کلنز"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 max-w-xl text-3xl font-semibold tracking-tight md:text-4xl",
						children: "مپ مناسب تالارت را پیدا کن و با یک لمس کپی کن"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground",
						children: "روزانه بیس‌های جدید جنگ، فارم، کاپ و لجند از منابع مجاز جمع می‌شوند. تالار را انتخاب کنید، نوع مپ را فیلتر کنید و لینک رسمی بازی را کپی کنید."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-wrap gap-4 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "tabular-nums text-xl font-semibold",
							children: formatFaCompact(data.counts.total)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-muted-foreground",
							children: "مپ در کاتالوگ"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "tabular-nums text-xl font-semibold",
							children: faNum(data.counts.today)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-muted-foreground",
							children: "مپ تالار ۱۸"
						})] })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold",
					children: "انتخاب سریع تالار شهر"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8",
					children: TOWN_HALLS.map((th) => {
						const count = data.thCounts.find((c) => c.townHall === th)?.n ?? 0;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/th/$th",
							params: { th: String(th) },
							className: "flex min-h-16 flex-col items-center justify-center rounded-xl bg-card px-2 py-3 text-center transition-transform duration-150 active:scale-[0.96]",
							style: { boxShadow: "var(--shadow-border)" },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-base font-semibold",
								children: ["TH", faNum(th)]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] tabular-nums text-muted-foreground",
								children: faNum(count)
							})]
						}, th);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold",
					children: "نوع مپ"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-2 sm:grid-cols-3",
					children: featuredTypes.map(({ type, icon: Icon }) => {
						const count = data.typeCounts.find((c) => c.type === type)?.n ?? 0;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/type/$type",
							params: { type },
							className: "flex min-h-16 items-center gap-3 rounded-xl bg-card px-4 py-3 transition-transform duration-150 active:scale-[0.96]",
							style: { boxShadow: "var(--shadow-border)" },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-9 place-items-center rounded-lg bg-surface text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-sm font-medium",
								children: BASE_TYPE_FA[type]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "block text-xs tabular-nums text-muted-foreground",
								children: [faNum(count), " مپ"]
							})] })]
						}, type);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "مپ‌های امروز",
				to: "/latest",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4",
					children: data.today.map((base) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BaseCard, { base }, base.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "محبوب‌ترین‌ها",
				to: "/popular",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4",
					children: data.popular.map((base) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BaseCard, { base }, base.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "ترند",
				to: "/trending",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4",
					children: data.trending.map((base) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BaseCard, { base }, base.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl bg-card p-5 md:p-6",
				style: { boxShadow: "var(--shadow-border)" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-semibold",
						children: "چطور مپ را کپی کنیم؟"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
						className: "mt-3 list-decimal space-y-2 pr-5 text-sm leading-relaxed text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "دکمه «کپی بیس» را بزنید تا لینک رسمی بازی کپی شود." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "کلش آو کلنز را روی گوشی باز کنید." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "بازی لینک را می‌خواند و از شما می‌خواهد مپ را در یک اسلات خالی ذخیره کنید." })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "secondary",
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/how-to",
							children: "راهنمای کامل"
						})
					})
				]
			})
		]
	});
}
//#endregion
export { Home as component };
