import { createFileRoute, notFound } from "@tanstack/react-router";
import { listBasesFn } from "@/lib/api";
import { faNum, listingSeo, parseTownHallParam } from "@/lib/catalog";
import { ListingPage } from "@/components/listing-page";

export const Route = createFileRoute("/th/$th")({
  loader: async ({ params }) => {
    const th = parseTownHallParam(params.th);
    if (!th) throw notFound();
    const data = await listBasesFn({ data: { townHall: th, sort: "latest" } });
    return { th, ...data };
  },
  component: TownHallPage,
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const seo = listingSeo({ townHall: loaderData.th });
    return { meta: [{ title: seo.title }, { name: "description", content: seo.description }] };
  },
});

function TownHallPage() {
  const data = Route.useLoaderData();
  return (
    <ListingPage
      heading={`مپ‌های تالار ${faNum(data.th)}`}
      intro={`همه بیس‌های Town Hall ${data.th}؛ جنگ، فارم، کاپ، لجند و ضد ستاره.`}
      items={data.items}
      total={data.total}
      sort="latest"
      townHall={data.th}
    />
  );
}
