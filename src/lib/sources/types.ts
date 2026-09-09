export type NormalizedBase = {
  source: string;
  sourceId: string;
  name: string;
  townHall: number | null;
  sourceType: string | null;
  copyUrl: string;
  imageUrl: string | null;
  builder: string | null;
  description: string | null;
  tags: string[];
  publishedAt: string | null;
};

export type SourceFetchResult = {
  source: string;
  items: NormalizedBase[];
  etag?: string | null;
  skippedUnchanged?: boolean;
  warning?: string | null;
};

export type CatalogSource = {
  id: string;
  label: string;
  fetch: (opts: { etag?: string | null }) => Promise<SourceFetchResult>;
};
