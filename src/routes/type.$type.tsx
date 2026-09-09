import { createFileRoute, notFound } from "@tanstack/react-router";
import { listBasesFn } from "@/lib/api";
import { BASE_TYPE_FA, isBaseType, listingSeo } from "@/lib/catalog";
import { ListingPage } from "@/components/listing-page";

export const Route = createFileRoute("/type/$type")({
  loader: async ({ params }) => {
    if (!isBaseType(params.type)) throw notFound();
    const data = await listBasesFn({ data: { baseType: params.type, sort: "latest" } });
    return { type: params.type, ...data };
  },
  component: TypePage,
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const seo = listingSeo({ baseType: loaderData.type });
    return { meta: [{ title: seo.title }, { name: "description", content: seo.description }] };
  },
});

function TypePage() {
  const data = Route.useLoaderData();
  return (
    <ListingPage
      heading={BASE_TYPE_FA[data.type]}
      intro={`همه ${BASE_TYPE_FA[data.type]}‌ها در تمام تالارهای شهر. تالار را از فیلتر بالا انتخاب کنید.`}
      items={data.items}
      total={data.total}
      sort="latest"
      baseType={data.type}
    />
  );
}
