import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { copyBaseFn } from "@/lib/api";
import { cn } from "@/lib/utils";

export function CopyBaseButton({
  id,
  copyUrl,
  className,
  size = "default",
}: {
  id: string;
  copyUrl: string;
  className?: string;
  size?: "default" | "sm" | "lg";
}) {
  const [busy, setBusy] = useState(false);

  async function onOpen(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (busy) return;
    setBusy(true);
    try {
      window.open(copyUrl, "_blank", "noopener,noreferrer");
      toast.success("لینک بیس باز شد. در بازی مپ بارگذاری می‌شود.");
      void copyBaseFn({ data: { id } }).catch(() => undefined);
    } catch {
      toast.error("باز کردن لینک انجام نشد.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button
      type="button"
      size={size}
      onClick={onOpen}
      className={cn("min-w-28", className)}
      disabled={busy}
    >
      <ExternalLink />
      باز کردن بیس
    </Button>
  );
}
