import { Filter } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import {
  BASE_TYPE_FA,
  BASE_TYPES,
  TOWN_HALLS,
  faNum,
  type BaseType,
} from "@/lib/catalog";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export type FilterValue = {
  townHall?: number | null;
  baseType?: BaseType | null;
};

function chipClass(active: boolean, tone: "th" | "type") {
  return cn(
    "inline-flex h-10 shrink-0 items-center rounded-full px-3.5 text-sm font-medium transition-colors duration-150",
    active
      ? tone === "th"
        ? "bg-primary text-primary-foreground"
        : "bg-accent text-accent-foreground"
      : "bg-surface text-foreground",
  );
}

function Chip({
  label,
  active,
  href,
  onClick,
  tone,
}: {
  label: string;
  active: boolean;
  href?: string;
  onClick?: () => void;
  tone: "th" | "type";
}) {
  const className = chipClass(active, tone);
  if (href) {
    return (
      <a href={href} className={className}>
        {label}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={className}>
      {label}
    </button>
  );
}

export function FilterBar({
  value,
  onChange,
  mode = "navigate",
}: {
  value: FilterValue;
  onChange?: (next: FilterValue) => void;
  mode?: "navigate" | "state";
}) {
  function hrefFor(next: FilterValue) {
    const th = next.townHall ?? null;
    const type = next.baseType ?? null;
    if (th && type) return `/th/${th}/${type}`;
    if (th) return `/th/${th}`;
    if (type) return `/type/${type}`;
    return "/latest";
  }

  const inner = (
    <div className="flex flex-col gap-3">
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <Chip
          tone="th"
          label="همه تالارها"
          active={!value.townHall}
          href={mode === "navigate" ? hrefFor({ ...value, townHall: null }) : undefined}
          onClick={mode === "state" ? () => onChange?.({ ...value, townHall: null }) : undefined}
        />
        {TOWN_HALLS.map((th) => (
          <Chip
            key={th}
            tone="th"
            label={`TH${faNum(th)}`}
            active={value.townHall === th}
            href={mode === "navigate" ? hrefFor({ ...value, townHall: th }) : undefined}
            onClick={mode === "state" ? () => onChange?.({ ...value, townHall: th }) : undefined}
          />
        ))}
      </div>
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <Chip
          tone="type"
          label="همه نوع‌ها"
          active={!value.baseType}
          href={mode === "navigate" ? hrefFor({ ...value, baseType: null }) : undefined}
          onClick={mode === "state" ? () => onChange?.({ ...value, baseType: null }) : undefined}
        />
        {BASE_TYPES.map((type) => (
          <Chip
            key={type}
            tone="type"
            label={BASE_TYPE_FA[type]}
            active={value.baseType === type}
            href={mode === "navigate" ? hrefFor({ ...value, baseType: type }) : undefined}
            onClick={mode === "state" ? () => onChange?.({ ...value, baseType: type }) : undefined}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-3">
      <div className="hidden md:block">{inner}</div>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="secondary" className="w-full">
              <Filter />
              فیلتر تالار و نوع مپ
              {value.townHall || value.baseType ? (
                <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                  فعال
                </span>
              ) : null}
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetTitle className="mb-4">فیلتر مپ‌ها</SheetTitle>
            {inner}
            <p className="mt-4 text-xs text-muted-foreground">
              می‌توانید تالار و نوع مپ را با هم ترکیب کنید؛ مثلاً تالار ۱۷ و مپ جنگ.
            </p>
          </SheetContent>
        </Sheet>
        {value.townHall || value.baseType ? (
          <div className="mt-2 flex flex-wrap gap-2">
            {value.townHall ? (
              <Chip tone="th" label={`TH${faNum(value.townHall)}`} active />
            ) : null}
            {value.baseType ? (
              <Chip tone="type" label={BASE_TYPE_FA[value.baseType]} active />
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function SearchFilters({
  townHall,
  baseType,
  q,
}: {
  townHall?: number | null;
  baseType?: BaseType | null;
  q?: string;
}) {
  const navigate = useNavigate();
  return (
    <FilterBar
      value={{ townHall, baseType }}
      mode="state"
      onChange={(next) => {
        void navigate({
          to: "/search",
          search: (prev) => ({
            ...prev,
            q: q || undefined,
            th: next.townHall ?? undefined,
            type: next.baseType ?? undefined,
          }),
        });
      }}
    />
  );
}
