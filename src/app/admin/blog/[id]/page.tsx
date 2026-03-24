import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { updatePostAction } from '../actions'
import type { BlogPost } from '@/types'

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const { data: post } = await supabase.from('blog_posts').select('*').eq('id', id).single()

  if (!post) notFound()
  const p = post as BlogPost

  return (
    <div className="max-w-3xl">
      <Link href="/admin/blog" className="inline-flex items-center gap-2 text-text-secondary hover:text-primary text-sm mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Posts
      </Link>
      <h1 className="text-2xl font-bold text-text-primary mb-8">Edit Post</h1>
      <form action={updatePostAction} className="card p-8 space-y-6">
        <input type="hidden" name="id" value={p.id} />
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-text-primary mb-1.5">Title <span className="text-red-500">*</span></label>
          <input id="title" name="title" type="text" required defaultValue={p.title}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-text-primary mb-1.5">Author</label>
          <input id="author" name="author" type="text" defaultValue={p.author}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium text-text-primary mb-1.5">Excerpt</label>
          <textarea id="excerpt" name="excerpt" rows={2} maxLength={200} defaultValue={p.excerpt ?? ''}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-text-primary mb-1.5">Content</label>
          <textarea id="content" name="content" rows={14} defaultValue={p.content ?? ''}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-y font-mono" />
        </div>
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-text-primary mb-1.5">Tags</label>
          <input id="tags" name="tags" type="text" defaultValue={p.tags?.join(', ') ?? ''}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="energy audit, solar, Ghana (comma separated)" />
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-text-primary mb-1.5">Status</label>
          <select id="status" name="status" defaultValue={p.status}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" className="btn-primary text-sm py-2">Save Changes</button>
          <Link href="/admin/blog" className="btn-outline text-sm py-2">Cancel</Link>
        </div>
      </form>
    </div>
  )
}
