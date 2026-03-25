# SOP: Service Data Mapping
> **Governs**: Service card seed data, icon assignments, benefit copy, and display order.
> **Rule**: Update this SOP BEFORE changing service content or seed data.
> Last updated: 2026-03-24

---

## 1. Overview

This SOP defines the canonical seed data for all 5 services. This data is used to:
1. Populate the `supabase/migrations/001_initial_schema.sql` seed INSERT statements
2. Verify service card display on the public UI
3. Guide copywriting and benefit messaging

---

## 2. Service Seed Data

### Service 1: Facility Inspection
```json
{
  "title": "Facility Inspection",
  "slug": "facility-inspection",
  "short_description": "Comprehensive on-site assessment of your facility's energy systems and infrastructure.",
  "full_description": "Our facility inspection service provides a thorough evaluation of your building's energy systems, including HVAC, lighting, electrical distribution, and mechanical equipment. Our certified engineers identify inefficiencies, safety hazards, and opportunities for immediate improvement. You receive a detailed inspection report with prioritized recommendations and projected savings.",
  "icon_name": "Building2",
  "benefits": [
    "Identify hidden energy waste sources",
    "Uncover safety and compliance gaps",
    "Receive a prioritized action plan",
    "Benchmark against industry standards"
  ],
  "display_order": 1,
  "is_active": true
}
```

### Service 2: System Design
```json
{
  "title": "System Design",
  "slug": "system-design",
  "short_description": "Custom renewable and hybrid energy system design tailored to your facility's load profile.",
  "full_description": "We design bespoke energy systems — from solar PV arrays and battery storage to hybrid grid-tied solutions — engineered to match your facility's actual demand profile. Our designs are optimized for reliability, ROI, and scalability, and include full technical documentation for procurement and installation.",
  "icon_name": "Cpu",
  "benefits": [
    "Right-sized systems that avoid over-engineering",
    "Maximum ROI through load-matched design",
    "Full technical documentation package",
    "Scalable architecture for future expansion"
  ],
  "display_order": 2,
  "is_active": true
}
```

### Service 3: Energy Audits
```json
{
  "title": "Energy Audits",
  "slug": "energy-audits",
  "short_description": "In-depth analysis of your energy consumption patterns with actionable efficiency recommendations.",
  "full_description": "Our energy audit service delivers a comprehensive analysis of your organization's energy consumption across all utility types — electricity, fuel, water. Using metering data, bill analysis, and on-site measurement, we produce an audit report aligned with ASHRAE Level 1–2 standards, including a detailed Energy Conservation Measures (ECM) matrix with cost-benefit analysis.",
  "icon_name": "BarChart2",
  "benefits": [
    "ASHRAE-aligned audit methodology",
    "Detailed ECM matrix with payback periods",
    "Baseline and target energy intensity metrics",
    "Supports green certification applications"
  ],
  "display_order": 3,
  "is_active": true
}
```

### Service 4: Training & Consulting
```json
{
  "title": "Training & Consulting",
  "slug": "training-consulting",
  "short_description": "Strategic energy consulting and staff training programs to build internal energy management capacity.",
  "full_description": "We offer tailored training workshops and strategic consulting engagements for facility managers, engineering teams, and executive leadership. Our programs cover energy management systems (EnMS), ISO 50001 implementation, utility bill analysis, and operational best practices. Consulting retainers are available for ongoing advisory support.",
  "icon_name": "GraduationCap",
  "benefits": [
    "ISO 50001 implementation guidance",
    "Customized workshops for your team",
    "Practical, hands-on training modules",
    "Ongoing advisory retainer options"
  ],
  "display_order": 4,
  "is_active": true
}
```

### Service 5: Load Inventory Analysis
```json
{
  "title": "Load Inventory Analysis",
  "slug": "load-inventory-analysis",
  "short_description": "Detailed mapping and quantification of all electrical loads across your facility.",
  "full_description": "A load inventory is the foundation of any effective energy management strategy. Our engineers catalog every electrical load in your facility — equipment ratings, operating hours, usage patterns, and demand contributions. The resulting load schedule is used to rightsize systems, identify demand charge reduction opportunities, and support capital planning.",
  "icon_name": "ClipboardList",
  "benefits": [
    "Complete equipment-level load schedule",
    "Demand charge reduction opportunities",
    "Foundation data for system design",
    "Supports budgeting and capital planning"
  ],
  "display_order": 5,
  "is_active": true
}
```

---

## 3. Icon Reference (Lucide React)

| Service | Lucide Icon | Import |
|---|---|---|
| Facility Inspection | `Building2` | `import { Building2 } from 'lucide-react'` |
| System Design | `Cpu` | `import { Cpu } from 'lucide-react'` |
| Energy Audits | `BarChart2` | `import { BarChart2 } from 'lucide-react'` |
| Training & Consulting | `GraduationCap` | `import { GraduationCap } from 'lucide-react'` |
| Load Inventory Analysis | `ClipboardList` | `import { ClipboardList } from 'lucide-react'` |

Benefit Section Icons (Home page):
| Benefit | Lucide Icon |
|---|---|
| Waste Avoidance | `Zap` |
| Expenditure Reduction | `TrendingDown` |
| Regulatory Compliance | `ShieldCheck` |

---

## 4. Display Order Logic

Services are fetched with `ORDER BY display_order ASC`. The Home page shows the first 3
(Facility Inspection, System Design, Energy Audits). All 5 appear on `/services`.

To reorder: update `display_order` values in the Supabase dashboard — no code change needed.

---

## Change Log
| Date | Change | Reason |
|---|---|---|
| 2026-03-24 | Initial SOP created | Protocol 0 initialization |
