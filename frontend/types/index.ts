// ============================================================
// energyinsightgh — TypeScript Types
// Derived from gemini.md Data Schemas
// ============================================================

// ---- Database Types ----

export type PostStatus = 'draft' | 'published'

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  created_at: string
}

export interface ClientEmail {
  id: string
  email: string
  source: 'newsletter' | 'contact_form'
  created_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  cover_image_url: string | null
  author: string
  tags: string[]
  category_id: string | null
  status: PostStatus
  published_at: string | null
  created_at: string
  updated_at: string
}

export interface Service {
  id: string
  title: string
  slug: string
  short_description: string
  full_description: string | null
  icon_name: string
  benefits: string[]
  display_order: number
  is_active: boolean
  created_at: string
}

// ---- Supabase Database Type Map ----

export interface Database {
  public: {
    Tables: {
      blog_posts: {
        Row: BlogPost
        Insert: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'> & {
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Omit<BlogPost, 'id' | 'created_at'>>
      }
      services: {
        Row: Service
        Insert: Omit<Service, 'id' | 'created_at'> & {
          id?: string
          created_at?: string
        }
        Update: Partial<Omit<Service, 'id' | 'created_at'>>
      }
      categories: {
        Row: Category
        Insert: Omit<Category, 'id' | 'created_at'> & {
          id?: string
          created_at?: string
        }
        Update: Partial<Omit<Category, 'id' | 'created_at'>>
      }
      client_emails: {
        Row: ClientEmail
        Insert: Omit<ClientEmail, 'id' | 'created_at'> & {
          id?: string
          created_at?: string
        }
        Update: Partial<Omit<ClientEmail, 'id' | 'created_at'>>
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: {
      post_status: PostStatus
    }
  }
}

// ---- UI / Component Types ----

export interface BenefitBlock {
  icon: string
  title: string
  description: string
}

export interface ContactFormData {
  name: string
  email: string
  company?: string
  service_interest?: string
  message: string
}

export interface NavItem {
  label: string
  href: string
}
