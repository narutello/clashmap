import { createFileRoute, notFound } from "@tanstack/react-router";
import { listBasesFn } from "@/lib/api";
import { BASE_TYPE_FA, faNum, isBaseType, listingSeo, parseTownHallParam } from "@/lib/catalog";
import { ListingPage } from "@/components/listing-page";

export const Route = createFileRoute("/th/$th/$type")({
  loader: async ({ params }) => {
    const th = parseTownHallParam(params.th);
    if (!th || !isBaseType(params.type)) throw notFound();
    const data = await listBasesFn({
      data: { townHall: th, baseType: params.type, sort: "latest" },
    });
    return { th, type: params.type, ...data };
  },
  component: CombinedPage,
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const seo = listingSeo({ townHall: loaderData.th, baseType: loaderData.type });
    return { meta: [{ title: seo.title }, { name: "description", content: seo.description }] };
  },
});

function CombinedPage() {
  const data = Route.useLoaderData();
  return (
    <ListingPage
      heading={`${BASE_TYPE_FA[data.type]} تالار ${faNum(data.th)}`}
      intro={`مپ‌های ${BASE_TYPE_FA[data.type]} مخصوص Town Hall ${data.th} با لینک کپی مستقیم.`}
      items={data.items}
      total={data.total}
      sort="latest"
      townHall={data.th}
      baseType={data.type}
    />
  );
}
