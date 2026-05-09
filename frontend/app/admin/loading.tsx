import { Loader2 } from 'lucide-react'

export default function AdminLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full">
      <Loader2 className="w-10 h-10 animate-spin text-primary" />
      <p className="mt-4 text-sm font-medium text-gray-500 animate-pulse">Loading dashboard...</p>
    </div>
  )
}
