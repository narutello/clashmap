import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { c as formatFaDate, i as BASE_TYPE_FA, o as faNum, s as formatFaCompact } from "./catalog-DAYv4YM6.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { m as Check, p as Copy } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { d as Button, f as cn, p as copyBaseFn } from "./router-DZ_dB8j4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/base-card-kntXB2n2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Placeholder({ townHall, baseType }) {
	const seed = (townHall * 17 + baseType.length * 13) % 8;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "village-grid relative flex h-full w-full items-center justify-center overflow-hidden bg-surface",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 160 120",
			className: "absolute inset-0 h-full w-full opacity-80",
			"aria-hidden": true,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "28",
					y: "38",
					width: "104",
					height: "58",
					rx: "4",
					fill: "none",
					stroke: "currentColor",
					strokeOpacity: "0.18"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "48",
					y: "50",
					width: "64",
					height: "34",
					rx: "3",
					fill: "currentColor",
					fillOpacity: "0.08",
					stroke: "currentColor",
					strokeOpacity: "0.22"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: "80,22 96,50 64,50",
					fill: "currentColor",
					fillOpacity: "0.18",
					stroke: "currentColor",
					strokeOpacity: "0.35"
				}),
				Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: 36 + (i * 19 + seed * 7) % 90,
					cy: 46 + (i * 11 + seed) % 36,
					r: "3",
					fill: "currentColor",
					fillOpacity: "0.22"
				}, i))
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative z-10 rounded-full bg-background/80 px-3 py-1 text-xs font-medium text-foreground",
			children: [
				"تالار ",
				faNum(townHall),
				" · ",
				BASE_TYPE_FA[baseType]
			]
		})]
	});
}
function BaseImage({ src, alt, townHall, baseType, className, priority = false }) {
	const [failed, setFailed] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("relative aspect-[16/10] overflow-hidden bg-surface", className),
		children: !src || failed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Placeholder, {
			townHall,
			baseType
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src,
			alt,
			loading: priority ? "eager" : "lazy",
			decoding: "async",
			referrerPolicy: "no-referrer",
			className: "h-full w-full object-cover",
			onError: () => setFailed(true)
		})
	});
}
var badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium tabular-nums", {
	variants: { variant: {
		default: "bg-primary/15 text-primary",
		moss: "bg-accent/15 text-accent",
		outline: "text-muted-foreground",
		brass: "bg-primary text-primary-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
function CopyBaseButton({ id, copyUrl, className, size = "default" }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function onCopy(e) {
		e.preventDefault();
		e.stopPropagation();
		if (busy) return;
		setBusy(true);
		try {
			await navigator.clipboard.writeText(copyUrl);
			setCopied(true);
			toast.success("لینک بیس کپی شد. بازی را باز کنید تا مپ بارگذاری شود.");
			copyBaseFn({ data: { id } }).catch(() => void 0);
			window.setTimeout(() => setCopied(false), 1800);
		} catch {
			toast.error("کپی انجام نشد. لینک بازی را مستقیم باز می‌کنیم.");
			window.open(copyUrl, "_blank", "noopener,noreferrer");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		type: "button",
		size,
		onClick: onCopy,
		className: cn("min-w-28", className),
		disabled: busy,
		children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {}), copied ? "کپی شد" : "کپی بیس"]
	});
}
function BaseCard({ base, priority = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "group flex flex-col overflow-hidden rounded-2xl bg-card p-2 transition-[box-shadow,transform] duration-150 ease-out hover:-translate-y-0.5",
		style: { boxShadow: "var(--shadow-border)" },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/base/$id",
			params: { id: base.id },
			className: "block",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BaseImage, {
				src: base.imageUrl,
				alt: base.titleFa,
				townHall: base.townHall,
				baseType: base.baseType,
				className: "rounded-xl",
				priority
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col gap-3 p-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							variant: "brass",
							children: ["TH", faNum(base.townHall)]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "moss",
							children: BASE_TYPE_FA[base.baseType]
						}),
						base.trending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "ترند" }) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/base/$id",
					params: { id: base.id },
					className: "block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "line-clamp-2 text-sm font-semibold leading-snug text-foreground",
						children: base.titleFa
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 line-clamp-1 text-xs text-muted-foreground",
						children: base.title
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto flex items-center justify-between gap-2 pt-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "tabular-nums",
							children: [formatFaCompact(base.copyCount), " کپی"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: formatFaDate(base.discoveredAt) })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyBaseButton, {
						id: base.id,
						copyUrl: base.copyUrl,
						size: "sm"
					})]
				})
			]
		})]
	});
}
//#endregion
export { CopyBaseButton as i, BaseCard as n, BaseImage as r, Badge as t };
