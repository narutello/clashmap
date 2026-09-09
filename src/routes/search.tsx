import { createFileRoute } from "@tanstack/react-router";
import { listBasesFn } from "@/lib/api";
import { isBaseType, listingSeo, type BaseType } from "@/lib/catalog";
import { ListingPage } from "@/components/listing-page";
import { SearchFilters } from "@/components/filters";

export type SearchParams = {
  q?: string;
  th?: number;
  type?: BaseType;
};

function parseSearch(search: Record<string, unknown>): SearchParams {
  const q = typeof search.q === "string" ? search.q.slice(0, 80) : undefined;
  const thRaw = search.th;
  const thNum =
    typeof thRaw === "number"
      ? thRaw
      : typeof thRaw === "string" && /^\d+$/.test(thRaw)
        ? Number.parseInt(thRaw, 10)
        : undefined;
  const th = thNum && thNum >= 4 && thNum <= 18 ? thNum : undefined;
  const typeRaw = typeof search.type === "string" ? search.type : undefined;
  const type = typeRaw && isBaseType(typeRaw) ? typeRaw : undefined;
  return { q, th, type };
}

export const Route = createFileRoute("/search")({
  validateSearch: parseSearch,
  loaderDeps: ({ search }) => search,
  loader: ({ deps }) =>
    listBasesFn({
      data: {
        q: deps.q ?? null,
        townHall: deps.th ?? null,
        baseType: deps.type ?? null,
        sort: "latest",
      },
    }),
  component: SearchPage,
  head: () => {
    const seo = listingSeo({});
    return {
      meta: [
        { title: seo.title.replace("جدیدترین مپ‌های کلش آو کلنز", "جستجوی مپ کلش آو کلنز") },
        { name: "description", content: "جستجو و فیلتر مپ‌های کلش آو کلنز بر اساس تالار و نوع بیس." },
      ],
    };
  },
});

function SearchPage() {
  const data = Route.useLoaderData();
  const search = Route.useSearch();
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 pt-6">
        <SearchFilters townHall={search.th} baseType={search.type} q={search.q} />
      </div>
      <ListingPage
        heading={search.q ? `نتایج «${search.q}»` : "جستجوی مپ"}
        intro="جستجو با فیلتر تالار و نوع مپ ترکیب می‌شود."
        items={data.items}
        total={data.total}
        sort="latest"
        townHall={search.th}
        baseType={search.type}
        query={search.q}
        hideFilters
      />
    </div>
  );
}
