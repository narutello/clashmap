import { useState } from "react";
import { BASE_TYPE_FA, faNum, type BaseType } from "@/lib/catalog";
import { cn } from "@/lib/utils";

function Placeholder({ townHall, baseType }: { townHall: number; baseType: BaseType }) {
  const seed = (townHall * 17 + baseType.length * 13) % 8;
  return (
    <div className="village-grid relative flex h-full w-full items-center justify-center overflow-hidden bg-surface">
      <svg viewBox="0 0 160 120" className="absolute inset-0 h-full w-full opacity-80" aria-hidden>
        <rect x="28" y="38" width="104" height="58" rx="4" fill="none" stroke="currentColor" strokeOpacity="0.18" />
        <rect x="48" y="50" width="64" height="34" rx="3" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeOpacity="0.22" />
        <polygon
          points="80,22 96,50 64,50"
          fill="currentColor"
          fillOpacity="0.18"
          stroke="currentColor"
          strokeOpacity="0.35"
        />
        {Array.from({ length: 6 }).map((_, i) => (
          <circle
            key={i}
            cx={36 + ((i * 19 + seed * 7) % 90)}
            cy={46 + ((i * 11 + seed) % 36)}
            r="3"
            fill="currentColor"
            fillOpacity="0.22"
          />
        ))}
      </svg>
      <div className="relative z-10 rounded-full bg-background/80 px-3 py-1 text-xs font-medium text-foreground">
        تالار {faNum(townHall)} · {BASE_TYPE_FA[baseType]}
      </div>
    </div>
  );
}

export function BaseImage({
  src,
  alt,
  townHall,
  baseType,
  className,
  priority = false,
}: {
  src: string | null;
  alt: string;
  townHall: number;
  baseType: BaseType;
  className?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={cn("relative aspect-[16/10] overflow-hidden bg-surface", className)}>
      {!src || failed ? (
        <Placeholder townHall={townHall} baseType={baseType} />
      ) : (
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
