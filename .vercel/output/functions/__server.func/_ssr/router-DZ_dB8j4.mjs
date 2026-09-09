import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as Link, f as createRouter, g as createRootRoute, h as createFileRoute, l as Scripts, m as lazyRouteComponent, p as Outlet, u as HeadContent, v as useNavigate, y as useRouter, z as notFound } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { l as Slot } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { a as TOWN_HALLS, d as pageTitle, f as parseTownHallParam, i as BASE_TYPE_FA, l as isBaseType, n as APP_TAGLINE, o as faNum, r as BASE_TYPES, t as APP_NAME, u as listingSeo } from "./catalog-DAYv4YM6.mjs";
import { a as string, i as object, n as literal, o as union, r as number, t as _enum } from "../_libs/zod.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as __exportAll } from "./rolldown-runtime-D7D4PA-g.mjs";
import { a as Sun, c as Moon, o as Search, r as TriangleAlert, u as Flame } from "../_libs/lucide-react.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-BR0C0h_u.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-[transform,background-color,box-shadow,opacity] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:not-disabled:scale-[0.96] [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow-sm hover:opacity-95",
			secondary: "bg-surface text-foreground hover:bg-muted",
			outline: "bg-transparent text-foreground hover:bg-surface",
			ghost: "hover:bg-surface",
			destructive: "bg-destructive text-primary-foreground hover:opacity-90"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-xs",
			lg: "h-12 px-5 text-base",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var listInput = object({
	townHall: number().int().min(4).max(18).nullable().optional(),
	baseType: string().nullable().optional(),
	sort: _enum([
		"latest",
		"popular",
		"trending"
	]).optional(),
	q: string().max(80).nullable().optional(),
	offset: number().int().min(0).max(2e4).optional(),
	limit: number().int().min(1).max(48).optional()
});
var listBasesFn = createServerFn({ method: "GET" }).validator(listInput).handler(createSsrRpc("24e662a23604df0f779641dfaef62cb43b5246b6883e9eb11022e83e4150dac2"));
var getBaseFn = createServerFn({ method: "GET" }).validator(object({ id: string().min(1).max(96) })).handler(createSsrRpc("3d36a1b39a2248d23f5e8d3c48ec59ca597cb761fc4d9065c59230958a12c65b"));
var homeFn = createServerFn({ method: "GET" }).handler(createSsrRpc("b14c2f976d327c0a01dc247ae918d17c82e23c630d8e7b81cb21534db8760045"));
var copyBaseFn = createServerFn({ method: "POST" }).validator(object({ id: string().min(1).max(96) })).handler(createSsrRpc("b0077d02d250f2023f251ba3ac7626e2c4842a730432b4003fb948c944cc771c"));
var reportBaseFn = createServerFn({ method: "POST" }).validator(object({
	id: string().min(1).max(96),
	reason: _enum([
		"broken",
		"wrong-th",
		"wrong-type",
		"other"
	])
})).handler(createSsrRpc("3ec9b54aaad7d79f944c0d5df8c060223bdb6309d4fc9dedc8c0eb90eff62b34"));
createServerFn({ method: "POST" }).handler(createSsrRpc("1b991017110b873dff846120f8f183891e9b4854a5e709780b653f9532fe5aec"));
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-DZ_dB8j4.js
var FALLBACK_MESSAGE = "یک خطای غیرمنتظره رخ داد. صفحه را دوباره بارگذاری کنید.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 bg-background px-6 text-center text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-destructive",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "مشکلی پیش آمد"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-muted-foreground",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("flex h-11 w-full rounded-lg bg-card px-3 text-sm text-foreground placeholder:text-muted-foreground", "transition-[box-shadow] duration-150 ease-out", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", "disabled:cursor-not-allowed disabled:opacity-50", className),
		style: { boxShadow: "var(--shadow-border)" },
		...props
	});
}
function SearchBar({ defaultValue = "", autoFocus = false }) {
	const navigate = useNavigate();
	const [q, setQ] = (0, import_react.useState)(defaultValue);
	function submit(e) {
		e.preventDefault();
		const next = q.trim();
		navigate({
			to: "/search",
			search: (prev) => ({
				...prev,
				q: next || void 0
			})
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: submit,
		className: "relative w-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			value: q,
			onChange: (e) => setQ(e.target.value),
			placeholder: "جستجوی مپ، تالار یا نوع بیس…",
			"aria-label": "جستجوی مپ",
			autoFocus,
			className: "pr-10"
		})]
	});
}
var ThemeContext = (0, import_react.createContext)(null);
var STORAGE_KEY = "clashmap-theme";
function readTheme() {
	if (typeof document === "undefined") return "dark";
	return document.documentElement.classList.contains("dark") ? "dark" : "light";
}
function ThemeProvider({ children }) {
	const [theme, setTheme] = (0, import_react.useState)(readTheme);
	(0, import_react.useEffect)(() => {
		document.documentElement.classList.toggle("dark", theme === "dark");
		try {
			localStorage.setItem(STORAGE_KEY, theme);
		} catch {}
	}, [theme]);
	const value = (0, import_react.useMemo)(() => ({
		theme,
		toggle: () => setTheme((t) => t === "dark" ? "light" : "dark")
	}), [theme]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeContext.Provider, {
		value,
		children
	});
}
function useTheme() {
	const ctx = (0, import_react.useContext)(ThemeContext);
	if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
	return ctx;
}
var NAV = [
	{
		to: "/latest",
		label: "جدیدترین"
	},
	{
		to: "/popular",
		label: "محبوب"
	},
	{
		to: "/trending",
		label: "ترند"
	}
];
function SiteHeader() {
	const { theme, toggle } = useTheme();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "flex min-h-11 items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "size-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-base font-semibold tracking-tight",
								children: APP_NAME
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "ms-auto hidden items-center gap-1 md:flex",
							children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: item.to,
								className: "inline-flex h-10 items-center rounded-lg px-3 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground",
								activeProps: { className: "bg-surface text-foreground" },
								children: item.label
							}, item.to))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							size: "icon",
							"aria-label": theme === "dark" ? "حالت روشن" : "حالت تاریک",
							onClick: toggle,
							className: "ms-auto md:ms-0",
							children: theme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, {})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchBar, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex gap-2 overflow-x-auto pb-1 md:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
					children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.to,
						className: "inline-flex h-10 shrink-0 items-center rounded-full bg-surface px-4 text-sm",
						activeProps: { className: "bg-primary text-primary-foreground" },
						children: item.label
					}, item.to))
				})
			]
		})
	});
}
function SiteFooter({ lastSync }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "mt-auto border-t border-border bg-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold",
						children: APP_NAME
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed text-muted-foreground",
						children: "پلتفرم فارسی کشف و کپی مپ‌های کلش آو کلنز. بیس‌ها به‌صورت روزانه از منابع مجاز جمع‌آوری می‌شوند."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 text-sm font-medium",
					children: "تالار شهر"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground",
					children: TOWN_HALLS.slice(0, 8).map((th) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/th/$th",
						params: { th: String(th) },
						className: "hover:text-foreground",
						children: ["TH", th]
					}, th))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/how-to",
							className: "hover:text-foreground",
							children: "راهنمای کپی بیس"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/latest",
							className: "hover:text-foreground",
							children: "جدیدترین مپ‌ها"
						}) }),
						lastSync ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["آخرین به‌روزرسانی: ", new Date(lastSync).toLocaleString("fa-IR")] }) : null
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mx-auto max-w-6xl px-4 pb-8 text-xs leading-relaxed text-muted-foreground",
			children: "این محتوا وابسته به، تأییدشده، حمایت‌شده یا به‌طور خاص تصویب‌شده توسط سوپرسل نیست و سوپرسل مسئولیتی در قبال آن ندارد. برای اطلاعات بیشتر سیاست محتوای طرفداران سوپرسل را ببینید. Clash of Clans علامت تجاری سوپرسل است."
		})]
	});
}
var styles_default = "/assets/styles-9MHnA6Ri.css";
var THEME_BOOT = `(function(){try{var k='clashmap-theme';var t=localStorage.getItem(k);if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}var r=document.documentElement;r.classList.toggle('dark',t==='dark');r.style.colorScheme=t;}catch(e){document.documentElement.classList.add('dark');}})();`;
var Route$12 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{ title: `${APP_NAME} | ${APP_TAGLINE}` },
			{
				name: "description",
				content: "کشف، فیلتر و کپی مپ‌های کلش آو کلنز بر اساس تالار شهر و نوع بیس. جدیدترین، محبوب‌ترین و ترندترین مپ‌ها با لینک کپی مستقیم."
			},
			{
				name: "theme-color",
				content: "#0d120e"
			},
			{
				name: "apple-mobile-web-app-capable",
				content: "yes"
			},
			{
				name: "mobile-web-app-capable",
				content: "yes"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;600;700&display=swap"
			}
		]
	}),
	component: RootComponent,
	notFoundComponent: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center gap-3 px-4 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-xl font-semibold",
				children: "صفحه پیدا نشد"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "این آدرس در کلش‌مپ وجود ندارد."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "/",
				className: "text-sm text-primary",
				children: "بازگشت به خانه"
			})
		]
	})
});
function RootComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "fa",
		dir: "rtl",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: THEME_BOOT } }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ThemeProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-dvh flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				position: "top-center",
				richColors: true,
				closeButton: true,
				dir: "rtl"
			})] }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
var $$splitComponentImporter$9 = () => import("./routes-Dk5B0fNP.mjs");
var Route$11 = createFileRoute("/")({
	loader: () => homeFn(),
	pendingComponent: HomePending,
	component: lazyRouteComponent($$splitComponentImporter$9, "component"),
	head: () => ({ meta: [{ title: `${APP_NAME} | ${APP_TAGLINE}` }, {
		name: "description",
		content: "کلش‌مپ؛ پلتفرم فارسی کشف مپ کلش آو کلنز. فیلتر بر اساس تالار شهر و نوع بیس، مشاهده تصویر و کپی مستقیم لینک بازی."
	}] })
});
function HomePending() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "mx-auto w-full max-w-6xl px-4 py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 animate-pulse rounded-2xl bg-card" })
	});
}
var $$splitComponentImporter$8 = () => import("./how-to-Cy1vweEZ.mjs");
var Route$10 = createFileRoute("/how-to")({
	component: lazyRouteComponent($$splitComponentImporter$8, "component"),
	head: () => ({ meta: [{ title: pageTitle(["راهنمای کپی بیس"]) }, {
		name: "description",
		content: "چطور لینک مپ کلش آو کلنز را کپی کنیم و در بازی بارگذاری کنیم."
	}] })
});
var $$splitComponentImporter$7 = () => import("./latest-85kbyXix.mjs");
var Route$9 = createFileRoute("/latest")({
	loader: () => listBasesFn({ data: { sort: "latest" } }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component"),
	head: () => {
		const seo = listingSeo({ sort: "latest" });
		return { meta: [{ title: seo.title }, {
			name: "description",
			content: seo.description
		}] };
	}
});
var $$splitComponentImporter$6 = () => import("./popular-DdJgvrkX.mjs");
var Route$8 = createFileRoute("/popular")({
	loader: () => listBasesFn({ data: { sort: "popular" } }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component"),
	head: () => {
		const seo = listingSeo({ sort: "popular" });
		return { meta: [{ title: seo.title }, {
			name: "description",
			content: seo.description
		}] };
	}
});
var $$splitComponentImporter$5 = () => import("./search-DXZ2zi2m.mjs");
function parseSearch(search) {
	const q = typeof search.q === "string" ? search.q.slice(0, 80) : void 0;
	const thRaw = search.th;
	const thNum = typeof thRaw === "number" ? thRaw : typeof thRaw === "string" && /^\d+$/.test(thRaw) ? Number.parseInt(thRaw, 10) : void 0;
	const th = thNum && thNum >= 4 && thNum <= 18 ? thNum : void 0;
	const typeRaw = typeof search.type === "string" ? search.type : void 0;
	return {
		q,
		th,
		type: typeRaw && isBaseType(typeRaw) ? typeRaw : void 0
	};
}
var Route$7 = createFileRoute("/search")({
	validateSearch: parseSearch,
	loaderDeps: ({ search }) => search,
	loader: ({ deps }) => listBasesFn({ data: {
		q: deps.q ?? null,
		townHall: deps.th ?? null,
		baseType: deps.type ?? null,
		sort: "latest"
	} }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component"),
	head: () => {
		return { meta: [{ title: listingSeo({}).title.replace("جدیدترین مپ‌های کلش آو کلنز", "جستجوی مپ کلش آو کلنز") }, {
			name: "description",
			content: "جستجو و فیلتر مپ‌های کلش آو کلنز بر اساس تالار و نوع بیس."
		}] };
	}
});
function xmlEscape(s) {
	return s.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">");
}
var Route$6 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async ({ request }) => {
	const { sitemapEntries } = await import("./bases.server-C9iqnB7z.mjs");
	const origin = new URL(request.url).origin;
	const staticPaths = [
		"/",
		"/latest",
		"/popular",
		"/trending",
		"/search",
		"/how-to",
		...TOWN_HALLS.map((th) => `/th/${th}`),
		...BASE_TYPES.map((t) => `/type/${t}`),
		...TOWN_HALLS.flatMap((th) => BASE_TYPES.map((t) => `/th/${th}/${t}`))
	];
	const bases = await sitemapEntries(3e3);
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticPaths.map((loc) => ({
		loc,
		lastmod: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
	})), ...bases].map((u) => `  <url><loc>${xmlEscape(origin + u.loc)}</loc><lastmod>${u.lastmod}</lastmod></url>`).join("\n")}
</urlset>`;
	return new Response(body, { headers: {
		"content-type": "application/xml; charset=utf-8",
		"cache-control": "public, max-age=3600"
	} });
} } } });
var $$splitComponentImporter$4 = () => import("./trending-CiUF7Fbn.mjs");
var Route$5 = createFileRoute("/trending")({
	loader: () => listBasesFn({ data: { sort: "trending" } }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component"),
	head: () => {
		const seo = listingSeo({ sort: "trending" });
		return { meta: [{ title: seo.title }, {
			name: "description",
			content: seo.description
		}] };
	}
});
var $$splitComponentImporter$3 = () => import("./base._id-B4CmvdaK.mjs");
var Route$4 = createFileRoute("/base/$id")({
	loader: async ({ params }) => {
		const data = await getBaseFn({ data: { id: params.id } });
		if (!data.base) throw notFound();
		return data;
	},
	component: lazyRouteComponent($$splitComponentImporter$3, "component"),
	head: ({ loaderData }) => {
		const base = loaderData?.base;
		if (!base) return {};
		return { meta: [{ title: pageTitle([base.titleFa]) }, {
			name: "description",
			content: `${base.titleFa}. مپ ${BASE_TYPE_FA[base.baseType]} برای تالار ${faNum(base.townHall)} با لینک کپی مستقیم کلش آو کلنز.`
		}] };
	}
});
var $$splitComponentImporter$2 = () => import("./th._th-IIYsy8yV.mjs");
var Route$3 = createFileRoute("/th/$th")({
	loader: async ({ params }) => {
		const th = parseTownHallParam(params.th);
		if (!th) throw notFound();
		return {
			th,
			...await listBasesFn({ data: {
				townHall: th,
				sort: "latest"
			} })
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$2, "component"),
	head: ({ loaderData }) => {
		if (!loaderData) return {};
		const seo = listingSeo({ townHall: loaderData.th });
		return { meta: [{ title: seo.title }, {
			name: "description",
			content: seo.description
		}] };
	}
});
var $$splitComponentImporter$1 = () => import("./type._type-DVao8Vko.mjs");
var Route$2 = createFileRoute("/type/$type")({
	loader: async ({ params }) => {
		if (!isBaseType(params.type)) throw notFound();
		const data = await listBasesFn({ data: {
			baseType: params.type,
			sort: "latest"
		} });
		return {
			type: params.type,
			...data
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$1, "component"),
	head: ({ loaderData }) => {
		if (!loaderData) return {};
		const seo = listingSeo({ baseType: loaderData.type });
		return { meta: [{ title: seo.title }, {
			name: "description",
			content: seo.description
		}] };
	}
});
async function handle(request) {
	const { env } = await import("./env.server-DPOgKb4J.mjs").then((n) => n.n).then((n) => n.n);
	const { runIngest } = await import("./ingest.server-loOY8Pcl.mjs");
	const secret = env("CRON_SECRET");
	if (secret) {
		const auth = request.headers.get("authorization");
		const vercelCron = request.headers.get("x-vercel-cron");
		if (!(auth === `Bearer ${secret}` || vercelCron === "1")) return new Response(JSON.stringify({ error: "unauthorized" }), {
			status: 401,
			headers: { "content-type": "application/json; charset=utf-8" }
		});
	}
	try {
		const summary = await runIngest();
		return new Response(JSON.stringify(summary), {
			status: 200,
			headers: { "content-type": "application/json; charset=utf-8" }
		});
	} catch (err) {
		const message = err instanceof Error ? err.message : "ingest failed";
		console.error("[cron/sync]", err);
		return new Response(JSON.stringify({ error: message }), {
			status: 500,
			headers: { "content-type": "application/json; charset=utf-8" }
		});
	}
}
var Route$1 = createFileRoute("/api/cron/sync")({ server: { handlers: {
	GET: ({ request }) => handle(request),
	POST: ({ request }) => handle(request)
} } });
var $$splitComponentImporter = () => import("./th._th._type-CfGouGc2.mjs");
var Route = createFileRoute("/th/$th/$type")({
	loader: async ({ params }) => {
		const th = parseTownHallParam(params.th);
		if (!th || !isBaseType(params.type)) throw notFound();
		const data = await listBasesFn({ data: {
			townHall: th,
			baseType: params.type,
			sort: "latest"
		} });
		return {
			th,
			type: params.type,
			...data
		};
	},
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	head: ({ loaderData }) => {
		if (!loaderData) return {};
		const seo = listingSeo({
			townHall: loaderData.th,
			baseType: loaderData.type
		});
		return { meta: [{ title: seo.title }, {
			name: "description",
			content: seo.description
		}] };
	}
});
var IndexRoute = Route$11.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$12
});
var HowToRoute = Route$10.update({
	id: "/how-to",
	path: "/how-to",
	getParentRoute: () => Route$12
});
var LatestRoute = Route$9.update({
	id: "/latest",
	path: "/latest",
	getParentRoute: () => Route$12
});
var PopularRoute = Route$8.update({
	id: "/popular",
	path: "/popular",
	getParentRoute: () => Route$12
});
var SearchRoute = Route$7.update({
	id: "/search",
	path: "/search",
	getParentRoute: () => Route$12
});
var SitemapDotxmlRoute = Route$6.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$12
});
var TrendingRoute = Route$5.update({
	id: "/trending",
	path: "/trending",
	getParentRoute: () => Route$12
});
var BaseIdRoute = Route$4.update({
	id: "/base/$id",
	path: "/base/$id",
	getParentRoute: () => Route$12
});
var ThThRoute = Route$3.update({
	id: "/th/$th",
	path: "/th/$th",
	getParentRoute: () => Route$12
});
var TypeTypeRoute = Route$2.update({
	id: "/type/$type",
	path: "/type/$type",
	getParentRoute: () => Route$12
});
var ApiCronSyncRoute = Route$1.update({
	id: "/api/cron/sync",
	path: "/api/cron/sync",
	getParentRoute: () => Route$12
});
var ThThRouteChildren = { ThThTypeRoute: Route.update({
	id: "/$type",
	path: "/$type",
	getParentRoute: () => ThThRoute
}) };
var rootRouteChildren = {
	IndexRoute,
	HowToRoute,
	LatestRoute,
	PopularRoute,
	SearchRoute,
	SitemapDotxmlRoute,
	TrendingRoute,
	BaseIdRoute,
	ThThRoute: ThThRoute._addFileChildren(ThThRouteChildren),
	TypeTypeRoute,
	ApiCronSyncRoute
};
var routeTree = Route$12._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent,
		defaultPreload: "intent",
		scrollRestoration: true
	});
}
//#endregion
export { Route$4 as a, Route$8 as c, Button as d, cn as f, reportBaseFn as h, Route$3 as i, Route$9 as l, listBasesFn as m, Route as n, Route$5 as o, copyBaseFn as p, Route$2 as r, Route$7 as s, router_exports as t, Route$11 as u };
