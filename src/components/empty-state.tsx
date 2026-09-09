import { SearchX } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function EmptyState({
  title = "مپی با این فیلتر پیدا نشد",
  description = "تالار یا نوع مپ را عوض کنید، یا جستجو را پاک کنید.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-card px-6 py-16 text-center" style={{ boxShadow: "var(--shadow-border)" }}>
      <SearchX className="size-8 text-muted-foreground" />
      <h2 className="text-base font-semibold">{title}</h2>
      <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      <Button asChild variant="secondary">
        <Link to="/">بازگشت به خانه</Link>
      </Button>
    </div>
  );
}
