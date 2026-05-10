'use client'

import { useState, useEffect } from 'react'
import { subscribeNewsletter } from '@/app/(public)/newsletter-action'
import { ArrowRight, Mail, Sparkles } from 'lucide-react'

export function BlogWaitlistWrapper({ children }: { children: React.ReactNode }) {
  const [waitlistEnabled, setWaitlistEnabled] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const saved = localStorage.getItem('ei_settings')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed.waitlistEnabled) {
          setWaitlistEnabled(true)
        }
      } catch (e) {}
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Using the same action since it sends email to energyinsightgh@gmail.com and saves to DB
    const res = await subscribeNewsletter(email, 'blog_waitlist')
    
    setIsSubmitting(false)
    if (res.success) {
      setIsSuccess(true)
      setEmail('')
      setTimeout(() => setIsSuccess(false), 5000)
    } else {
      alert(res.error || 'Failed to join waitlist')
    }
  }

  if (!isMounted) return <div className="min-h-screen" />

  if (!waitlistEnabled) {
    return <>{children}</>
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-primary-100 p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
          <Sparkles className="w-4 h-4" />
          <span>Coming Soon</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-extrabold text-primary tracking-tight">
          Energy Insights <span className="text-accent">Blog</span>
        </h1>
        
        <p className="text-xl text-text-secondary max-w-xl mx-auto leading-relaxed">
          We are preparing a collection of expert articles, case studies, and technical guides. Join the waitlist to be notified when we launch!
        </p>

        <div className="bg-white p-8 rounded-2xl shadow-xl shadow-primary/10 border border-primary/10 max-w-md mx-auto mt-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-5 h-5" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                disabled={isSubmitting || isSuccess}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border border-slate-200 text-text-primary placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all disabled:opacity-70"
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting || isSuccess}
              className="w-full bg-primary hover:bg-primary-600 text-white px-6 py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : isSuccess ? (
                "You're on the list! ✅"
              ) : (
                <>Join the Waitlist <ArrowRight className="w-5 h-5" /></>
              )}
            </button>
          </form>
          <p className="text-xs text-text-muted mt-4">
            We promise not to spam. You can unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  )
}
