# gemini.md — energyinsightgh Project Map
> **Source of Truth** for project state, data schemas, and behavioral rules.
> Last updated: 2026-03-24

---

## 📁 Directory Structure

```
/Energy Insight
├── gemini.md                 # ← You are here (Source of Truth)
├── docs/                     # Documentation & Project SOPs
│   ├── architecture/         # System design & SOPs
│   └── images/               # UI screenshots & Reference visuals
├── scripts/                  # Verification & Maintenance
├── frontend/                 # Next.js Application
│   ├── app/                  # Routes & Layouts
│   ├── components/           # UI, Section & Admin Components
│   ├── hooks/                # Shared React hooks
│   ├── lib/                  # Supabase & Utilities
│   └── types/                # TypeScript interfaces
├── backend/                  # Database Logic
│   └── migrations/           # Supabase Schema
└── package.json              # Workspace root (delegates to frontend/)
```

---

## Project Identity
| Field | Value |
|---|---|
| **Project Name** | energyinsightgh |
| **Mission** | Foster energy literacy and awareness, ensuring clients not only save on expenditures but also contribute to a greener, more sustainable future. |
| **Goal** | Empower individuals and organizations to optimize their energy consumption, reducing costs while promoting sustainability. |
| **Description** | Energy Insight is a leader in energy efficiency services, dedicated to helping residential and commercial clients identify and implement energy-saving solutions. With a comprehensive range of services, including facility inspections, energy audits, and tailored consulting, we provide expert guidance on maximizing efficiency in energy-consuming systems. Through our training programs and analysis services, we aim to eliminate energy waste and help our clients meet regulatory requirements, paving the way for smarter energy utilization. |
| **Protocol** | B.L.A.S.T. (Blueprint → Link → Architect → Stylize → Trigger) |
| **Architecture** | A.N.T. 3-Layer (Architecture → Navigation → Tools) |
| **Visual Style** | EchoTech — clean solar aesthetic, high-contrast grid |

---

## Stack
| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth — **Admin only** |
| Storage | Supabase Storage |
| Deploy | Vercel |
| Email | Resend (contact form delivery) |

---

## 📋 B.L.A.S.T. Phase Tracker

| Phase | Status | Frontend (UI/UX) | Backend (Logic/DB) | Reference Snippet | Notes |
|---|---|---|---|---|---|
| **B — Blueprint** | ✅ Complete | Branding & Layout | JSON Schema | `hero-section` | Approved 2026-03-24 |
| **L — Link** | ✅ Complete | Data Fetching | Supabase & Env | `db-connection` | Verified with `npm run verify-db` |
| **A — Architect** | ✅ Complete | Page Routing | SOPs & Logic | `page-structure` | All 3 SOPs written in architecture/ |
| **S — Stylize** | ✅ Complete | EchoTech Theme | Tailwind Tokens | `visual-style` | Inter Font + Grid System |
| **T — Trigger** | ✅ Complete | Production Build | Deployment/Git | `live-site` | Live on Vercel |

---

## 🗄️ CANONICAL Data Schema

### TABLE: `blog_posts`
**Purpose**: Public articles and energy news

| Field | Type | Notes |
|---|---|---|
| `id` | `uuid` (PK) | `default gen_random_uuid()` |
| `title` | `string` | Not null |
| `slug` | `string` | Unique, not null |
| `excerpt` | `string` | Max 200 chars |
| `content` | `text` | Markdown |
| `status` | `enum` | `'draft'`, `'published'` |
| `published_at` | `timestamptz` | |

### TABLE: `services`
**Purpose**: Clean energy service offerings

| Field | Type | Notes |
|---|---|---|
| `id` | `uuid` (PK) | |
| `title` | `string` | |
| `slug` | `string` | Unique |
| `short_description`| `string` | Max 120 chars |
| `icon_name` | `string` | Lucide icon key |
| `is_active` | `boolean` | |

---

## 🔐 Behavioral Rules (Hard Constraints)
1. **Admin-Only Auth**: Login is EXCLUSIVELY for Admin CMS access. No public auth.
2. **No Public Registration**: Zero `signup`, `register`, or `customer dashboard` routes — ever.
3. **No public `<Link>` to `/admin/*`**: Admin routes must never appear in public navigation.
4. **Data-First Rule**: No UI component is built before its JSON schema is confirmed.
5. **SOP-First Rule**: If logic changes, update `architecture/*.md` BEFORE updating code.
6. **Link Gate**: `tools/verify-db-connection.ts` MUST return PASS before any UI data fetching is wired up.

---

## 🗒️ Reference Snippets Audit

| File | Status | Purpose |
|---|---|---|
| `hero-section` | ✅ | Primary landing page visual |
| `services-preview` | ✅ | Overview of core energy services |
| `db-connection` | ✅ | PASS status from `verify-db` script |
| `contact-form` | ✅ | Conversion point for site visitors |

---

## 🛠️ Maintenance Log
| Date | Action | Notes |
|---|---|---|
| 2026-03-24 | Project initialized | gemini.md created, Blueprint approved |
| 2026-03-24 | Phase 2 (Link) Fixed | Fixed npm install, added missing deps, verified DB connection |
| 2026-03-24 | Phase 8 (Trigger) Done | Initial commit, repo link, and Vercel deployment confirmed |
| 2026-03-24 | B.L.A.S.T. Refinement | Expanded schema, phase tracker, and directory structure applied |
| 2026-03-24 | Content Sync | Updated Mission, Goal, and Description with official copy |

---

*This file is the single source of truth. Do not delete or ignore it.*
