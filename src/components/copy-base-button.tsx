import { useState } from "react";
import { Check, Copy } from "lucide-react";
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
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onCopy(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (busy) return;
    setBusy(true);
    try {
      await navigator.clipboard.writeText(copyUrl);
      setCopied(true);
      toast.success("لینک بیس کپی شد. بازی را باز کنید تا مپ بارگذاری شود.");
      void copyBaseFn({ data: { id } }).catch(() => undefined);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("کپی انجام نشد. لینک بازی را مستقیم باز می‌کنیم.");
      window.open(copyUrl, "_blank", "noopener,noreferrer");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button
      type="button"
      size={size}
      onClick={onCopy}
      className={cn("min-w-28", className)}
      disabled={busy}
    >
      {copied ? <Check /> : <Copy />}
      {copied ? "کپی شد" : "کپی بیس"}
    </Button>
  );
}
