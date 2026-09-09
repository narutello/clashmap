export const APP_NAME = "کلش‌مپ";
export const APP_NAME_EN = "ClashMap";
export const APP_TAGLINE = "کشف و کپی مپ‌های کلش آو کلنز";

export const TOWN_HALLS = [18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4] as const;
export type TownHall = (typeof TOWN_HALLS)[number];

export const BASE_TYPES = [
  "war",
  "trophy",
  "farming",
  "hybrid",
  "legend",
  "anti2",
  "anti3",
  "other",
] as const;
export type BaseType = (typeof BASE_TYPES)[number];

export const BASE_TYPE_FA: Record<BaseType, string> = {
  war: "مپ جنگ",
  trophy: "مپ کاپ",
  farming: "مپ فارم",
  hybrid: "مپ ترکیبی",
  legend: "مپ لجند",
  anti2: "ضد دو ستاره",
  anti3: "ضد سه ستاره",
  other: "سایر",
};

export const BASE_TYPE_EN: Record<BaseType, string> = {
  war: "War",
  trophy: "Trophy",
  farming: "Farming",
  hybrid: "Hybrid",
  legend: "Legend League",
  anti2: "Anti 2 Star",
  anti3: "Anti 3 Star",
  other: "Other",
};

export const SORTS = ["latest", "popular", "trending"] as const;
export type SortKey = (typeof SORTS)[number];

export const SORT_FA: Record<SortKey, string> = {
  latest: "جدیدترین",
  popular: "محبوب‌ترین",
  trending: "ترند",
};

const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

export function faNum(value: number | string): string {
  return String(value).replace(/\d/g, (d) => FA_DIGITS[Number(d)] ?? d);
}

export function isTownHall(value: unknown): value is TownHall {
  return typeof value === "number" && (TOWN_HALLS as readonly number[]).includes(value);
}

export function isBaseType(value: unknown): value is BaseType {
  return typeof value === "string" && (BASE_TYPES as readonly string[]).includes(value);
}

export function parseTownHallParam(raw: string | undefined): TownHall | null {
  if (!raw) return null;
  const n = Number.parseInt(raw, 10);
  return isTownHall(n) ? n : null;
}

export function thLabel(th: number): string {
  return `تالار ${faNum(th)}`;
}

export function formatFaDate(iso: string | Date | null | undefined): string {
  if (!iso) return "";
  const d = typeof iso === "string" ? new Date(iso) : iso;
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(d);
}

export function formatFaCompact(n: number): string {
  if (n >= 1_000_000) return `${faNum((n / 1_000_000).toFixed(1))} میلیون`;
  if (n >= 1000) return `${faNum((n / 1000).toFixed(n >= 10_000 ? 0 : 1))} هزار`;
  return faNum(n);
}

export type BaseCard = {
  id: string;
  title: string;
  titleFa: string;
  townHall: number;
  baseType: BaseType;
  tags: string[];
  imageUrl: string | null;
  copyUrl: string;
  builder: string | null;
  discoveredAt: string;
  copyCount: number;
  trending: boolean;
};

export type BaseDetail = BaseCard & {
  description: string | null;
  descriptionFa: string | null;
  source: string;
  sourcePublishedAt: string | null;
  viewCount: number;
  lastCopiedAt: string | null;
};

export function pageTitle(parts: string[]): string {
  return [...parts, APP_NAME].join(" | ");
}

export function listingSeo(opts: {
  townHall?: number | null;
  baseType?: BaseType | null;
  sort?: SortKey | null;
  query?: string | null;
}): { title: string; description: string } {
  const th = opts.townHall;
  const type = opts.baseType;
  if (th && type) {
    return {
      title: pageTitle([`مپ‌های ${BASE_TYPE_FA[type]} تالار ${faNum(th)}`]),
      description: `بهترین مپ‌های ${BASE_TYPE_FA[type]} کلش آو کلنز برای تالار شهر ${faNum(th)}. فیلتر، مشاهده تصویر و کپی مستقیم بیس.`,
    };
  }
  if (th) {
    return {
      title: pageTitle([`مپ‌های تالار ${faNum(th)} کلش آو کلنز`]),
      description: `جدیدترین و محبوب‌ترین بیس‌های کلش آو کلنز برای Town Hall ${th}. مپ جنگ، فارم، کاپ و لجند با لینک کپی.`,
    };
  }
  if (type) {
    return {
      title: pageTitle([`${BASE_TYPE_FA[type]} کلش آو کلنز`]),
      description: `مجموعه ${BASE_TYPE_FA[type]} برای همه تالارهای شهر. انتخاب تالار، مشاهده تصویر و کپی بیس در یک لمس.`,
    };
  }
  if (opts.sort === "popular") {
    return {
      title: pageTitle(["محبوب‌ترین مپ‌های کلش آو کلنز"]),
      description: "بیس‌هایی که بیشترین تعداد کپی را در کلش‌مپ داشته‌اند.",
    };
  }
  if (opts.sort === "trending") {
    return {
      title: pageTitle(["مپ‌های ترند کلش آو کلنز"]),
      description: "بیس‌های داغ و در حال رشد کلش آو کلنز؛ بر اساس کپی‌های روزهای اخیر.",
    };
  }
  if (opts.query) {
    return {
      title: pageTitle([`جستجو: ${opts.query}`]),
      description: `نتایج جستجو برای «${opts.query}» در مپ‌های کلش آو کلنز.`,
    };
  }
  return {
    title: pageTitle(["جدیدترین مپ‌های کلش آو کلنز"]),
    description: "تازه‌ترین بیس‌های اضافه‌شده به کلش‌مپ را ببینید و مستقیم کپی کنید.",
  };
}

export const PAGE_SIZE = 24;
