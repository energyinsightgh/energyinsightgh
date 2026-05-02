import type { Metadata } from 'next'
import { LoginForm } from './LoginForm'
import { Zap } from 'lucide-react'

export const metadata: Metadata = { title: 'Admin Login — energyinsightgh' }

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-surface-muted flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 font-bold text-primary text-2xl mb-2">
            <Zap className="w-7 h-7 text-accent fill-accent" />
            energyinsight<span className="text-accent">gh</span>
          </div>
          <p className="text-text-secondary text-sm">Admin Portal</p>
        </div>
        <div className="card p-8">
          <h1 className="text-xl font-bold text-text-primary mb-6 text-center">Sign In</h1>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
