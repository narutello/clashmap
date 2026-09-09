import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ExternalLink, Flag } from "lucide-react";
import { toast } from "sonner";
import { getBaseFn, reportBaseFn } from "@/lib/api";
import {
  APP_NAME,
  BASE_TYPE_FA,
  faNum,
  formatFaCompact,
  formatFaDate,
  pageTitle,
} from "@/lib/catalog";
import { BaseImage } from "@/components/base-image";
import { BaseCard } from "@/components/base-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CopyBaseButton } from "@/components/copy-base-button";

export const Route = createFileRoute("/base/$id")({
  loader: async ({ params }) => {
    const data = await getBaseFn({ data: { id: params.id } });
    if (!data.base) throw notFound();
    return data;
  },
  component: BaseDetailPage,
  head: ({ loaderData }) => {
    const base = loaderData?.base;
    if (!base) return {};
    return {
      meta: [
        { title: pageTitle([base.titleFa]) },
        {
          name: "description",
          content: `${base.titleFa}. مپ ${BASE_TYPE_FA[base.baseType]} برای تالار ${faNum(base.townHall)} با لینک کپی مستقیم کلش آو کلنز.`,
        },
      ],
    };
  },
});

function BaseDetailPage() {
  const { base, related } = Route.useLoaderData();
  if (!base) return null;

  async function report(reason: "broken" | "wrong-th" | "wrong-type") {
    try {
      await reportBaseFn({ data: { id: base.id, reason } });
      toast.success("گزارش ثبت شد. از بازخورد شما ممنونیم.");
    } catch {
      toast.error("ارسال گزارش ناموفق بود.");
    }
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-6 md:py-10">
      <nav className="mb-4 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">خانه</Link>
        <span className="mx-1">/</span>
        <Link to="/th/$th" params={{ th: String(base.townHall) }} className="hover:text-foreground">
          تالار {faNum(base.townHall)}
        </Link>
        <span className="mx-1">/</span>
        <Link
          to="/th/$th/$type"
          params={{ th: String(base.townHall), type: base.baseType }}
          className="hover:text-foreground"
        >
          {BASE_TYPE_FA[base.baseType]}
        </Link>
      </nav>

      <article className="overflow-hidden rounded-2xl bg-card p-2 md:p-3" style={{ boxShadow: "var(--shadow-border)" }}>
        <BaseImage
          src={base.imageUrl}
          alt={base.titleFa}
          townHall={base.townHall}
          baseType={base.baseType}
          className="rounded-xl"
          priority
        />
        <div className="space-y-4 p-4 md:p-5">
          <div className="flex flex-wrap gap-2">
            <Badge variant="brass">تالار {faNum(base.townHall)}</Badge>
            <Badge variant="moss">{BASE_TYPE_FA[base.baseType]}</Badge>
            {base.trending ? <Badge>ترند</Badge> : null}
          </div>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">{base.titleFa}</h1>
          <p className="text-sm text-muted-foreground">{base.title}</p>
          {base.description ? (
            <p className="text-sm leading-relaxed text-foreground/90">{base.description}</p>
          ) : null}

          <dl className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
            <div className="rounded-xl bg-surface p-3">
              <dt className="text-xs text-muted-foreground">تعداد کپی</dt>
              <dd className="mt-1 tabular-nums font-medium">{formatFaCompact(base.copyCount)}</dd>
            </div>
            <div className="rounded-xl bg-surface p-3">
              <dt className="text-xs text-muted-foreground">تاریخ افزودن</dt>
              <dd className="mt-1">{formatFaDate(base.discoveredAt)}</dd>
            </div>
            <div className="rounded-xl bg-surface p-3">
              <dt className="text-xs text-muted-foreground">بازدید</dt>
              <dd className="mt-1 tabular-nums">{faNum(base.viewCount + 1)}</dd>
            </div>
            <div className="rounded-xl bg-surface p-3">
              <dt className="text-xs text-muted-foreground">سازنده / منبع</dt>
              <dd className="mt-1 line-clamp-2">{base.builder ?? APP_NAME}</dd>
            </div>
          </dl>

          <div className="flex flex-col gap-2 sm:flex-row">
            <CopyBaseButton id={base.id} copyUrl={base.copyUrl} size="lg" className="flex-1" />
            <Button asChild variant="secondary" size="lg" className="flex-1">
              <a href={base.copyUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink />
                باز کردن در بازی
              </a>
            </Button>
          </div>

          <p className="text-xs leading-relaxed text-muted-foreground">
            لینک کپی، لینک رسمی سوپرسل است. بعد از کپی، کلش آو کلنز را باز کنید و مپ را در یک اسلات خالی ذخیره کنید. تالار شما باید با تالار این بیس یکی باشد.
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-muted-foreground">
            <Flag className="size-3.5" />
            گزارش:
            <button type="button" className="hover:text-foreground" onClick={() => void report("broken")}>
              لینک خراب
            </button>
            <span>·</span>
            <button type="button" className="hover:text-foreground" onClick={() => void report("wrong-th")}>
              تالار اشتباه
            </button>
            <span>·</span>
            <button type="button" className="hover:text-foreground" onClick={() => void report("wrong-type")}>
              نوع اشتباه
            </button>
          </div>
        </div>
      </article>

      {related.length ? (
        <section className="mt-10 space-y-4">
          <h2 className="text-lg font-semibold">مپ‌های مشابه</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {related.map((item) => (
              <BaseCard key={item.id} base={item} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
