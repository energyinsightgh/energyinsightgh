-- ============================================================
-- energyinsightgh — Initial Schema Migration
-- Run this in: Supabase Dashboard → SQL Editor
-- ============================================================

-- Enable UUID extension (usually already enabled)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- TABLE: services
-- ============================================================
CREATE TABLE IF NOT EXISTS public.services (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title           TEXT NOT NULL,
  slug            TEXT UNIQUE NOT NULL,
  short_description TEXT NOT NULL CHECK (char_length(short_description) <= 120),
  full_description  TEXT,
  icon_name       TEXT NOT NULL,
  benefits        TEXT[] DEFAULT '{}',
  display_order   INTEGER NOT NULL,
  is_active       BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: blog_posts
-- ============================================================
CREATE TYPE post_status AS ENUM ('draft', 'published');

CREATE TABLE IF NOT EXISTS public.blog_posts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title           TEXT NOT NULL,
  slug            TEXT UNIQUE NOT NULL,
  excerpt         TEXT CHECK (char_length(excerpt) <= 200),
  content         TEXT,
  cover_image_url TEXT,
  author          TEXT NOT NULL DEFAULT 'energyinsightgh',
  tags            TEXT[] DEFAULT '{}',
  status          post_status DEFAULT 'draft',
  published_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-update updated_at on blog_posts
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- Enable RLS
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Public: can read active services
CREATE POLICY "Public can read active services"
  ON public.services
  FOR SELECT
  USING (is_active = TRUE);

-- Public: can read published blog posts
CREATE POLICY "Public can read published posts"
  ON public.blog_posts
  FOR SELECT
  USING (status = 'published');

-- Admin (authenticated): full access to services
CREATE POLICY "Admin full access to services"
  ON public.services
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Admin (authenticated): full access to blog_posts
CREATE POLICY "Admin full access to blog_posts"
  ON public.blog_posts
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- ============================================================
-- SEED DATA: Services
-- ============================================================
INSERT INTO public.services (title, slug, short_description, full_description, icon_name, benefits, display_order, is_active)
VALUES
(
  'Facility Inspection',
  'facility-inspection',
  'Comprehensive on-site assessment of your facility''s energy systems and infrastructure.',
  'Our facility inspection service provides a thorough evaluation of your building''s energy systems, including HVAC, lighting, electrical distribution, and mechanical equipment. Our certified engineers identify inefficiencies, safety hazards, and opportunities for immediate improvement. You receive a detailed inspection report with prioritized recommendations and projected savings.',
  'Building2',
  ARRAY['Identify hidden energy waste sources', 'Uncover safety and compliance gaps', 'Receive a prioritized action plan', 'Benchmark against industry standards'],
  1,
  TRUE
),
(
  'System Design',
  'system-design',
  'Custom renewable and hybrid energy system design tailored to your facility''s load profile.',
  'We design bespoke energy systems — from solar PV arrays and battery storage to hybrid grid-tied solutions — engineered to match your facility''s actual demand profile. Our designs are optimized for reliability, ROI, and scalability, and include full technical documentation for procurement and installation.',
  'Cpu',
  ARRAY['Right-sized systems that avoid over-engineering', 'Maximum ROI through load-matched design', 'Full technical documentation package', 'Scalable architecture for future expansion'],
  2,
  TRUE
),
(
  'Energy Audits',
  'energy-audits',
  'In-depth analysis of your energy consumption patterns with actionable efficiency recommendations.',
  'Our energy audit service delivers a comprehensive analysis of your organization''s energy consumption across all utility types — electricity, fuel, water. Using metering data, bill analysis, and on-site measurement, we produce an audit report aligned with ASHRAE Level 1–2 standards, including a detailed Energy Conservation Measures (ECM) matrix with cost-benefit analysis.',
  'BarChart2',
  ARRAY['ASHRAE-aligned audit methodology', 'Detailed ECM matrix with payback periods', 'Baseline and target energy intensity metrics', 'Supports green certification applications'],
  3,
  TRUE
),
(
  'Training & Consulting',
  'training-consulting',
  'Strategic energy consulting and staff training programs to build internal energy management capacity.',
  'We offer tailored training workshops and strategic consulting engagements for facility managers, engineering teams, and executive leadership. Our programs cover energy management systems (EnMS), ISO 50001 implementation, utility bill analysis, and operational best practices. Consulting retainers are available for ongoing advisory support.',
  'GraduationCap',
  ARRAY['ISO 50001 implementation guidance', 'Customized workshops for your team', 'Practical, hands-on training modules', 'Ongoing advisory retainer options'],
  4,
  TRUE
),
(
  'Load Inventory Analysis',
  'load-inventory-analysis',
  'Detailed mapping and quantification of all electrical loads across your facility.',
  'A load inventory is the foundation of any effective energy management strategy. Our engineers catalog every electrical load in your facility — equipment ratings, operating hours, usage patterns, and demand contributions. The resulting load schedule is used to rightsize systems, identify demand charge reduction opportunities, and support capital planning.',
  'ClipboardList',
  ARRAY['Complete equipment-level load schedule', 'Demand charge reduction opportunities', 'Foundation data for system design', 'Supports budgeting and capital planning'],
  5,
  TRUE
)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_services_display_order ON public.services (display_order);
CREATE INDEX IF NOT EXISTS idx_services_is_active ON public.services (is_active);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON public.blog_posts (status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON public.blog_posts (published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts (slug);
CREATE INDEX IF NOT EXISTS idx_services_slug ON public.services (slug);
