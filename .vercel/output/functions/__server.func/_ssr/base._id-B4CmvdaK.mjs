import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { c as formatFaDate, i as BASE_TYPE_FA, o as faNum, s as formatFaCompact } from "./catalog-DAYv4YM6.mjs";
import { d as Flag, f as ExternalLink } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Route$4, d as Button, h as reportBaseFn } from "./router-DZ_dB8j4.mjs";
import { i as CopyBaseButton, n as BaseCard, r as BaseImage, t as Badge } from "./base-card-kntXB2n2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/base._id-B4CmvdaK.js
var import_jsx_runtime = require_jsx_runtime();
function BaseDetailPage() {
	const { base, related } = Route$4.useLoaderData();
	if (!base) return null;
	async function report(reason) {
		try {
			await reportBaseFn({ data: {
				id: base.id,
				reason
			} });
			toast.success("گزارش ثبت شد. از بازخورد شما ممنونیم.");
		} catch {
			toast.error("ارسال گزارش ناموفق بود.");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-5xl px-4 py-6 md:py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "mb-4 text-xs text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "hover:text-foreground",
						children: "خانه"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mx-1",
						children: "/"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/th/$th",
						params: { th: String(base.townHall) },
						className: "hover:text-foreground",
						children: ["تالار ", faNum(base.townHall)]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mx-1",
						children: "/"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/th/$th/$type",
						params: {
							th: String(base.townHall),
							type: base.baseType
						},
						className: "hover:text-foreground",
						children: BASE_TYPE_FA[base.baseType]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "overflow-hidden rounded-2xl bg-card p-2 md:p-3",
				style: { boxShadow: "var(--shadow-border)" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BaseImage, {
					src: base.imageUrl,
					alt: base.titleFa,
					townHall: base.townHall,
					baseType: base.baseType,
					className: "rounded-xl",
					priority: true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 p-4 md:p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									variant: "brass",
									children: ["تالار ", faNum(base.townHall)]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "moss",
									children: BASE_TYPE_FA[base.baseType]
								}),
								base.trending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "ترند" }) : null
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-2xl font-semibold tracking-tight md:text-3xl",
							children: base.titleFa
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: base.title
						}),
						base.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-foreground/90",
							children: base.description
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "grid grid-cols-2 gap-3 text-sm sm:grid-cols-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl bg-surface p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-xs text-muted-foreground",
										children: "تعداد کپی"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "mt-1 tabular-nums font-medium",
										children: formatFaCompact(base.copyCount)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl bg-surface p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-xs text-muted-foreground",
										children: "تاریخ افزودن"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "mt-1",
										children: formatFaDate(base.discoveredAt)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl bg-surface p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-xs text-muted-foreground",
										children: "بازدید"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "mt-1 tabular-nums",
										children: faNum(base.viewCount + 1)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl bg-surface p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-xs text-muted-foreground",
										children: "سازنده / منبع"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "mt-1 line-clamp-2",
										children: base.builder ?? "کلش‌مپ"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-2 sm:flex-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyBaseButton, {
								id: base.id,
								copyUrl: base.copyUrl,
								size: "lg",
								className: "flex-1"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "secondary",
								size: "lg",
								className: "flex-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: base.copyUrl,
									target: "_blank",
									rel: "noopener noreferrer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {}), "باز کردن در بازی"]
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs leading-relaxed text-muted-foreground",
							children: "لینک کپی، لینک رسمی سوپرسل است. بعد از کپی، کلش آو کلنز را باز کنید و مپ را در یک اسلات خالی ذخیره کنید. تالار شما باید با تالار این بیس یکی باشد."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2 pt-2 text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { className: "size-3.5" }),
								"گزارش:",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "hover:text-foreground",
									onClick: () => void report("broken"),
									children: "لینک خراب"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "hover:text-foreground",
									onClick: () => void report("wrong-th"),
									children: "تالار اشتباه"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "hover:text-foreground",
									onClick: () => void report("wrong-type"),
									children: "نوع اشتباه"
								})
							]
						})
					]
				})]
			}),
			related.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10 space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold",
					children: "مپ‌های مشابه"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3",
					children: related.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BaseCard, { base: item }, item.id))
				})]
			}) : null
		]
	});
}
//#endregion
export { BaseDetailPage as component };
