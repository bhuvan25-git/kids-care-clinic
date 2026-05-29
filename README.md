<p align="center">
  <h1 align="center">🏥 Kids Care Clinic</h1>
  <p align="center">
    A modern, full-stack paediatric clinic website with online appointment booking and an admin dashboard.
    <br />
    Built with <strong>React 18</strong> · <strong>Vite</strong> · <strong>Tailwind CSS</strong> · <strong>Supabase</strong>
  </p>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Supabase-2.39-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white" />
</p>

---

## ✨ Features

| Feature | Description |
|---|---|
| **Landing Page** | A beautiful, responsive clinic homepage with hero section, services, and contact info |
| **Appointment Booking** | Patients can book appointments through an intuitive modal form |
| **Contact / Inquiry Form** | Visitors can send inquiries directly from the website |
| **Admin Dashboard** | A password-protected dashboard to manage bookings and inquiries |
| **Supabase Backend** | PostgreSQL database with Row Level Security for safe public access |
| **Responsive Design** | Fully responsive across desktop, tablet, and mobile screens |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [React 18](https://react.dev/) |
| **Build Tool** | [Vite 5](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS 3.4](https://tailwindcss.com/) |
| **Routing** | [React Router v6](https://reactrouter.com/) |
| **Backend / Auth** | [Supabase](https://supabase.com/) (Postgres + Auth) |
| **Fonts** | [Nunito](https://fonts.google.com/specimen/Nunito) & [Lora](https://fonts.google.com/specimen/Lora) via Google Fonts |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- A free [Supabase](https://supabase.com/) account

### 1. Clone the repository

```bash
git clone https://github.com/bhuvan25-git/kids-care-clinic.git
cd kids-care-clinic
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example env file and add your Supabase credentials:

```bash
cp .env.example .env
```

Open `.env` and fill in your project details:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_PUBLIC_KEY
```

> 💡 **Where to find these:** Go to [Supabase](https://supabase.com/) → Your Project → **Settings** → **API**.

### 4. Set up the database

Run the following SQL in your **Supabase SQL Editor** to create the required tables and policies:

```sql
-- Bookings table
CREATE TABLE bookings (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name       TEXT NOT NULL,
  phone      TEXT NOT NULL,
  child_age  TEXT,
  date       DATE NOT NULL,
  time       TEXT NOT NULL,
  reason     TEXT,
  status     TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT now()
);

-- Inquiries table
CREATE TABLE inquiries (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name       TEXT NOT NULL,
  phone      TEXT NOT NULL,
  message    TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE bookings  ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Public insert policies (anyone can book / inquire)
CREATE POLICY "Public can insert bookings"  ON bookings  FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert inquiries" ON inquiries FOR INSERT WITH CHECK (true);

-- Admin read/update policies (authenticated users only)
CREATE POLICY "Admin can read bookings"   ON bookings  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can update bookings" ON bookings  FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can read inquiries"  ON inquiries FOR SELECT USING (auth.role() = 'authenticated');
```

### 5. Create an admin user

Go to **Supabase** → **Authentication** → **Users** → **Add User** and create an email/password account. This account will be used to log in to the admin dashboard.

### 6. Run the development server

```bash
npm run dev
```

Open your browser:

| Page | URL |
|---|---|
| 🏠 Landing Page | [http://localhost:5173](http://localhost:5173) |
| 🔐 Admin Dashboard | [http://localhost:5173/admin](http://localhost:5173/admin) |

---

## 📁 Project Structure

```
kids-care-clinic/
├── index.html                 ← HTML entry point
├── package.json
├── vite.config.js
├── tailwind.config.js         ← Custom theme (colors, fonts)
├── postcss.config.js
├── .env.example               ← Environment variable template
├── .gitignore
│
└── src/
    ├── main.jsx               ← App entry — React Router setup
    ├── index.css              ← Global styles + Tailwind directives
    │
    ├── pages/
    │   ├── Home.jsx           ← Public landing page
    │   └── Admin.jsx          ← Protected admin dashboard
    │
    ├── components/
    │   ├── Navbar.jsx         ← Top navigation bar
    │   ├── Hero.jsx           ← Hero banner with CTA
    │   ├── Marquee.jsx        ← Scrolling text marquee
    │   ├── Services.jsx       ← Services overview section
    │   ├── WhyUs.jsx          ← "Why choose us" section
    │   ├── ContactSection.jsx ← Contact info & inquiry form
    │   ├── CTABanner.jsx      ← Call-to-action banner
    │   ├── Footer.jsx         ← Site footer
    │   └── BookingModal.jsx   ← Appointment booking modal form
    │
    └── lib/
        └── supabase.js        ← Supabase client initialisation
```

---

## 🌐 Deployment

### Deploy to Vercel

1. Push your code to GitHub.
2. Import the repository on [Vercel](https://vercel.com/).
3. Add your environment variables under **Project Settings → Environment Variables**:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy! Vercel will auto-detect Vite and configure the build.

Alternatively, deploy via the CLI:

```bash
npm install -g vercel
vercel
```

> ⚠️ **Note:** Make sure to set up a rewrite rule for client-side routing. Add a `vercel.json` in the project root:
> ```json
> {
>   "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
> }
> ```

---

## 🎨 Design System

The project uses a custom **Tailwind CSS** theme defined in `tailwind.config.js`:

| Token | Value | Usage |
|---|---|---|
| `green` | `#1D9E75` | Primary brand colour |
| `green-dark` | `#085041` | Dark variant for hover/accents |
| `sky` | `#E1F5EE` | Light background tint |
| `sky-mid` | `#9FE1CB` | Mid-tone accent |
| `coral` | `#F0997B` | Warm accent colour |
| `amber` | `#FAC775` | Highlight / warning colour |
| `muted` | `#5F5E5A` | Body text colour |
| `light` | `#F1EFE8` | Off-white background |

**Typography:** Nunito (headings & body) · Lora (serif accents)

---

## 🤝 Contributing

Contributions are welcome! To get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
