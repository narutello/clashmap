import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as TOWN_HALLS, i as BASE_TYPE_FA, o as faNum, r as BASE_TYPES, u as listingSeo } from "./catalog-DAYv4YM6.mjs";
import { l as Funnel, s as SearchX } from "../_libs/lucide-react.mjs";
import { d as Button, f as cn, m as listBasesFn } from "./router-DZ_dB8j4.mjs";
import { n as BaseCard } from "./base-card-kntXB2n2.mjs";
import { t as Drawer } from "../_libs/vaul.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/listing-page-CghkdkA7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EmptyState({ title = "مپی با این فیلتر پیدا نشد", description = "تالار یا نوع مپ را عوض کنید، یا جستجو را پاک کنید." }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center gap-3 rounded-2xl bg-card px-6 py-16 text-center",
		style: { boxShadow: "var(--shadow-border)" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchX, { className: "size-8 text-muted-foreground" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-base font-semibold",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-sm text-sm text-muted-foreground",
				children: description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "secondary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					children: "بازگشت به خانه"
				})
			})
		]
	});
}
function BaseGrid({ items }) {
	if (!items.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3",
		children: items.map((base, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BaseCard, {
			base,
			priority: i < 3
		}, base.id))
	});
}
function Sheet({ shouldScaleBackground = true, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Root, {
		shouldScaleBackground,
		...props
	});
}
var SheetTrigger = Drawer.Trigger;
Drawer.Close;
var SheetPortal = Drawer.Portal;
function SheetOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Overlay, {
		className: cn("fixed inset-0 z-50 bg-background/60", className),
		...props
	});
}
function SheetContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer.Content, {
		className: cn("fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-2xl bg-card p-4 pb-[max(1rem,env(safe-area-inset-bottom))]", className),
		style: { boxShadow: "var(--shadow-border-hover)" },
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mb-4 h-1 w-10 rounded-full bg-border" }), children]
	})] });
}
function SheetTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Title, {
		className: cn("text-base font-semibold", className),
		...props
	});
}
function chipClass(active, tone) {
	return cn("inline-flex h-10 shrink-0 items-center rounded-full px-3.5 text-sm font-medium transition-colors duration-150", active ? tone === "th" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground" : "bg-surface text-foreground");
}
function Chip({ label, active, href, onClick, tone }) {
	const className = chipClass(active, tone);
	if (href) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href,
		className,
		children: label
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className,
		children: label
	});
}
function FilterBar({ value, onChange, mode = "navigate" }) {
	function hrefFor(next) {
		const th = next.townHall ?? null;
		const type = next.baseType ?? null;
		if (th && type) return `/th/${th}/${type}`;
		if (th) return `/th/${th}`;
		if (type) return `/type/${type}`;
		return "/latest";
	}
	const inner = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
				tone: "th",
				label: "همه تالارها",
				active: !value.townHall,
				href: mode === "navigate" ? hrefFor({
					...value,
					townHall: null
				}) : void 0,
				onClick: mode === "state" ? () => onChange?.({
					...value,
					townHall: null
				}) : void 0
			}), TOWN_HALLS.map((th) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
				tone: "th",
				label: `TH${faNum(th)}`,
				active: value.townHall === th,
				href: mode === "navigate" ? hrefFor({
					...value,
					townHall: th
				}) : void 0,
				onClick: mode === "state" ? () => onChange?.({
					...value,
					townHall: th
				}) : void 0
			}, th))]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
				tone: "type",
				label: "همه نوع‌ها",
				active: !value.baseType,
				href: mode === "navigate" ? hrefFor({
					...value,
					baseType: null
				}) : void 0,
				onClick: mode === "state" ? () => onChange?.({
					...value,
					baseType: null
				}) : void 0
			}), BASE_TYPES.map((type) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
				tone: "type",
				label: BASE_TYPE_FA[type],
				active: value.baseType === type,
				href: mode === "navigate" ? hrefFor({
					...value,
					baseType: type
				}) : void 0,
				onClick: mode === "state" ? () => onChange?.({
					...value,
					baseType: type
				}) : void 0
			}, type))]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "hidden md:block",
			children: inner
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "md:hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "secondary",
					className: "w-full",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, {}),
						"فیلتر تالار و نوع مپ",
						value.townHall || value.baseType ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground",
							children: "فعال"
						}) : null
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
					className: "mb-4",
					children: "فیلتر مپ‌ها"
				}),
				inner,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-xs text-muted-foreground",
					children: "می‌توانید تالار و نوع مپ را با هم ترکیب کنید؛ مثلاً تالار ۱۷ و مپ جنگ."
				})
			] })] }), value.townHall || value.baseType ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex flex-wrap gap-2",
				children: [value.townHall ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					tone: "th",
					label: `TH${faNum(value.townHall)}`,
					active: true
				}) : null, value.baseType ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					tone: "type",
					label: BASE_TYPE_FA[value.baseType],
					active: true
				}) : null]
			}) : null]
		})]
	});
}
function SearchFilters({ townHall, baseType, q }) {
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterBar, {
		value: {
			townHall,
			baseType
		},
		mode: "state",
		onChange: (next) => {
			navigate({
				to: "/search",
				search: (prev) => ({
					...prev,
					q: q || void 0,
					th: next.townHall ?? void 0,
					type: next.baseType ?? void 0
				})
			});
		}
	});
}
function ListingPage({ heading, intro, items, total, sort, townHall, baseType, query, hideFilters = false }) {
	const [extra, setExtra] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const all = [...items, ...extra];
	const canMore = all.length < total;
	const seo = listingSeo({
		townHall,
		baseType,
		sort,
		query
	});
	async function loadMore() {
		if (loading) return;
		setLoading(true);
		try {
			const next = await listBasesFn({ data: {
				townHall: townHall ?? null,
				baseType: baseType ?? null,
				sort,
				q: query ?? null,
				offset: all.length,
				limit: 24
			} });
			setExtra((prev) => [...prev, ...next.items]);
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-6xl px-4 py-6 md:py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-6 space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium text-primary",
						children: seo.title.split(" | ")[0]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-semibold tracking-tight md:text-3xl",
						children: heading
					}),
					intro ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-2xl text-sm leading-relaxed text-muted-foreground",
						children: intro
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs tabular-nums text-muted-foreground",
						children: [faNum(total), " مپ"]
					})
				]
			}),
			hideFilters ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterBar, { value: {
					townHall,
					baseType
				} })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BaseGrid, { items: all }),
			canMore ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 flex justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					onClick: () => void loadMore(),
					disabled: loading,
					children: loading ? "در حال بارگذاری…" : "مپ‌های بیشتر"
				})
			}) : null
		]
	});
}
//#endregion
export { SearchFilters as n, ListingPage as t };
