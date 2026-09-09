import type { BaseCard as BaseCardType } from "@/lib/catalog";
import { BaseCard } from "@/components/base-card";
import { EmptyState } from "@/components/empty-state";
import { Skeleton } from "@/components/ui/skeleton";

export function BaseGrid({ items }: { items: BaseCardType[] }) {
  if (!items.length) {
    return <EmptyState />;
  }
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((base, i) => (
        <BaseCard key={base.id} base={base} priority={i < 3} />
      ))}
    </div>
  );
}

export function BaseGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-2xl bg-card p-2" style={{ boxShadow: "var(--shadow-border)" }}>
          <Skeleton className="aspect-[16/10] rounded-xl" />
          <div className="space-y-2 p-3">
            <Skeleton className="h-5 w-24 rounded-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
