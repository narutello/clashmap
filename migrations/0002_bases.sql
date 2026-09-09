-- Clash of Clans base catalogue. Rows are unowned (no user_id): shared world data.
-- Future features (users, favorites, ratings) can join on bases.id without a rewrite.

create table if not exists bases (
  id                   text primary key,
  source               text not null,
  source_id            text not null,
  layout_key           text not null,
  copy_url             text not null,
  title                text not null,
  title_fa             text not null,
  town_hall            integer not null,
  town_hall_override   integer,
  base_type            text not null,
  base_type_override   text,
  tags                 jsonb not null default '[]'::jsonb,
  image_url            text,
  builder              text,
  description          text,
  description_fa       text,
  discovered_at        timestamptz not null default now(),
  source_published_at  timestamptz,
  copy_count           integer not null default 0,
  view_count           integer not null default 0,
  last_copied_at       timestamptz,
  metadata             jsonb not null default '{}'::jsonb,
  unique (layout_key),
  unique (source, source_id)
);

create index if not exists bases_th_type_idx
  on bases (coalesce(town_hall_override, town_hall), coalesce(base_type_override, base_type));
create index if not exists bases_discovered_idx on bases (discovered_at desc);
create index if not exists bases_copies_idx on bases (copy_count desc);
create index if not exists bases_last_copied_idx on bases (last_copied_at desc nulls last);
create index if not exists bases_title_idx on bases (title);

create table if not exists copy_events (
  id         serial primary key,
  base_id    text not null references bases(id) on delete cascade,
  copied_at  timestamptz not null default now()
);
create index if not exists copy_events_base_time_idx on copy_events (base_id, copied_at desc);
create index if not exists copy_events_time_idx on copy_events (copied_at desc);

create table if not exists ingest_logs (
  id              serial primary key,
  source          text not null,
  started_at      timestamptz not null default now(),
  finished_at     timestamptz,
  status          text not null,
  inserted_count  integer not null default 0,
  skipped_count   integer not null default 0,
  error_message   text,
  details         jsonb not null default '{}'::jsonb
);
create index if not exists ingest_logs_started_idx on ingest_logs (started_at desc);

create table if not exists ingest_state (
  source            text primary key,
  last_success_at   timestamptz,
  last_error_at     timestamptz,
  last_etag         text,
  last_error        text,
  total_inserted    integer not null default 0
);

create table if not exists base_reports (
  id          serial primary key,
  base_id     text not null references bases(id) on delete cascade,
  reason      text not null,
  created_at  timestamptz not null default now()
);

create table if not exists category_corrections (
  id          serial primary key,
  base_id     text not null references bases(id) on delete cascade,
  field       text not null,
  old_value   text,
  new_value   text not null,
  created_at  timestamptz not null default now()
);
