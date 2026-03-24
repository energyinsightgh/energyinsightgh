# gemini.md — energyinsightgh Project Map
> **Source of Truth** for project state, data schemas, and behavioral rules.
> Last updated: 2026-03-24

---

## Project Identity
| Field | Value |
|---|---|
| **Project Name** | energyinsightgh |
| **Mission** | Professional West African clean energy consultancy site that converts visitors into audit/inspection clients |
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

## B.L.A.S.T. Phase Tracker
| Phase | Status | Notes |
|---|---|---|
| B — Blueprint | ✅ Complete | Approved 2026-03-24 |
| L — Link | ✅ Complete | Verified with `npm run verify-db` (2026-03-24) |
| A — Architect | ✅ Complete | All 3 SOPs written in architecture/ |
| S — Stylize | ✅ Complete | EchoTech tokens in tailwind.config.ts + globals.css |
| T — Trigger | 🔲 Pending | Push to GitHub → connect Vercel → set env vars |

---

## Behavioral Rules (Hard Constraints)
1. **Admin-Only Auth**: Login is EXCLUSIVELY for Admin CMS access. No public auth.
2. **No Public Registration**: Zero `signup`, `register`, or `customer dashboard` routes — ever.
3. **No public `<Link>` to `/admin/*`**: Admin routes must never appear in public navigation.
4. **Data-First Rule**: No UI component is built before its JSON schema is confirmed below.
5. **SOP-First Rule**: If logic changes, update `architecture/*.md` BEFORE updating code.
6. **Link Gate**: `tools/verify-db-connection.ts` MUST return PASS before any UI data fetching is wired up.
7. **Self-Annealing**: On deployment failure → analyze stack trace → patch script → update SOP.

---

## Data Schema — Blog Posts
```json
{
  "id": "uuid (primary key, default gen_random_uuid())",
  "title": "string (not null)",
  "slug": "string (unique, not null)",
  "excerpt": "string (max 200 chars)",
  "content": "text (markdown)",
  "cover_image_url": "string | null",
  "author": "string (not null)",
  "tags": "text[] (default '{}')",
  "status": "enum('draft', 'published') (default 'draft')",
  "published_at": "timestamptz | null",
  "created_at": "timestamptz (default now())",
  "updated_at": "timestamptz (default now())"
}
```

## Data Schema — Service Cards
```json
{
  "id": "uuid (primary key, default gen_random_uuid())",
  "title": "string (not null)",
  "slug": "string (unique, not null)",
  "short_description": "string (max 120 chars, not null)",
  "full_description": "text (markdown)",
  "icon_name": "string (Lucide icon key, not null)",
  "benefits": "text[] (default '{}')",
  "display_order": "integer (not null)",
  "is_active": "boolean (default true)",
  "created_at": "timestamptz (default now())"
}
```

---

## Services Registry
| # | Title | Slug | Icon (Lucide) | Status |
|---|---|---|---|---|
| 1 | Facility Inspection | facility-inspection | `Building2` | Active |
| 2 | System Design | system-design | `Cpu` | Active |
| 3 | Energy Audits | energy-audits | `BarChart2` | Active |
| 4 | Training & Consulting | training-consulting | `GraduationCap` | Active |
| 5 | Load Inventory Analysis | load-inventory-analysis | `ClipboardList` | Active |

---

## EchoTech Design Tokens
| Token | Value |
|---|---|
| Primary | `#0F4C35` (deep forest green) |
| Accent | `#F5A623` (solar amber) |
| Surface | `#FFFFFF` / `#F8F9FA` |
| Text Primary | `#1A1A1A` |
| Text Secondary | `#4A5568` |
| Font | Inter (Google Fonts) |
| Grid | 12-column, max-width 1280px |

---

## Environment Variables Reference
> See `.env.local.example` for the full template.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only service role key |
| `RESEND_API_KEY` | Email delivery for contact form |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (for SEO/redirects) |

---

## Architecture SOPs Index
| SOP File | Governs |
|---|---|
| `architecture/Admin_Auth_Logic.md` | All admin authentication and route protection |
| `architecture/Public_UI_Structure.md` | Public page layouts and data dependencies |
| `architecture/Service_Data_Mapping.md` | Service seed data, icons, and benefit copy |

---

## Maintenance Log
| Date | Action | Notes |
|---|---|---|
| 2026-03-24 | Project initialized | gemini.md created, Blueprint approved |
| 2026-03-24 | Full scaffold complete | SOPs, migration, Next.js app, Admin CMS, public pages all written |
| 2026-03-24 | Phase 2 (Link) Fixed | Fixed npm install, added missing deps, verified DB connection |

---

*This file is the single source of truth. Do not delete or ignore it.*
