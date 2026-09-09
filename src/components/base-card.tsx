import { Link } from "@tanstack/react-router";
import { BASE_TYPE_FA, faNum, formatFaCompact, formatFaDate, type BaseCard as BaseCardType } from "@/lib/catalog";
import { BaseImage } from "@/components/base-image";
import { Badge } from "@/components/ui/badge";
import { CopyBaseButton } from "@/components/copy-base-button";

export function BaseCard({ base, priority = false }: { base: BaseCardType; priority?: boolean }) {
  return (
    <article
      className="group flex flex-col overflow-hidden rounded-2xl bg-card p-2 transition-[box-shadow,transform] duration-150 ease-out hover:-translate-y-0.5"
      style={{ boxShadow: "var(--shadow-border)" }}
    >
      <Link to="/base/$id" params={{ id: base.id }} className="block">
        <BaseImage
          src={base.imageUrl}
          alt={base.titleFa}
          townHall={base.townHall}
          baseType={base.baseType}
          className="rounded-xl"
          priority={priority}
        />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge variant="brass">TH{faNum(base.townHall)}</Badge>
          <Badge variant="moss">{BASE_TYPE_FA[base.baseType]}</Badge>
          {base.trending ? <Badge>ترند</Badge> : null}
        </div>
        <Link to="/base/$id" params={{ id: base.id }} className="block">
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">
            {base.titleFa}
          </h3>
          <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{base.title}</p>
        </Link>
        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          <div className="min-w-0 text-xs text-muted-foreground">
            <div className="tabular-nums">{formatFaCompact(base.copyCount)} کپی</div>
            <div>{formatFaDate(base.discoveredAt)}</div>
          </div>
          <CopyBaseButton id={base.id} copyUrl={base.copyUrl} size="sm" />
        </div>
      </div>
    </article>
  );
}
