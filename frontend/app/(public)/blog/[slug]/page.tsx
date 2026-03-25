import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { formatDate } from '@/lib/utils'
import type { BlogPost } from '@/types'

export const revalidate = 1800

export async function generateStaticParams() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('blog_posts')
    .select('slug')
    .eq('status', 'published')
  
  return (data as any[] ?? []).map((p) => ({
    slug: (p as any).slug
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from('blog_posts')
    .select('title, excerpt')
    .eq('slug', slug)
    .single()
  return { title: data?.title ?? 'Blog Post', description: data?.excerpt ?? undefined }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (!post) notFound()

  const p = post as BlogPost

  return (
    <article>
      {/* Header */}
      <section className="bg-primary section-padding">
        <div className="container-site max-w-3xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-primary-100 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          {p.tags && p.tags.length > 0 && (
            <div className="flex gap-2 mb-4 flex-wrap">
              {p.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 text-xs bg-primary-400/30 text-accent rounded-full px-3 py-1">
                  <Tag className="w-3 h-3" /> {tag}
                </span>
              ))}
            </div>
          )}
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">{p.title}</h1>
          <div className="flex items-center gap-4 text-sm text-primary-100">
            <span className="flex items-center gap-1.5"><User className="w-4 h-4" />{p.author}</span>
            {p.published_at && (
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{formatDate(p.published_at)}</span>
            )}
          </div>
        </div>
      </section>

      {/* Cover Image */}
      {p.cover_image_url && (
        <div className="container-site max-w-3xl -mt-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.cover_image_url}
            alt={p.title}
            className="w-full rounded-xl shadow-lg aspect-video object-cover"
          />
        </div>
      )}

      {/* Content */}
      <section className="section-padding">
        <div className="container-site max-w-3xl">
          {p.excerpt && (
            <p className="text-xl text-text-secondary leading-relaxed mb-8 border-l-4 border-accent pl-5 italic">
              {p.excerpt}
            </p>
          )}
          <div className="prose prose-lg max-w-none text-text-secondary whitespace-pre-line leading-relaxed">
            {p.content}
          </div>
        </div>
      </section>
    </article>
  )
}
