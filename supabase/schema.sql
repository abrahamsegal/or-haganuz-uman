create extension if not exists pgcrypto;

create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  guest_name text not null,
  guest_phone text,
  guest_email text,
  checkin date not null,
  checkout date not null,
  guests integer not null default 1,
  room_type text not null default 'Por definir',
  source text not null default 'Web',
  status text not null default 'Pendiente',
  currency text not null default 'USD',
  total_amount numeric(12,2),
  deposit_amount numeric(12,2),
  payment_status text not null default 'Sin pago',
  notes text,
  terms_accepted boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.reservations add column if not exists currency text not null default 'USD';
alter table public.reservations add column if not exists total_amount numeric(12,2);
alter table public.reservations add column if not exists deposit_amount numeric(12,2);
alter table public.reservations add column if not exists payment_status text not null default 'Sin pago';

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists reservations_updated_at on public.reservations;
create trigger reservations_updated_at
before update on public.reservations
for each row execute function public.set_updated_at();

alter table public.reservations enable row level security;

drop policy if exists "No public direct access" on public.reservations;
create policy "No public direct access"
on public.reservations
for all
using (false)
with check (false);

create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  username text not null unique,
  name text not null,
  role text not null default 'limited' check (role in ('full', 'limited')),
  active boolean not null default true,
  password_hash text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists admin_users_updated_at on public.admin_users;
create trigger admin_users_updated_at
before update on public.admin_users
for each row execute function public.set_updated_at();

alter table public.admin_users enable row level security;

drop policy if exists "No public direct access" on public.admin_users;
create policy "No public direct access"
on public.admin_users
for all
using (false)
with check (false);

create table if not exists public.hotel_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

drop trigger if exists hotel_settings_updated_at on public.hotel_settings;
create trigger hotel_settings_updated_at
before update on public.hotel_settings
for each row execute function public.set_updated_at();

alter table public.hotel_settings enable row level security;

drop policy if exists "No public direct access" on public.hotel_settings;
create policy "No public direct access"
on public.hotel_settings
for all
using (false)
with check (false);
