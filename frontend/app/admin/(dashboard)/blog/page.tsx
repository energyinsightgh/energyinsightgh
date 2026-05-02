import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { PlusCircle, Edit3, Trash2, Tag, LayoutGrid } from 'lucide-react'
import { deletePostAction } from './actions'
import DeleteButton from './DeleteButton'
import type { BlogPost, Category } from '@/types'

export const revalidate = 0

export default async function AdminBlogPage() {
  const supabase = await createClient()

  // Ensure user is authenticated
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return <div>Unauthorized</div>

  // Fetch blog posts and categories in parallel
  const [postsRes, categoriesRes] = await Promise.all([
    (supabase.from('blog_posts') as any)
      .select('id, title, slug, excerpt, tags, category_id, status, published_at, author, created_at')
      .order('created_at', { ascending: false }),
    supabase.from('categories').select('id, name')
  ])

  if (postsRes.error) throw new Error(`Database Error (blog_posts): ${postsRes.error.message}`)
  if (categoriesRes.error) throw new Error(`Database Error (categories): ${categoriesRes.error.message}`)

  const posts = (postsRes.data || []) as BlogPost[]
  const categories = (categoriesRes.data || []) as Category[]
  
  // Create a map for quick category lookup
  const categoryMap = new Map(categories.map(c => [c.id, c.name]))

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-text-primary mb-2">Blog Posts</h1>
          <p className="text-text-secondary">Draft, edit, and publish articles.</p>
        </div>
        <Link href="/admin/blog/new" className="btn-primary">
          <PlusCircle className="w-5 h-5 mr-2" /> Write Article
        </Link>
      </div>

      {!posts || posts.length === 0 ? (
        <div className="card p-16 text-center border-dashed border-2 border-slate-300">
          <div className="bg-primary/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <LayoutGrid className="w-8 h-8 text-primary opacity-60" />
          </div>
          <p className="text-lg font-bold text-text-primary mb-2">No articles found</p>
          <p className="text-text-secondary mb-6 max-w-md mx-auto">You haven&apos;t written any blog posts yet. Start sharing your energy insights.</p>
          <Link href="/admin/blog/new" className="btn-primary text-sm">
            <PlusCircle className="w-4 h-4 mr-2" /> Create First Post
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post, index) => {
            const categoryName = post.category_id ? categoryMap.get(post.category_id) : 'Uncategorized'
            
            return (
              <div 
                key={post.id} 
                className="card p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between group hover:border-primary-300 transition-all"
              >
                {/* Left side: Number, Title, Snippet, Meta */}
                <div className="flex gap-6 items-start flex-1 min-w-0">
                  <div className="hidden sm:flex shrink-0 w-10 h-10 rounded-full bg-slate-100 text-slate-500 font-bold items-center justify-center text-lg">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-text-primary truncate" title={post.title}>
                        {post.title}
                      </h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider shrink-0 ${
                        post.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {post.status}
                      </span>
                    </div>
                    
                    <p className="text-text-secondary text-sm mb-4 line-clamp-2 leading-relaxed">
                      {post.excerpt || 'No excerpt provided.'}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs">
                      {/* Category */}
                      <div className="flex items-center gap-1.5 font-medium text-primary-600 bg-primary-50 px-2.5 py-1 rounded-md border border-primary-100">
                        <LayoutGrid className="w-3.5 h-3.5" />
                        {categoryName}
                      </div>
                      
                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex items-center gap-2">
                          <Tag className="w-3.5 h-3.5 text-slate-400" />
                          <div className="flex gap-1.5">
                            {post.tags.slice(0, 3).map(tag => (
                              <span key={tag} className="text-slate-500 bg-slate-100 px-2 py-0.5 rounded text-[11px] font-medium border border-slate-200">
                                {tag}
                              </span>
                            ))}
                            {post.tags.length > 3 && (
                              <span className="text-slate-400 text-[11px] font-medium">+{post.tags.length - 3}</span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right side: Actions */}
                <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-100">
                  <Link 
                    href={`/admin/blog/${post.id}`} 
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg font-bold text-sm transition-colors"
                  >
                    <Edit3 className="w-4 h-4" /> Write / Edit
                  </Link>
                  <form action={deletePostAction}>
                    <input type="hidden" name="id" value={post.id} />
                    <DeleteButton id={post.id} />
                  </form>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
