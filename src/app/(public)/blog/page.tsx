import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { formatDate } from '@/lib/utils'
import type { BlogPost } from '@/types'

export const metadata: Metadata = { title: 'Insights & Updates' }
export const revalidate = 1800

export default async function BlogPage() {
  const supabase = await createClient()
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, cover_image_url, author, published_at, tags')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  return (
    <>
      <section className="bg-primary section-padding">
        <div className="container-site">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">Insights & Updates</h1>
          <p className="text-primary-100 text-lg max-w-2xl">
            Energy efficiency news, technical guides, and case studies from the energyinsightgh team.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-site">
          {!posts || posts.length === 0 ? (
            <div className="text-center py-20 text-text-secondary">
              <p className="text-lg">No posts published yet. Check back soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(posts as Partial<BlogPost>[]).map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="card overflow-hidden group">
                  <div className="aspect-video bg-primary-50 flex items-center justify-center overflow-hidden">
                    {post.cover_image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={post.cover_image_url}
                        alt={post.title ?? ''}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="text-primary-200 text-4xl font-bold select-none">ei</div>
                    )}
                  </div>
                  <div className="p-5">
                    {post.tags && post.tags.length > 0 && (
                      <span className="text-xs font-medium text-accent uppercase tracking-wider">
                        {post.tags[0]}
                      </span>
                    )}
                    <h2 className="font-bold text-text-primary mt-1 mb-2 text-lg group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-text-secondary text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                    )}
                    <div className="flex items-center justify-between text-xs text-text-muted">
                      <span>{post.author}</span>
                      <span>{post.published_at ? formatDate(post.published_at) : ''}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
