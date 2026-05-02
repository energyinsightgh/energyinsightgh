-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Client Emails Table
CREATE TABLE IF NOT EXISTS client_emails (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  source text NOT NULL CHECK (source IN ('newsletter', 'contact_form')),
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Add category_id to blog_posts (Safe check)
DO $$ 
BEGIN 
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='blog_posts' AND column_name='category_id') THEN
    ALTER TABLE blog_posts ADD COLUMN category_id uuid REFERENCES categories(id) ON DELETE SET NULL;
  END IF;
END $$;

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_emails ENABLE ROW LEVEL SECURITY;

-- Create policies for Admin access only
-- (We use DROP POLICY IF EXISTS before CREATE to avoid conflicts)

-- Categories
DROP POLICY IF EXISTS "Categories are readable by everyone" ON categories;
CREATE POLICY "Categories are readable by everyone" ON categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Categories are insertable by authenticated users" ON categories;
CREATE POLICY "Categories are insertable by authenticated users" ON categories FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Categories are updatable by authenticated users" ON categories;
CREATE POLICY "Categories are updatable by authenticated users" ON categories FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Categories are deletable by authenticated users" ON categories;
CREATE POLICY "Categories are deletable by authenticated users" ON categories FOR DELETE USING (auth.role() = 'authenticated');

-- Client Emails
DROP POLICY IF EXISTS "Client emails are readable by authenticated users only" ON client_emails;
CREATE POLICY "Client emails are readable by authenticated users only" ON client_emails FOR SELECT USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Client emails can be inserted by anon users (public)" ON client_emails;
CREATE POLICY "Client emails can be inserted by anon users (public)" ON client_emails FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Client emails can be deleted by authenticated users" ON client_emails;
CREATE POLICY "Client emails can be deleted by authenticated users" ON client_emails FOR DELETE USING (auth.role() = 'authenticated');
