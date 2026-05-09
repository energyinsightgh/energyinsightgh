import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="relative">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-accent rounded-full animate-ping" />
        </div>
      </div>
      <p className="text-text-secondary font-medium tracking-wide animate-pulse text-sm">
        Loading...
      </p>
    </div>
  )
}
