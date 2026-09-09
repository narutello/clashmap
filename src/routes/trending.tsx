import { createFileRoute } from "@tanstack/react-router";
import { listBasesFn } from "@/lib/api";
import { listingSeo } from "@/lib/catalog";
import { ListingPage } from "@/components/listing-page";

export const Route = createFileRoute("/trending")({
  loader: () => listBasesFn({ data: { sort: "trending" } }),
  component: TrendingPage,
  head: () => {
    const seo = listingSeo({ sort: "trending" });
    return { meta: [{ title: seo.title }, { name: "description", content: seo.description }] };
  },
});

function TrendingPage() {
  const data = Route.useLoaderData();
  return (
    <ListingPage
      heading="مپ‌های ترند"
      intro="بیس‌هایی که در روزهای اخیر بیشتر کپی شده‌اند و در حال رشد هستند."
      items={data.items}
      total={data.total}
      sort="trending"
    />
  );
}
