'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCcw } from 'lucide-react'

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Admin Dashboard Error:', error)
  }, [error])

  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center bg-white rounded-2xl border border-red-100 shadow-sm">
      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
        <AlertTriangle className="w-8 h-8 text-red-500" />
      </div>
      <h2 className="text-2xl font-bold text-text-primary mb-2">Something went wrong</h2>
      <p className="text-text-secondary mb-8 max-w-md mx-auto">
        There was an error loading this section. This is often caused by missing database tables or connection issues.
        <br />
        <code className="block mt-4 p-2 bg-gray-50 rounded text-xs text-red-600 font-mono break-all">
          {error.message || 'Unknown Error'}
        </code>
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="btn-primary flex items-center gap-2"
        >
          <RefreshCcw className="w-4 h-4" /> Try again
        </button>
        <button
          onClick={() => window.location.reload()}
          className="btn-outline"
        >
          Reload Page
        </button>
      </div>
    </div>
  )
}
