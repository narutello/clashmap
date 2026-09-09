import { createFileRoute } from "@tanstack/react-router";
import { listBasesFn } from "@/lib/api";
import { listingSeo } from "@/lib/catalog";
import { ListingPage } from "@/components/listing-page";

export const Route = createFileRoute("/popular")({
  loader: () => listBasesFn({ data: { sort: "popular" } }),
  component: PopularPage,
  head: () => {
    const seo = listingSeo({ sort: "popular" });
    return { meta: [{ title: seo.title }, { name: "description", content: seo.description }] };
  },
});

function PopularPage() {
  const data = Route.useLoaderData();
  return (
    <ListingPage
      heading="محبوب‌ترین مپ‌ها"
      intro="بیس‌هایی که بیشترین تعداد کپی را داشته‌اند. برای هر تالار هم می‌توانید فیلتر کنید."
      items={data.items}
      total={data.total}
      sort="popular"
    />
  );
}
