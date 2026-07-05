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
  notes text,
  terms_accepted boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

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
