import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { FileText, Settings, PlusCircle, Eye } from 'lucide-react'

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  const [postsRes, servicesRes, recentPostsRes] =
    await Promise.all([
      (supabase.from('blog_posts') as any).select('*', { count: 'exact', head: true }),
      (supabase.from('services') as any).select('*', { count: 'exact', head: true }),
      (supabase.from('blog_posts') as any)
        .select('id, title, slug, status, published_at')
        .order('created_at', { ascending: false })
        .limit(5),
    ])

  if (postsRes.error) throw new Error(`Database Error (blog_posts count): ${postsRes.error.message}`)
  if (servicesRes.error) throw new Error(`Database Error (services count): ${servicesRes.error.message}`)
  if (recentPostsRes.error) throw new Error(`Database Error (recent posts): ${recentPostsRes.error.message}`)

  const postCount = postsRes.count
  const serviceCount = servicesRes.count
  const recentPosts = recentPostsRes.data as any[] || []

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
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-accent" />
            </div>
            <a href="/" target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">
              Open site
            </a>
          </div>
          <div className="text-3xl font-bold text-text-primary">Live</div>
          <div className="text-sm text-text-secondary mt-1">Public Site</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3 mb-10">
        <Link href="/admin/blog/new" className="btn-primary text-sm py-2">
          <PlusCircle className="w-4 h-4" /> New Blog Post
        </Link>
      </div>

      {/* Recent Posts */}
      <div>
        <h2 className="text-lg font-semibold text-text-primary mb-4">Recent Posts</h2>
        {!recentPosts || recentPosts.length === 0 ? (
          <p className="text-text-secondary text-sm">No posts yet.</p>
        ) : (
          <div className="card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-surface-muted border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-text-secondary">Title</th>
                  <th className="text-left px-4 py-3 font-medium text-text-secondary">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-text-secondary">Published</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {(recentPosts as any[]).map((post: any) => (
                  <tr key={post.id} className="hover:bg-surface-muted/50">
                    <td className="px-4 py-3 font-medium text-text-primary">
                      <Link href={`/admin/blog/${post.id}`} className="hover:underline hover:text-primary block w-full h-full">
                        {post.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 text-xs rounded-full font-medium ${
                        post.status === 'published'
                          ? 'bg-green-50 text-green-700'
                          : 'bg-gray-100 text-text-secondary'
                      }`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-text-secondary">
                      {post.published_at ? new Date(post.published_at).toLocaleDateString() : '—'}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link href={`/admin/blog/${post.id}`} className="text-primary hover:underline text-xs">
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
