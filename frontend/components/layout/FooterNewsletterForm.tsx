'use client'

import { useState } from 'react'
import { subscribeNewsletter } from '@/app/(public)/newsletter-action'

export function FooterNewsletterForm() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const res = await subscribeNewsletter(email)
    
    setIsSubmitting(false)
    if (res.success) {
      alert('Congratulations and good news! You have successfully subscribed to our newsletter.')
      setEmail('')
    } else {
      alert(res.error || 'Failed to subscribe')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md bg-transparent rounded overflow-hidden">
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email"
        className="flex-1 px-4 py-3 outline-none text-text-primary placeholder:text-slate-500 bg-transparent text-sm md:text-base border border-slate-400 rounded-l focus:border-accent focus:ring-1 focus:ring-accent transition-all"
        required
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-accent text-white px-6 md:px-8 py-3 font-semibold text-sm hover:bg-accent/90 transition-colors uppercase tracking-wide rounded-r border border-accent disabled:opacity-50"
      >
        {isSubmitting ? 'Subscribing...' : 'Subscribe'}
      </button>
    </form>
  )
}
