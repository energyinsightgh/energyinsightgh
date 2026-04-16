'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ArrowRight, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call for now; will connect to Supabase later.
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setEmail('')
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000)
    }, 1000)
  }

  return (
    <section id="newsletter" className="relative pb-16 lg:pb-24 pt-4 lg:pt-8 bg-white overflow-hidden">
      <div className="container-site relative z-10 max-w-4xl mx-auto">
        {/* Rectangular Decent Card Feature */}
        <div className="bg-slate-50 border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[1.1rem] px-6 py-12 md:px-12 md:py-16 text-center flex flex-col items-center relative overflow-hidden">
          
          {/* Subtle Background Accent purely for aesthetics */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#f5a623]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#14b8a6]/5 rounded-full blur-3xl pointer-events-none" />

          {/* Gold Newsletter tag */}
          <div className="text-[#d97706] font-bold mb-4 tracking-[0.2em] uppercase text-sm relative z-10">
            Newsletter
          </div>
          
          {/* Captivating Hero Text with Mangolia script */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary mb-4 leading-normal tracking-wide relative z-10" style={{ fontFamily: "'Magnolia Script', 'Dancing Script', cursive" }}>
            Power up your Inbox.
          </h2>
          
          <p className="text-base md:text-lg text-text-secondary max-w-lg mx-auto leading-relaxed relative z-10">
            Join visionary leaders receiving curated strategies and actionable efficiency tips directly from our experts.
          </p>

          <div className="w-full max-w-sm mx-auto mt-8 relative z-10">
            <form onSubmit={handleSubmit} className="relative">
              {/* Email Icon */}
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-5 h-5" />
              </div>
              
              {/* Input */}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address..."
                required
                disabled={isSubmitting || isSuccess}
                className="w-full pl-12 pr-32 py-3 md:py-4 rounded-full bg-white border border-slate-200 text-text-primary placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#14b8a6]/20 focus:border-[#14b8a6] transition-all disabled:opacity-70 shadow-sm text-sm sm:text-base h-[54px] md:h-[60px]"
              />
              
              {/* Inside Button */}
              <div className="absolute inset-y-1.5 right-1.5 flex items-center">
                <button
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  className={cn(
                    "px-4 md:px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 flex items-center justify-center h-full min-w-[100px] md:min-w-[110px]",
                    isSuccess 
                      ? "bg-primary text-white" 
                      : "bg-primary hover:bg-primary-600 text-white active:scale-95 disabled:opacity-70 disabled:active:scale-100"
                  )}
                >
                  {isSubmitting ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : isSuccess ? (
                    "Joined ✅"
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </div>
            </form>
          </div>
          
          <p className="text-[11px] text-slate-400 mt-5 font-medium relative z-10">
            We respect your privacy. No spam, ever.
          </p>
        </div>
      </div>
    </section>
  )
}
