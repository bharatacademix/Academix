-- Run this in Supabase Dashboard → SQL Editor

create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  who text not null,
  stars integer not null check (stars between 1 and 5),
  text text not null,
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

-- Allow anyone to submit a testimonial
create policy "Anyone can submit" on testimonials
  for insert with check (true);

-- Only show approved testimonials to the public
create policy "Public can view approved" on testimonials
  for select using (approved = true);

-- Enable Row Level Security
alter table testimonials enable row level security;
