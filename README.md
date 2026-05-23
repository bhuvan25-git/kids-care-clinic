# Kids Care Clinic — React + Supabase

A full-stack paediatric clinic landing page with appointment booking and admin dashboard.

## Tech Stack
- **React 18** + **Vite**
- **Tailwind CSS**
- **Supabase** (Postgres + Auth)
- **React Router v6**

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Configure Supabase
Copy the env template and fill in your keys:
```bash
cp .env.example .env
```
Edit `.env`:
```
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_PUBLIC_KEY
```
Get these from **Supabase → Project Settings → API**.

### 3. Create database tables
Run this in **Supabase → SQL Editor**:
```sql
create table bookings (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  phone text not null,
  child_age text,
  date date not null,
  time text not null,
  reason text,
  status text default 'pending',
  created_at timestamp default now()
);

create table inquiries (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  phone text not null,
  message text not null,
  created_at timestamp default now()
);

-- Row Level Security
alter table bookings enable row level security;
alter table inquiries enable row level security;

create policy "Public can insert bookings" on bookings for insert with check (true);
create policy "Public can insert inquiries" on inquiries for insert with check (true);
create policy "Admin can read bookings" on bookings for select using (auth.role() = 'authenticated');
create policy "Admin can update bookings" on bookings for update using (auth.role() = 'authenticated');
create policy "Admin can read inquiries" on inquiries for select using (auth.role() = 'authenticated');
```

### 4. Create admin user
Go to **Supabase → Authentication → Users → Add User** and create an email/password account.

### 5. Run locally
```bash
npm run dev
```
- Landing page: http://localhost:5173
- Admin dashboard: http://localhost:5173/admin

## Deploy to Vercel
```bash
npm install -g vercel
vercel
```
Add your `.env` variables in **Vercel → Project → Settings → Environment Variables**.

## Project Structure
```
src/
├── pages/
│   ├── Home.jsx          ← Landing page
│   └── Admin.jsx         ← Admin dashboard (login protected)
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── Marquee.jsx
│   ├── Services.jsx
│   ├── WhyUs.jsx
│   ├── ContactSection.jsx
│   ├── CTABanner.jsx
│   ├── Footer.jsx
│   └── BookingModal.jsx  ← Booking + inquiry forms with confirmation
└── lib/
    └── supabase.js       ← Supabase client
```
