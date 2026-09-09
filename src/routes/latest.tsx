import { createFileRoute } from "@tanstack/react-router";
import { listBasesFn } from "@/lib/api";
import { listingSeo } from "@/lib/catalog";
import { ListingPage } from "@/components/listing-page";

export const Route = createFileRoute("/latest")({
  loader: () => listBasesFn({ data: { sort: "latest" } }),
  component: LatestPage,
  head: () => {
    const seo = listingSeo({ sort: "latest" });
    return { meta: [{ title: seo.title }, { name: "description", content: seo.description }] };
  },
});

function LatestPage() {
  const data = Route.useLoaderData();
  return (
    <ListingPage
      heading="جدیدترین مپ‌ها"
      intro="تازه‌ترین بیس‌هایی که امروز و روزهای اخیر به کاتالوگ اضافه شده‌اند."
      items={data.items}
      total={data.total}
      sort="latest"
    />
  );
}
