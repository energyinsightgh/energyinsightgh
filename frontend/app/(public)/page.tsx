import { createClient } from '@/lib/supabase/server'
import { HeroSection } from '@/components/sections/HeroSection'

import { RealizationSection } from '@/components/sections/RealizationSection'
import { SolutionFrameworkSection } from '@/components/sections/SolutionFrameworkSection'
import { TransformationSection } from '@/components/sections/TransformationSection'
import { WhereLosingMoneySection } from '@/components/sections/WhereLosingMoneySection'
import { ComprehensiveServicesSection } from '@/components/sections/ComprehensiveServicesSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { ContactCTASection } from '@/components/sections/ContactCTASection'
import { TargetAudienceSection } from '@/components/sections/TargetAudienceSection'
import { PageScrollNavigator } from '@/components/ui/PageScrollNavigator'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { BlogPost, Service } from '@/types'

export const revalidate = 3600

export default async function HomePage() {
  const supabase = await createClient()

  const [{ data: servicesData }, { data: postsData }] = await Promise.all([
    (supabase.from('services') as any)
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true })
      .limit(3),
    (supabase.from('blog_posts') as any)
      .select('id, title, slug, excerpt, cover_image_url, author, published_at, tags')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(3),
  ]) as any[]

  const services = servicesData ?? []
  const posts = postsData ?? []

  return (
    <>
      <PageScrollNavigator />
      
      <HeroSection />
      
      <div id="realization">
        <RealizationSection />
      </div>
      
      <div id="where-losing-money">
        <WhereLosingMoneySection />
      </div>
      
      <div id="solution">
        <SolutionFrameworkSection />
      </div>
      
      <div id="services">
        <ComprehensiveServicesSection />
      </div>
      
      <div id="transformation">
        <TransformationSection />
      </div>

      <div id="target-audience">
        <TargetAudienceSection />
      </div>

      <div id="faq">
        <FAQSection />
      </div>

      {/* Blog Preview */}
      {posts && posts.length > 0 && (
        <section className="section-padding bg-surface-muted">
          <div className="container-site">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-3">
                  Insights & Updates
                </h2>
                <p className="text-text-secondary max-w-xl">
                  Energy efficiency news, case studies, and technical guidance from our team.
                </p>
              </div>
              <Link href="/blog" className="btn-outline text-sm py-2 shrink-0">
                View All Posts <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(posts as Partial<BlogPost>[]).map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="card overflow-hidden group"
                >
                  <div className="aspect-video bg-primary-50 flex items-center justify-center overflow-hidden">
                    {post.cover_image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={post.cover_image_url}
                        alt={post.title ?? ''}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="text-primary-200 text-4xl font-bold">ei</div>
                    )}
                  </div>
                  <div className="p-5">
                    {post.tags && post.tags.length > 0 && (
                      <span className="text-xs font-medium text-accent uppercase tracking-wider">
                        {post.tags[0]}
                      </span>
                    )}
                    <h3 className="font-bold text-text-primary mt-1 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-text-secondary text-sm line-clamp-2 mb-3">{post.excerpt}</p>
                    )}
                    <p className="text-xs text-text-muted">
                      {post.published_at ? formatDate(post.published_at) : ''}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <div id="contact">
        <ContactCTASection />
      </div>
    </>
  )
}
