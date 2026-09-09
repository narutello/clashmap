import { Link } from "@tanstack/react-router";
import { APP_NAME, TOWN_HALLS } from "@/lib/catalog";

export function SiteFooter({ lastSync }: { lastSync?: string | null }) {
  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div className="space-y-2">
          <p className="font-semibold">{APP_NAME}</p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            پلتفرم فارسی کشف و کپی مپ‌های کلش آو کلنز. بیس‌ها به‌صورت روزانه از منابع مجاز جمع‌آوری می‌شوند.
          </p>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium">تالار شهر</p>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground">
            {TOWN_HALLS.slice(0, 8).map((th) => (
              <Link key={th} to="/th/$th" params={{ th: String(th) }} className="hover:text-foreground">
                TH{th}
              </Link>
            ))}
          </div>
        </div>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            <Link to="/how-to" className="hover:text-foreground">
              راهنمای کپی بیس
            </Link>
          </p>
          <p>
            <Link to="/latest" className="hover:text-foreground">
              جدیدترین مپ‌ها
            </Link>
          </p>
          {lastSync ? <p>آخرین به‌روزرسانی: {new Date(lastSync).toLocaleString("fa-IR")}</p> : null}
        </div>
      </div>
      <p className="mx-auto max-w-6xl px-4 pb-8 text-xs leading-relaxed text-muted-foreground">
        این محتوا وابسته به، تأییدشده، حمایت‌شده یا به‌طور خاص تصویب‌شده توسط سوپرسل نیست و سوپرسل مسئولیتی در قبال آن ندارد. برای اطلاعات بیشتر سیاست محتوای طرفداران سوپرسل را ببینید. Clash of Clans علامت تجاری سوپرسل است.
      </p>
    </footer>
  );
}
