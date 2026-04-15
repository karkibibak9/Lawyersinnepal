-- 1. Appointments Table
create table appointments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  email text not null,
  service text,
  preferred_date date,
  message text,
  status text default 'pending',
  created_at timestamptz default now()
);

-- 2. Contact Messages Table
create table messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  created_at timestamptz default now()
);

-- 3. WhatsApp Leads Table
create table whatsapp_leads (
  id uuid primary key default gen_random_uuid(),
  page text,
  clicked_at timestamptz default now()
);

-- 4. Enable RLS (Optional - depending on your Supabase security settings)
-- For public read/write if using anon key without complex policies:
alter table appointments enable row level security;
alter table messages enable row level security;
alter table whatsapp_leads enable row level security;

-- Simple public insert policies (CAUTION: Adjust based on production needs)
create policy "Allow public insert to appointments" on appointments for insert with check (true);
create policy "Allow public insert to messages" on messages for insert with check (true);
create policy "Allow public insert to whatsapp_leads" on whatsapp_leads for insert with check (true);
