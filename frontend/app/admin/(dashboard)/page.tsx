import { FileText, Settings, PlusCircle, Mail, Folder, Tag } from 'lucide-react'

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  const [postsRes, servicesRes, categoriesRes, allPostsRes, newsletterRes, waitlistRes, contactRes] =
    await Promise.all([
      (supabase.from('blog_posts') as any).select('*', { count: 'exact', head: true }),
      (supabase.from('services') as any).select('*', { count: 'exact', head: true }),
      (supabase.from('categories') as any).select('*'),
      (supabase.from('blog_posts') as any).select('id, title, slug, status, published_at, category_id, tags'),
      (supabase.from('client_emails') as any).select('*', { count: 'exact', head: true }).eq('source', 'newsletter'),
      (supabase.from('client_emails') as any).select('*', { count: 'exact', head: true }).eq('source', 'blog_waitlist'),
      (supabase.from('client_emails') as any).select('*', { count: 'exact', head: true }).eq('source', 'contact_form')
    ])

  if (postsRes.error) throw new Error(`Database Error (blog_posts count): ${postsRes.error.message}`)
  if (servicesRes.error) throw new Error(`Database Error (services count): ${servicesRes.error.message}`)

  const postCount = postsRes.count
  const serviceCount = servicesRes.count
  
  const categories = categoriesRes.data as any[] || []
  const allPosts = allPostsRes.data as any[] || []
  
  // Group posts by category
  const folders = categories.map(cat => {
    const catPosts = allPosts.filter(p => p.category_id === cat.id)
    return {
      ...cat,
      postCount: catPosts.length,
      recentPosts: catPosts.sort((a, b) => new Date(b.published_at || 0).getTime() - new Date(a.published_at || 0).getTime()).slice(0, 3)
    }
  })
  
  // Also collect posts without a category
  const uncategorizedPosts = allPosts.filter(p => !p.category_id)
  if (uncategorizedPosts.length > 0) {
    folders.push({
      id: 'uncategorized',
      name: 'Uncategorized',
      slug: 'uncategorized',
      description: 'Posts without a category',
      created_at: '',
      postCount: uncategorizedPosts.length,
      recentPosts: uncategorizedPosts.sort((a, b) => new Date(b.published_at || 0).getTime() - new Date(a.published_at || 0).getTime()).slice(0, 3)
    })
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-8">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <Link href="/admin/blog" className="text-xs text-primary hover:underline">View all</Link>
          </div>
          <div className="text-3xl font-bold text-text-primary">{postCount ?? 0}</div>
          <div className="text-sm text-text-secondary mt-1">Blog Posts</div>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
              <Settings className="w-5 h-5 text-primary" />
            </div>
            <Link href="/admin/services" className="text-xs text-primary hover:underline">View all</Link>
          </div>
          <div className="text-3xl font-bold text-text-primary">{serviceCount ?? 0}</div>
          <div className="text-sm text-text-secondary mt-1">Services</div>
        </div>
        <div className="card p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-accent" />
              </div>
              <div className="font-bold text-text-primary text-sm leading-tight">Email Hub</div>
            </div>
            <Link href="/admin/emails" className="text-xs text-primary hover:underline">View all</Link>
          </div>
          <div className="space-y-2 mt-auto">
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-secondary">Newsletter</span>
              <span className="font-bold text-text-primary bg-slate-100 px-2 py-0.5 rounded-full">{newsletterRes.count ?? 0}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-secondary">Waitlist</span>
              <span className="font-bold text-text-primary bg-slate-100 px-2 py-0.5 rounded-full">{waitlistRes.count ?? 0}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-secondary">Contact Form</span>
              <span className="font-bold text-text-primary bg-slate-100 px-2 py-0.5 rounded-full">{contactRes.count ?? 0}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3 mb-10">
        <Link href="/admin/blog/new" className="btn-primary text-sm py-2">
          <PlusCircle className="w-4 h-4" /> New Blog Post
        </Link>
      </div>

      {/* Category Folders Hub */}
      <div>
        <h2 className="text-xl font-bold text-text-primary mb-6">Blog Content Hub</h2>
        
        {folders.length === 0 ? (
          <p className="text-text-secondary text-sm">No posts or categories yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {folders.map(folder => (
              <div key={folder.id} className="card p-5 border border-primary-100 hover:border-primary/40 transition-colors group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <Folder className="w-6 h-6 fill-primary/20" />
                    </div>
                    <div>
                      <h3 className="font-bold text-text-primary">{folder.name}</h3>
                      <span className="text-xs font-medium text-text-secondary bg-slate-100 px-2 py-0.5 rounded-full">
                        {folder.postCount} {folder.postCount === 1 ? 'article' : 'articles'}
                      </span>
                    </div>
                  </div>
                </div>
                
                {folder.recentPosts.length > 0 ? (
                  <div className="space-y-3 mt-5 border-t border-gray-100 pt-4">
                    <div className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Recent Articles</div>
                    {folder.recentPosts.map((post: any) => (
                      <Link 
                        key={post.id} 
                        href={`/admin/blog/${post.id}`}
                        className="block group/post"
                      >
                        <div className="text-sm font-medium text-text-primary group-hover/post:text-primary transition-colors line-clamp-1">
                          {post.title}
                        </div>
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex items-center gap-1 mt-1">
                            <Tag className="w-3 h-3 text-slate-400" />
                            <div className="text-[10px] text-slate-500 line-clamp-1">
                              {post.tags.join(', ')}
                            </div>
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="mt-5 border-t border-gray-100 pt-4 text-xs text-text-secondary italic">
                    Empty folder
                  </div>
                )}
                
                <div className="mt-5 pt-3 border-t border-gray-50 flex justify-end">
                  <Link href="/admin/blog" className="text-xs text-primary font-bold hover:underline">
                    View all in category
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
