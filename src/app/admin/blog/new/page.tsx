import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { createPostAction } from '../actions'

export default function NewBlogPostPage() {
  return (
    <div className="max-w-3xl">
      <Link href="/admin/blog" className="inline-flex items-center gap-2 text-text-secondary hover:text-primary text-sm mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Posts
      </Link>
      <h1 className="text-2xl font-bold text-text-primary mb-8">New Blog Post</h1>
      <form action={createPostAction} className="card p-8 space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-text-primary mb-1.5">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title" name="title" type="text" required
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter post title"
          />
          <p className="text-xs text-text-muted mt-1">The URL slug will be auto-generated from the title.</p>
        </div>
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-text-primary mb-1.5">Author</label>
          <input
            id="author" name="author" type="text"
            defaultValue="energyinsightgh"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium text-text-primary mb-1.5">Excerpt</label>
          <textarea
            id="excerpt" name="excerpt" rows={2} maxLength={200}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            placeholder="Short summary (max 200 characters)"
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-text-primary mb-1.5">Content</label>
          <textarea
            id="content" name="content" rows={14}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-y font-mono"
            placeholder="Write your post content here (Markdown supported)"
          />
        </div>
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-text-primary mb-1.5">Tags</label>
          <input
            id="tags" name="tags" type="text"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="energy audit, solar, Ghana (comma separated)"
          />
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-text-primary mb-1.5">Status</label>
          <select
            id="status" name="status"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" className="btn-primary text-sm py-2">Save Post</button>
          <Link href="/admin/blog" className="btn-outline text-sm py-2">Cancel</Link>
        </div>
      </form>
    </div>
  )
}
