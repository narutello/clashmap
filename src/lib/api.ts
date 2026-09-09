import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { PAGE_SIZE, isBaseType, type BaseType, type SortKey } from "@/lib/catalog";

const listInput = z.object({
  townHall: z.number().int().min(4).max(18).nullable().optional(),
  baseType: z.string().nullable().optional(),
  sort: z.enum(["latest", "popular", "trending"]).optional(),
  q: z.string().max(80).nullable().optional(),
  offset: z.number().int().min(0).max(20_000).optional(),
  limit: z.number().int().min(1).max(48).optional(),
});

export const listBasesFn = createServerFn({ method: "GET" })
  .validator(listInput)
  .handler(async ({ data }) => {
    const { listBases } = await import("@/lib/bases.server");
    const baseType = data.baseType && isBaseType(data.baseType) ? data.baseType : null;
    return listBases({
      townHall: data.townHall ?? null,
      baseType,
      sort: (data.sort ?? "latest") as SortKey,
      q: data.q ?? null,
      offset: data.offset ?? 0,
      limit: data.limit ?? PAGE_SIZE,
    });
  });

export const getBaseFn = createServerFn({ method: "GET" })
  .validator(z.object({ id: z.string().min(1).max(96) }))
  .handler(async ({ data }) => {
    const { getBase, relatedBases } = await import("@/lib/bases.server");
    const base = await getBase(data.id);
    if (!base) return { base: null, related: [] };
    const related = await relatedBases(base);
    return { base, related };
  });

export const homeFn = createServerFn({ method: "GET" }).handler(async () => {
  const { homeSections, countsByTownHall, countsByType } = await import("@/lib/bases.server");
  const [home, thCounts, typeCounts] = await Promise.all([
    homeSections(),
    countsByTownHall(),
    countsByType(),
  ]);
  return { ...home, thCounts, typeCounts };
});

export const copyBaseFn = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string().min(1).max(96) }))
  .handler(async ({ data }) => {
    const { recordCopy } = await import("@/lib/bases.server");
    const result = await recordCopy(data.id);
    if (!result) throw new Error("بیس پیدا نشد");
    return result;
  });

export const reportBaseFn = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.string().min(1).max(96),
      reason: z.enum(["broken", "wrong-th", "wrong-type", "other"]),
    }),
  )
  .handler(async ({ data }) => {
    const { reportBase } = await import("@/lib/bases.server");
    const ok = await reportBase(data.id, data.reason);
    if (!ok) throw new Error("بیس پیدا نشد");
    return { ok: true };
  });

export const syncNowFn = createServerFn({ method: "POST" }).handler(async () => {
  const { runIngest } = await import("@/lib/ingest.server");
  return runIngest();
});

export type { BaseType };
