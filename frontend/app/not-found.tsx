import Link from 'next/link'
import { ArrowRight, Zap } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface-muted flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center gap-2 font-bold text-primary text-2xl mb-8">
          <Zap className="w-7 h-7 text-accent fill-accent" />
          energyinsight<span className="text-accent">gh</span>
        </div>
        <h1 className="text-7xl font-bold text-primary mb-4">404</h1>
        <p className="text-xl font-semibold text-text-primary mb-3">Page Not Found</p>
        <p className="text-text-secondary mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="btn-primary">
          Back to Home <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
