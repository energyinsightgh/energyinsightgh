# SOP: Public UI Structure
> **Governs**: All public-facing page layouts, data dependencies, and navigation.
> **Rule**: Update this SOP BEFORE changing page structure or data fetching logic.
> Last updated: 2026-03-24

---

## 1. Navigation Structure

```
Header (sticky)
  ├── Logo / Brand mark
  ├── Nav Links: Home | Services | About | Blog | Contact
  └── CTA Button: "Request an Audit" → /contact

Footer
  ├── Logo + tagline
  ├── Services links
  ├── Quick links: About | Blog | Contact
  ├── Social links (optional)
  └── © energyinsightgh. All rights reserved.
```

**Hard Rule**: No link to `/admin` or any auth-related route in public nav.

---

## 2. Page Map & Data Dependencies

### `/` — Home Page
| Section | Data Source | Notes |
|---|---|---|
| Hero | Static copy | Headline, subhead, CTA |
| Benefits Strip | Static copy | 3 fixed benefit blocks |
| Services Preview | `services` table (`is_active = true`, ordered by `display_order`, limit 3) | Shows top 3 services |
| About Teaser | Static copy | Brief mission statement |
| Blog Preview | `blog_posts` table (`status = 'published'`, ordered by `published_at DESC`, limit 3) | Latest 3 posts |
| Contact CTA | Static copy | Full-width banner |

### `/services` — Services Overview
| Section | Data Source |
|---|---|
| Page header | Static copy |
| Services grid | `services` table (`is_active = true`, ordered by `display_order`) — all 5 |

### `/services/[slug]` — Individual Service
| Section | Data Source |
|---|---|
| Service detail | `services` table (`slug = params.slug`, `is_active = true`) |
| Benefits list | `services.benefits[]` |
| CTA | Static — links to `/contact` |

### `/blog` — Blog Listing
| Section | Data Source |
|---|---|
| Post grid | `blog_posts` (`status = 'published'`, ordered by `published_at DESC`) |
| Pagination | 9 posts per page |

### `/blog/[slug]` — Blog Post
| Section | Data Source |
|---|---|
| Post content | `blog_posts` (`slug = params.slug`, `status = 'published'`) |
| Related posts | `blog_posts` — same tags, limit 2 |

### `/about` — About Page
| Section | Data Source |
|---|---|
| All sections | Static copy + images |

### `/contact` — Contact Page
| Section | Data Source |
|---|---|
| Contact form | Static form — Server Action sends via Resend |
| Office info | Static copy |

---

## 3. Benefit Blocks (Home Page)

Three fixed blocks — no DB dependency:

| # | Benefit | Icon (Lucide) | Description |
|---|---|---|---|
| 1 | Waste Avoidance | `Zap` | Identify and eliminate energy waste through precision audits and monitoring |
| 2 | Expenditure Reduction | `TrendingDown` | Cut operational energy costs with data-driven system optimization |
| 3 | Regulatory Compliance | `ShieldCheck` | Meet national and regional energy efficiency standards with confidence |

---

## 4. Hero Copy

**Headline**: "Powering West Africa's Transition to Efficient Energy"
**Subheadline**: "Expert energy audits, facility inspections, and system design — helping businesses cut costs and meet compliance standards."
**CTA**: "Request a Free Consultation" → `/contact`

---

## 5. SEO Metadata Strategy

| Page | Title Format |
|---|---|
| Home | `energyinsightgh — Energy Consultancy for West Africa` |
| Services | `Our Services — energyinsightgh` |
| Service Detail | `{service.title} — energyinsightgh` |
| Blog | `Insights & Updates — energyinsightgh` |
| Blog Post | `{post.title} — energyinsightgh` |
| About | `About Us — energyinsightgh` |
| Contact | `Contact Us — energyinsightgh` |

All pages: `canonical` URL set, `og:image` defaults to site logo.

---

## 6. Contact Form Behavior

1. User submits name, email, company (optional), service interest, message
2. Server Action validates input (Zod schema)
3. Sends email via Resend to `RESEND_TO_EMAIL` env var
4. Returns success/error state to UI
5. No data stored in DB — email delivery only

---

## 7. Static Generation Strategy

| Route | Strategy |
|---|---|
| `/` | `revalidate = 3600` (ISR, 1 hour) |
| `/services` | `revalidate = 3600` |
| `/services/[slug]` | `generateStaticParams` + `revalidate = 3600` |
| `/blog` | `revalidate = 1800` (30 min) |
| `/blog/[slug]` | `generateStaticParams` + `revalidate = 1800` |
| `/about` | Static (no revalidation needed) |
| `/contact` | Static |

---

## Change Log
| Date | Change | Reason |
|---|---|---|
| 2026-03-24 | Initial SOP created | Protocol 0 initialization |
