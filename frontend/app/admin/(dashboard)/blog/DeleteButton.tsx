'use client'

import { Trash2 } from 'lucide-react'

export default function DeleteButton({ id }: { id: string }) {
  return (
    <button
      type="submit"
      className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg font-bold text-sm transition-colors"
      onClick={(e) => {
        if (!confirm('Are you sure you want to delete this article? This action cannot be undone.')) {
          e.preventDefault()
        }
      }}
    >
      <Trash2 className="w-4 h-4" /> Delete
    </button>
  )
}
