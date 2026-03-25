import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { PlusCircle } from 'lucide-react'
import { deletePostAction } from './actions'

export default async function AdminBlogPage() {
  const supabase = await createClient()
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('id, title, slug, status, published_at, author, created_at')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-text-primary">Blog Posts</h1>
        <Link href="/admin/blog/new" className="btn-primary text-sm py-2">
          <PlusCircle className="w-4 h-4" /> New Post
        </Link>
      </div>

      {!posts || posts.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-text-secondary mb-4">No blog posts yet.</p>
          <Link href="/admin/blog/new" className="btn-primary text-sm py-2">
            <PlusCircle className="w-4 h-4" /> Create your first post
          </Link>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-surface-muted border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">Title</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">Status</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">Author</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">Date</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-surface-muted/50">
                  <td className="px-4 py-3 font-medium text-text-primary max-w-xs truncate">{post.title}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 text-xs rounded-full font-medium ${
                      post.status === 'published'
                        ? 'bg-green-50 text-green-700'
                        : 'bg-gray-100 text-text-secondary'
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-text-secondary">{post.author}</td>
                  <td className="px-4 py-3 text-text-secondary">
                    {post.published_at
                      ? new Date(post.published_at).toLocaleDateString()
                      : new Date(post.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link href={`/admin/blog/${post.id}`} className="text-primary hover:underline text-xs font-medium">
                        Edit
                      </Link>
                      <form action={deletePostAction}>
                        <input type="hidden" name="id" value={post.id} />
                        <button
                          type="submit"
                          className="text-red-500 hover:underline text-xs font-medium"
                          onClick={(e) => {
                            if (!confirm('Delete this post? This cannot be undone.')) e.preventDefault()
                          }}
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
