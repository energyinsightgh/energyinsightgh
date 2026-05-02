import { createClient } from '@/lib/supabase/server'
import { Category } from '@/types'
import { formatDate } from '@/lib/utils'
import { Plus, Tags, Trash2 } from 'lucide-react'
import Link from 'next/link'

export const revalidate = 0

export default async function AdminCategoriesPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return <div>Unauthorized</div>

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true })

  if (error) throw new Error(`Database Error (categories): ${error.message}`)

  const categories = (data as Category[]) || []

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text-primary mb-1">Categories</h1>
          <p className="text-sm text-text-secondary">Manage blog post categories.</p>
        </div>
        <Link href="/admin/categories/create" className="btn-primary py-2 px-4 text-sm">
          <Plus className="w-4 h-4 mr-1" /> Add Category
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-sm font-semibold text-text-secondary uppercase tracking-wider">
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Slug</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {categories.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-text-muted">
                    <Tags className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    No categories found. Create your first category.
                  </td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-text-primary">
                        {category.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary">
                      {category.slug}
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary">
                      {category.description || '-'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {/* We could add delete/edit buttons here */}
                      <button className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
