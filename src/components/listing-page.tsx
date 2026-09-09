import { useState } from "react";
import { listBasesFn } from "@/lib/api";
import { PAGE_SIZE, faNum, listingSeo, type BaseCard as BaseCardType, type BaseType, type SortKey } from "@/lib/catalog";
import { BaseGrid } from "@/components/base-grid";
import { FilterBar } from "@/components/filters";
import { Button } from "@/components/ui/button";

export function ListingPage({
  heading,
  intro,
  items,
  total,
  sort,
  townHall,
  baseType,
  query,
  hideFilters = false,
}: {
  heading: string;
  intro?: string;
  items: BaseCardType[];
  total: number;
  sort: SortKey;
  townHall?: number | null;
  baseType?: BaseType | null;
  query?: string | null;
  hideFilters?: boolean;
}) {
  const [extra, setExtra] = useState<BaseCardType[]>([]);
  const [loading, setLoading] = useState(false);
  const all = [...items, ...extra];
  const canMore = all.length < total;
  const seo = listingSeo({ townHall, baseType, sort, query });

  async function loadMore() {
    if (loading) return;
    setLoading(true);
    try {
      const next = await listBasesFn({
        data: {
          townHall: townHall ?? null,
          baseType: baseType ?? null,
          sort,
          q: query ?? null,
          offset: all.length,
          limit: PAGE_SIZE,
        },
      });
      setExtra((prev) => [...prev, ...next.items]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 md:py-10">
      <header className="mb-6 space-y-2">
        <p className="text-xs font-medium text-primary">{seo.title.split(" | ")[0]}</p>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">{heading}</h1>
        {intro ? <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">{intro}</p> : null}
        <p className="text-xs tabular-nums text-muted-foreground">{faNum(total)} مپ</p>
      </header>
      {hideFilters ? null : (
        <div className="mb-6">
          <FilterBar value={{ townHall, baseType }} />
        </div>
      )}
      <BaseGrid items={all} />
      {canMore ? (
        <div className="mt-8 flex justify-center">
          <Button variant="secondary" onClick={() => void loadMore()} disabled={loading}>
            {loading ? "در حال بارگذاری…" : "مپ‌های بیشتر"}
          </Button>
        </div>
      ) : null}
    </main>
  );
}
