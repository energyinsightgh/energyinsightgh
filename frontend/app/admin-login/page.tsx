import type { Metadata } from 'next'
import { LoginForm } from './LoginForm'
import Image from 'next/image'

export const metadata: Metadata = { title: 'Admin Login — energyinsightgh' }

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-surface-muted flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <Image
              src="/energyinsightgh-logo.png"
              alt="Energy Insight GH Logo"
              width={180}
              height={72}
              className="h-16 w-auto object-contain"
              priority
            />
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
