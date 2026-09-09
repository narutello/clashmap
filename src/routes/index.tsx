import type { ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Swords, Trophy, Wheat } from "lucide-react";
import { homeFn } from "@/lib/api";
import {
  APP_NAME,
  APP_TAGLINE,
  BASE_TYPE_FA,
  TOWN_HALLS,
  faNum,
  formatFaCompact,
  type BaseType,
} from "@/lib/catalog";
import { BaseCard } from "@/components/base-card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  loader: () => homeFn(),
  pendingComponent: HomePending,
  component: Home,
  head: () => ({
    meta: [
      { title: `${APP_NAME} | ${APP_TAGLINE}` },
      {
        name: "description",
        content:
          "کلش‌مپ؛ پلتفرم فارسی کشف مپ کلش آو کلنز. فیلتر بر اساس تالار شهر و نوع بیس، مشاهده تصویر و کپی مستقیم لینک بازی.",
      },
    ],
  }),
});

function HomePending() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="h-40 animate-pulse rounded-2xl bg-card" />
    </main>
  );
}

function Section({
  title,
  to,
  children,
}: {
  title: string;
  to: "/latest" | "/popular" | "/trending";
  children: ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <h2 className="text-lg font-semibold md:text-xl">{title}</h2>
        <Link to={to} className="inline-flex items-center gap-1 text-sm text-primary">
          مشاهده همه
          <ArrowLeft className="size-4" />
        </Link>
      </div>
      {children}
    </section>
  );
}

function Home() {
  const data = Route.useLoaderData();
  const featuredTypes: Array<{ type: BaseType; icon: typeof Swords }> = [
    { type: "war", icon: Swords },
    { type: "trophy", icon: Trophy },
    { type: "farming", icon: Wheat },
    { type: "hybrid", icon: Swords },
    { type: "legend", icon: Trophy },
    { type: "anti3", icon: Swords },
  ];

  return (
    <main className="mx-auto w-full max-w-6xl space-y-12 px-4 py-6 md:py-10">
      <section className="overflow-hidden rounded-2xl bg-card p-5 md:p-8" style={{ boxShadow: "var(--shadow-border)" }}>
        <div className="village-grid -mx-5 -mt-5 mb-5 h-24 md:-mx-8 md:-mt-8 md:h-32" />
        <p className="text-sm font-medium text-primary">پلتفرم فارسی مپ کلش آو کلنز</p>
        <h1 className="mt-1 max-w-xl text-3xl font-semibold tracking-tight md:text-4xl">
          مپ مناسب تالارت را پیدا کن و با یک لمس کپی کن
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
          روزانه بیس‌های جدید جنگ، فارم، کاپ و لجند از منابع مجاز جمع می‌شوند. تالار را انتخاب کنید، نوع مپ را فیلتر کنید و لینک رسمی بازی را کپی کنید.
        </p>
        <div className="mt-5 flex flex-wrap gap-4 text-sm">
          <div>
            <div className="tabular-nums text-xl font-semibold">{formatFaCompact(data.counts.total)}</div>
            <div className="text-muted-foreground">مپ در کاتالوگ</div>
          </div>
          <div>
            <div className="tabular-nums text-xl font-semibold">{faNum(data.counts.today)}</div>
            <div className="text-muted-foreground">مپ تالار ۱۸</div>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">انتخاب سریع تالار شهر</h2>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
          {TOWN_HALLS.map((th) => {
            const count = data.thCounts.find((c) => c.townHall === th)?.n ?? 0;
            return (
              <Link
                key={th}
                to="/th/$th"
                params={{ th: String(th) }}
                className="flex min-h-16 flex-col items-center justify-center rounded-xl bg-card px-2 py-3 text-center transition-transform duration-150 active:scale-[0.96]"
                style={{ boxShadow: "var(--shadow-border)" }}
              >
                <span className="text-base font-semibold">TH{faNum(th)}</span>
                <span className="text-[11px] tabular-nums text-muted-foreground">{faNum(count)}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">نوع مپ</h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {featuredTypes.map(({ type, icon: Icon }) => {
            const count = data.typeCounts.find((c) => c.type === type)?.n ?? 0;
            return (
              <Link
                key={type}
                to="/type/$type"
                params={{ type }}
                className="flex min-h-16 items-center gap-3 rounded-xl bg-card px-4 py-3 transition-transform duration-150 active:scale-[0.96]"
                style={{ boxShadow: "var(--shadow-border)" }}
              >
                <span className="grid size-9 place-items-center rounded-lg bg-surface text-primary">
                  <Icon className="size-4" />
                </span>
                <span>
                  <span className="block text-sm font-medium">{BASE_TYPE_FA[type]}</span>
                  <span className="block text-xs tabular-nums text-muted-foreground">{faNum(count)} مپ</span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <Section title="مپ‌های امروز" to="/latest">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {data.today.map((base) => (
            <BaseCard key={base.id} base={base} />
          ))}
        </div>
      </Section>

      <Section title="محبوب‌ترین‌ها" to="/popular">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {data.popular.map((base) => (
            <BaseCard key={base.id} base={base} />
          ))}
        </div>
      </Section>

      <Section title="ترند" to="/trending">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {data.trending.map((base) => (
            <BaseCard key={base.id} base={base} />
          ))}
        </div>
      </Section>

      <section className="rounded-2xl bg-card p-5 md:p-6" style={{ boxShadow: "var(--shadow-border)" }}>
        <h2 className="text-lg font-semibold">چطور مپ را کپی کنیم؟</h2>
        <ol className="mt-3 list-decimal space-y-2 pr-5 text-sm leading-relaxed text-muted-foreground">
          <li>دکمه «کپی بیس» را بزنید تا لینک رسمی بازی کپی شود.</li>
          <li>کلش آو کلنز را روی گوشی باز کنید.</li>
          <li>بازی لینک را می‌خواند و از شما می‌خواهد مپ را در یک اسلات خالی ذخیره کنید.</li>
        </ol>
        <Button asChild variant="secondary" className="mt-4">
          <Link to="/how-to">راهنمای کامل</Link>
        </Button>
      </section>
    </main>
  );
}
