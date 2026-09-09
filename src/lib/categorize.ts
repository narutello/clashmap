import { BASE_TYPES, type BaseType } from "./catalog";

const TYPE_ALIASES: Record<string, BaseType> = {
  war: "war",
  wb: "war",
  cwl: "war",
  "war base": "war",
  trophy: "trophy",
  cup: "trophy",
  "trophy base": "trophy",
  farm: "farming",
  farming: "farming",
  "farming base": "farming",
  hv: "farming",
  progress: "farming",
  "progress-base": "farming",
  hybrid: "hybrid",
  "home village": "hybrid",
  legend: "legend",
  "legend league": "legend",
  legends: "legend",
  anti2: "anti2",
  "anti-2": "anti2",
  "anti-2-star": "anti2",
  "anti 2 star": "anti2",
  anti3: "anti3",
  "anti-3": "anti3",
  "anti-3-star": "anti3",
  "anti 3 star": "anti3",
  fun: "other",
  other: "other",
  troll: "other",
};

export type CategorizeInput = {
  sourceType?: string | null;
  tags?: string[];
  name?: string | null;
  description?: string | null;
  slot?: string | null;
  townHall?: number | null;
};

export type CategorizeResult = {
  townHall: number | null;
  baseType: BaseType;
  tags: string[];
  confidence: "high" | "medium" | "low";
};

function norm(s: string): string {
  return s.trim().toLowerCase().replace(/[_/]+/g, " ").replace(/\s+/g, " ");
}

function aliasType(value: string | null | undefined): BaseType | null {
  if (!value) return null;
  const key = norm(value);
  return TYPE_ALIASES[key] ?? null;
}

export function categorizeBase(input: CategorizeInput): CategorizeResult {
  const rawTags = (input.tags ?? []).map((t) => norm(t)).filter(Boolean);
  const blob = [input.name, input.description, input.sourceType, rawTags.join(" ")]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const extra: string[] = [];
  if (/\blegend/.test(blob)) extra.push("legend");
  if (/anti[-\s]?2/.test(blob)) extra.push("anti2");
  if (/anti[-\s]?3/.test(blob) || (/\banti\b/.test(blob) && /\bstars?\b/.test(blob))) {
    extra.push("anti3");
  }
  if (/\bcwl\b/.test(blob)) extra.push("war");
  if (/\bhybrid\b/.test(blob)) extra.push("hybrid");
  if (/\bfarm/.test(blob)) extra.push("farming");
  if (/\btroph/.test(blob)) extra.push("trophy");
  if (/\bwar\b/.test(blob) || input.slot === "WB") extra.push("war");

  let baseType: BaseType | null = aliasType(input.sourceType);
  if (!baseType && input.slot === "WB") baseType = "war";

  for (const tag of rawTags) {
    const mapped = aliasType(tag);
    if (mapped && mapped !== "other") {
      extra.push(mapped);
      if (!baseType) baseType = mapped;
    }
  }

  const specific: BaseType[] = ["anti3", "anti2", "legend"];
  for (const t of specific) {
    if (extra.includes(t)) {
      baseType = t;
      break;
    }
  }

  if (!baseType) {
    if (extra.includes("war")) baseType = "war";
    else if (extra.includes("hybrid")) baseType = "hybrid";
    else if (extra.includes("trophy")) baseType = "trophy";
    else if (extra.includes("farming")) baseType = "farming";
    else if (input.slot === "HV") baseType = "farming";
    else baseType = "other";
  }

  const thFromBlob = blob.match(/\bth\s*([0-9]{1,2})\b/)?.[1];
  const townHall =
    typeof input.townHall === "number" && input.townHall >= 3 && input.townHall <= 18
      ? input.townHall
      : thFromBlob
        ? Number.parseInt(thFromBlob, 10)
        : null;

  const tags = [...new Set([...rawTags, ...extra])].filter((t) => t.length < 40);

  const confidence: CategorizeResult["confidence"] =
    aliasType(input.sourceType) && townHall ? "high" : townHall ? "medium" : "low";

  return { townHall, baseType, tags, confidence };
}

export function effectiveType(
  stored: string,
  override: string | null | undefined,
): BaseType {
  if (override && (BASE_TYPES as readonly string[]).includes(override)) {
    return override as BaseType;
  }
  if ((BASE_TYPES as readonly string[]).includes(stored)) return stored as BaseType;
  return "other";
}

export function persianTitle(townHall: number, type: BaseType, name: string): string {
  const clean = name.replace(/\s*\(TH\s*\d+\)\s*/i, "").trim();
  const short = clean.length > 42 ? `${clean.slice(0, 40)}…` : clean;
  return `مپ ${typeLabelShort(type)} تالار ${toFa(townHall)}${short ? ` — ${short}` : ""}`;
}

function typeLabelShort(type: BaseType): string {
  switch (type) {
    case "war":
      return "جنگ";
    case "trophy":
      return "کاپ";
    case "farming":
      return "فارم";
    case "hybrid":
      return "ترکیبی";
    case "legend":
      return "لجند";
    case "anti2":
      return "ضد ۲ ستاره";
    case "anti3":
      return "ضد ۳ ستاره";
    default:
      return "بیس";
  }
}

function toFa(n: number): string {
  return String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)] ?? d);
}
