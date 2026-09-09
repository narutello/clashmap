import { createFileRoute } from "@tanstack/react-router";
import { APP_NAME, pageTitle } from "@/lib/catalog";

export const Route = createFileRoute("/how-to")({
  component: HowToPage,
  head: () => ({
    meta: [
      { title: pageTitle(["راهنمای کپی بیس"]) },
      {
        name: "description",
        content: "چطور لینک مپ کلش آو کلنز را کپی کنیم و در بازی بارگذاری کنیم.",
      },
    ],
  }),
});

function HowToPage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">چطور مپ را در بازی کپی کنیم؟</h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          {APP_NAME} فقط لینک رسمی سوپرسل را نمایش می‌دهد. این لینک‌ها با دکمه «Copy Layout» داخل خود بازی ساخته می‌شوند و کپی کردنشان خلاف قوانین نیست.
        </p>
        <ol className="list-decimal space-y-3 pr-5 text-foreground">
          <li>مپ موردنظر را باز کنید و دکمه «کپی بیس» را بزنید.</li>
          <li>لینک روی کلیپ‌بورد ذخیره می‌شود.</li>
          <li>اگر کلش آو کلنز باز است، آن را کامل ببندید و دوباره باز کنید؛ بازی لینک را هنگام اجرا می‌خواند.</li>
          <li>پیام بارگذاری مپ را تأیید کنید و یک اسلات خالی انتخاب کنید.</li>
          <li>تالار شما باید با تالار مپ یکی باشد؛ در غیر این صورت بازی لینک را رد می‌کند.</li>
        </ol>
        <p>
          اگر لینک کار نکرد، از دکمه «گزارش لینک خراب» در صفحه مپ استفاده کنید تا از کاتالوگ خارج شود.
        </p>
      </div>
    </main>
  );
}
