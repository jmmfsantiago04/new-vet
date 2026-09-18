# VetPay

Tele-veterinary clinic app built with Next.js: a public marketing site, a client area for pets and appointments, and an admin CRM for users, bookings, blog, and FAQ.

> Repo folder is still named `new-vet`; the product name is **VetPay**.

## Live demo

https://new-vet.vercel.app/

## Stack

- **Next.js 15** (App Router) + **React 19**
- **Neon** (Postgres) + **Drizzle ORM**
- **NextAuth** (Credentials + optional Google)
- **Zod** validation + Server Actions
- **shadcn/ui** + **Tailwind CSS** + Motion

## Features

- Public pages: home, services, about, blog, FAQ
- Client dashboard: register pets, book appointments, edit profile
- Admin panel: appointments, users, pets, blog CMS, FAQ CMS
- Role-based access (`admin` / `user`) via middleware

## Getting started

### 1. Clone and install

```bash
git clone https://github.com/jmmfsantiago04/new-vet.git
cd new-vet
npm install --legacy-peer-deps
```

### 2. Environment

```bash
cp .env.example .env.local
```

Fill in at least:

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Neon connection string |
| `NEXTAUTH_SECRET` | Random secret for session encryption |
| `NEXTAUTH_URL` | `http://localhost:3000` locally |

Google vars are optional (only needed for Google sign-in).

### 3. Database

```bash
npm run db:push
npm run db:seed
```

Seed creates an admin user:

- **Email:** `admin@vetpay.com`
- **Password:** `Admin@123`

Change this password before sharing a public demo widely.

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |
| `npm run db:generate` | Generate Drizzle migrations |
| `npm run db:push` | Push schema to the database |
| `npm run db:seed` | Seed admin + sample content |
| `npm run db:studio` | Open Drizzle Studio |

## Project layout (high level)

- `app/` — routes (public, `/cliente`, `/admin`), server actions, DB schema
- `components/` — UI for home, auth, client, admin, shadcn primitives
- `drizzle/` — SQL migrations
- `middleware.ts` — auth / role gates

## Notes for reviewers

This project is meant to show a **multi-role full-stack product** (client + admin), not only a landing page. Pair it with the É de Chão café project for brand/UI polish vs product/auth depth.
