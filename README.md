# MBA Partner

> **Initiative by Alumni of Old IIM** — The definitive placement-prep platform for MBA aspirants.

MBA Partner bridges the gap between generic coaching and real-world placement success. Built for students targeting IIMs, XLRI, FMS, and top B-schools, it delivers a structured, mentor-led preparation stack covering CV building, PI mocks, GD simulations, case competitions, and live client projects.

---

## ✨ Features

| Area | What's Inside |
|---|---|
| **Programs** | All-In-One Combo, Placements Bootcamp, Live Project, PI Mocks, GD Practice, CV Reviews |
| **CAT / OMET Hub** | Sectional Mocks, Percentile Calculator, Profile Evaluator, Free Study Material |
| **Student Dashboard** | Progress tracker, session log, mock scores, downloadable materials |
| **Mentors** | IIM-alumni mentor profiles with domain & batch details |
| **Testimonials** | Written + video testimonials from placed students |
| **Group Enrollment** | Bulk pricing form for colleges & corporates |
| **Enquiry & Enroll** | Multi-step enquiry modal + dedicated `/enroll` page |
| **Authentication** | Email/password auth via Supabase — protected `/dashboard` route |
| **Community** | Live activity feed, cohort snapshot, peer stats |
| **FAQs** | Searchable accordion-style FAQ section |
| **Compare Tool** | Side-by-side program comparison with feature matrix |

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** JavaScript (React 19)
- **Styling:** Vanilla CSS with CSS Custom Properties design system
- **Auth & DB:** [Supabase](https://supabase.com/) (Auth + PostgreSQL)
- **Deployment:** [Vercel](https://vercel.com/) (primary) + Wix Studio (embedded)
- **Region:** `bom1` (Mumbai) for low-latency Indian traffic

---

## 📁 Project Structure

```
mba-partner-app/
├── app/
│   ├── page.js                # Homepage
│   ├── layout.js              # Root layout
│   ├── globals.css            # Design system & global styles
│   ├── courses/               # Program catalog & course detail pages
│   ├── dashboard/             # Protected student dashboard
│   ├── login/                 # Authentication page
│   ├── enroll/                # Multi-step enrollment page
│   ├── mentors/               # Mentor profiles
│   ├── testimonials/          # Written + video testimonials
│   ├── cat-omet/              # CAT/OMET prep hub
│   ├── profile-evaluator/     # Profile evaluation tool
│   ├── free-material/         # Free resources
│   ├── college-collab/        # College tie-ups & group pricing
│   └── api/                   # API routes
├── components/
│   └── layout/
│       ├── Navbar.js          # Mega-nav with dropdowns
│       ├── Footer.js          # Site footer
│       └── USPPopup.js        # Exit-intent USP popup
├── lib/
│   ├── supabase.js            # Supabase client
│   ├── auth.js                # Auth helpers
│   └── utils.js               # Utility functions
├── public/
│   └── videos/                # Video testimonials (mp4)
├── next.config.mjs            # Next.js configuration
└── vercel.json                # Vercel deployment configuration
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project with Auth enabled

### 1. Clone the repository

```bash
git clone https://github.com/your-org/mba-partner-app.git
cd mba-partner-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

> ⚠️ Never commit `.env.local` to version control. It is included in `.gitignore`.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## ☁️ Deployment

### Deploy to Vercel

1. Push the repository to GitHub.
2. Import the project in your [Vercel Dashboard](https://vercel.com/new).
3. Set the following **Environment Variables** in Vercel Project Settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Click **Deploy**.

The `vercel.json` configures the build to target the `bom1` (Mumbai) region for optimal performance for Indian users.

### Embed in Wix Studio

The app is configured to allow embedding via Wix's "Embed a Website" element. The `next.config.mjs` sets the following security headers to permit this:

```js
"Content-Security-Policy": "frame-ancestors 'self' https://*.wix.com https://*.wixsite.com https://*.wixstudio.com"
```

No additional configuration is required on the Wix side.

---

## 🔐 Environment Variables Reference

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ Yes | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ Yes | Your Supabase public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ Yes | Your Supabase service role key (server-side only) |

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the local development server |
| `npm run build` | Create an optimized production build |
| `npm run start` | Start the production server locally |
| `npm run lint` | Run ESLint across the codebase |

---

## 🤝 Contributing

This is a private project. If you're a team member, please:

1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Commit your changes: `git commit -m 'feat: add your feature'`
3. Push to the branch: `git push origin feature/your-feature-name`
4. Open a Pull Request for review.

---

## 📄 License

This project is proprietary and confidential. All rights reserved by **MBA Partner**.

---

<p align="center">Built with ❤️ by Team <strong>gargith24</strong></p>
