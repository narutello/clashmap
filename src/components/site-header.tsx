import { Link } from "@tanstack/react-router";
import { Flame, Moon, Sun } from "lucide-react";
import { APP_NAME } from "@/lib/catalog";
import { SearchBar } from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

const NAV = [
  { to: "/latest" as const, label: "جدیدترین" },
  { to: "/popular" as const, label: "محبوب" },
  { to: "/trending" as const, label: "ترند" },
];

export function SiteHeader() {
  const { theme, toggle } = useTheme();
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex min-h-11 items-center gap-2">
            <span className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Flame className="size-4" />
            </span>
            <span className="text-base font-semibold tracking-tight">{APP_NAME}</span>
          </Link>
          <nav className="ms-auto hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="inline-flex h-10 items-center rounded-lg px-3 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
                activeProps={{ className: "bg-surface text-foreground" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={theme === "dark" ? "حالت روشن" : "حالت تاریک"}
            onClick={toggle}
            className="ms-auto md:ms-0"
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </Button>
        </div>
        <SearchBar />
        <nav className="flex gap-2 overflow-x-auto pb-1 md:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="inline-flex h-10 shrink-0 items-center rounded-full bg-surface px-4 text-sm"
              activeProps={{ className: "bg-primary text-primary-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
