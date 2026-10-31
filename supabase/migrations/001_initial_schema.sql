-- ============================================================
-- FactDefiner Video Portfolio — Supabase schema
-- Run in Supabase Dashboard → SQL Editor (whole file at once)
-- ============================================================

create extension if not exists "pgcrypto";

-- ---------- TABLES ----------

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  youtube_url text not null,
  youtube_id text not null,
  category text not null default 'youtube' check (category in ('reel','youtube','ad','motion','podcast')),
  orientation text not null default 'horizontal' check (orientation in ('horizontal','vertical')),
  client_name text,
  description text,
  role text,
  tools text[] default '{}',
  views_label text,
  is_featured boolean not null default true,
  sort_order int not null default 0,
  thumbnail_override text,
  created_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  client_role text,
  avatar_url text,
  quote text not null,
  rating int not null default 5 check (rating between 1 and 5),
  is_visible boolean not null default true,
  sort_order int not null default 0
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  icon text,
  starting_price text,
  features text[] default '{}',
  is_visible boolean not null default true,
  sort_order int not null default 0
);

create table if not exists public.before_after (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  before_url text not null,
  after_url text not null,
  sort_order int not null default 0
);

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  editor_name text not null default 'FactDefiner',
  tagline text not null default 'I turn raw footage into stories people can''t skip.',
  channel_name text not null default 'Fact Definer VIKRANT',
  channel_url text not null default 'https://www.youtube.com/@Factdefiner',
  channel_avatar_url text,
  subscriber_count_label text default '150K+',
  total_views_label text default '50M+',
  videos_edited_count text default '500+',
  clients_count text default '80+',
  email text default 'hello@factdefiner.in',
  whatsapp text default '919999999999',
  instagram text default 'https://instagram.com/factdefiner',
  resume_url text
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  service text,
  budget text,
  message text not null,
  reference_link text,
  status text not null default 'new' check (status in ('new','read','replied')),
  created_at timestamptz not null default now()
);

-- ---------- ROW LEVEL SECURITY ----------

alter table public.projects enable row level security;
alter table public.testimonials enable row level security;
alter table public.services enable row level security;
alter table public.before_after enable row level security;
alter table public.site_settings enable row level security;
alter table public.inquiries enable row level security;

-- Public read
create policy "public read projects" on public.projects for select using (is_featured = true);
create policy "public read testimonials" on public.testimonials for select using (is_visible = true);
create policy "public read services" on public.services for select using (is_visible = true);
create policy "public read before_after" on public.before_after for select using (true);
create policy "public read site_settings" on public.site_settings for select using (true);

-- Public insert: inquiries only
create policy "public insert inquiries" on public.inquiries for insert with check (true);

-- Authenticated admin: full access
create policy "admin all projects" on public.projects for all to authenticated using (true) with check (true);
create policy "admin all testimonials" on public.testimonials for all to authenticated using (true) with check (true);
create policy "admin all services" on public.services for all to authenticated using (true) with check (true);
create policy "admin all before_after" on public.before_after for all to authenticated using (true) with check (true);
create policy "admin all site_settings" on public.site_settings for all to authenticated using (true) with check (true);
create policy "admin all inquiries" on public.inquiries for all to authenticated using (true) with check (true);
