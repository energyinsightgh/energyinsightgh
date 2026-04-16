'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  ArrowRight, 
  Activity, 
  Building2, 
  BarChart2, 
  ShieldCheck, 
  FileSearch
} from 'lucide-react'
import { cn } from '@/lib/utils'

const heroSlides = [
  {
    src: '/images/hero/energy-audit-1.jpg',
    title: 'Energy Audit',
  },
  {
    src: '/images/hero/carbon-accounting.jpg',
    title: 'Carbon Accounting',
  },
  {
    src: '/images/hero/environmental-assessment.jpg',
    title: 'Environmental Assessment',
  },
  {
    src: '/images/hero/lighting-design-opt.jpg',
    title: 'Pre-Construction Lighting',
  },
  {
    src: '/images/hero/consulting-training.jpg',
    title: 'Consulting & Training',
  },
]

const trustBadges = [
  {
    icon: FileSearch,
    title: "Comprehensive Energy Audits",
    subtitle: "Identify opportunities to reduce consumption and costs.",
    color: "text-blue-400",
    bg: "bg-blue-400"
  },
  {
    icon: Activity,
    title: "Carbon Accounting",
    subtitle: "Measure, track, and reduce your greenhouse gas emissions.",
    color: "text-emerald-400",
    bg: "bg-emerald-400"
  },
  {
    icon: ShieldCheck,
    title: "Environmental Management",
    subtitle: "Navigate complex regulations and ensure ongoing compliance.",
    color: "text-purple-400",
    bg: "bg-purple-400"
  },
  {
    icon: BarChart2,
    title: "Impact Assessments (EIA)",
    subtitle: "Expert evaluation of environmental impacts for your projects.",
    color: "text-amber-400",
    bg: "bg-amber-400"
  },
  {
    icon: Building2,
    title: "Strategic Assessments (SEA)",
    subtitle: "Customized solutions aligned with sustainability practices.",
    color: "text-indigo-400",
    bg: "bg-indigo-400"
  }
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(nextSlide, 4000)
    return () => clearInterval(timer)
  }, [nextSlide])

  // Duplicate items for the marquee
  const marqueeItems = [...trustBadges, ...trustBadges, ...trustBadges]

  return (
    <section className="bg-white flex flex-col overflow-hidden">
      
      {/* Main Hero Area */}
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 pt-16 pb-12 md:pt-20 md:pb-16 hero-custom-pt lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 xl:gap-4 items-start">
          
          {/* Left Column — Text Content */}
          <div className="space-y-7 pt-2 lg:pt-4">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-[#14b8a6]/10 border border-[#14b8a6]/20 rounded-full px-4 py-1.5 text-sm font-medium text-[#0f766e]">
              <span className="w-2 h-2 bg-[#14b8a6] rounded-full animate-pulse" />
              Energy Insight
            </div>

            {/* Main Heading */}
            <h1 className="text-[2.75rem] md:text-[3.25rem] lg:text-[3.5rem] xl:text-[4.25rem] font-extrabold text-[#0a192f] leading-[1.08] tracking-tight">
              Smarter Energy
              <br />
              for your{' '}
              <span className="text-[#14b8a6] underline decoration-[#14b8a6]/30 underline-offset-8">
                Business
              </span>
            </h1>

            {/* Description */}
            <p className="text-base md:text-[1.1rem] text-text-secondary leading-[1.7] max-w-[420px]">
              We identify where you&apos;re losing energy, measure your carbon impact, and ensure you meet environmental standards—saving money without the guesswork.
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center gap-3 pt-1">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-600 text-white font-bold px-7 py-3.5 rounded-xl transition-all duration-300 shadow-md hover:-translate-y-0.5 text-sm"
              >
                Book a call with Us Now!!
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>


          </div>

          {/* Right Column — App Window Frame (xas1.png style) */}
          <div className="w-full lg:pt-0 relative">
            <div className="relative py-4 lg:py-6">
              
              {/* Main App Window Frame */}
              <div className="relative bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden">
                
                {/* Window Title Bar with 3 dots */}
                <div className="flex items-center gap-2 px-5 py-3.5 bg-slate-50/80 border-b border-slate-100">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                  <div className="ml-auto flex items-center gap-2">
                    <span className="text-[10px] text-slate-400 font-medium tracking-wide">energyinsightgh.com</span>
                  </div>
                </div>

                {/* Window Content — Image Slider */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  {heroSlides.map((slide, index) => (
                    <div
                      key={slide.src}
                      className={cn(
                        "absolute inset-0 transition-all duration-700 ease-in-out",
                        index === currentSlide 
                          ? "opacity-100 scale-100" 
                          : "opacity-0 scale-[1.02]"
                      )}
                    >
                      <Image
                        src={slide.src}
                        alt={slide.title}
                        fill
                        className="object-cover"
                        priority={index === 0}
                        sizes="(max-width: 768px) 90vw, (max-width: 1024px) 50vw, 600px"
                      />
                    </div>
                  ))}

                  {/* Slide counter */}
                  <div className="absolute bottom-4 right-6 z-20 flex items-center gap-1.5">
                    {heroSlides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={cn(
                          "rounded-full transition-all duration-300",
                          idx === currentSlide
                            ? "w-6 h-2 bg-white"
                            : "w-2 h-2 bg-white/40 hover:bg-white/60"
                        )}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Badge — Top Right */}
              <div className="absolute -top-3 -right-3 lg:-top-4 lg:-right-6 z-20 bg-white rounded-xl shadow-lg border border-slate-100 px-4 py-3 hidden sm:flex items-center gap-3 animate-[float_6s_ease-in-out_infinite]">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-[#0a192f] text-sm font-extrabold">ISO Compliant</p>
                  <p className="text-slate-400 text-[11px]">Certified audits</p>
                </div>
              </div>

              {/* Floating Badge — Bottom Left */}
              <div className="absolute -bottom-3 -left-3 lg:-bottom-5 lg:-left-6 z-20 bg-white rounded-xl shadow-lg border border-slate-100 px-4 py-3 hidden sm:flex items-center gap-3 animate-[float_6s_ease-in-out_infinite_1s]">
                <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                  <BarChart2 className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-[#0a192f] text-sm font-extrabold">30% avg savings</p>
                  <p className="text-slate-400 text-[11px]">On energy costs</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Marquee Section */}
      <div className="w-full bg-surface-muted py-6 md:py-8 border-y border-gray-100 flex flex-col justify-center overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-surface-muted to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-surface-muted to-transparent z-10 pointer-events-none" />
        
        <p className="text-center text-xs font-bold text-text-muted uppercase tracking-widest mb-4 z-20 relative">
          The Insight Promise
        </p>

        <div className="flex overflow-hidden relative w-full group">
          <div className="flex animate-marquee group-hover:paused w-max items-center gap-6 px-3">
            {marqueeItems.map((badge, idx) => {
              const Icon = badge.icon
              return (
                <div 
                  key={idx}
                  className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl px-6 py-4 shadow-sm min-w-[320px] md:min-w-[380px]"
                >
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-opacity-10 shadow-sm", badge.bg, "bg-opacity-10 text-current")}>
                    <Icon className={cn("w-6 h-6", badge.color)} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-text-primary font-bold text-[15px] leading-tight mb-1">{badge.title}</h4>
                    <p className="text-text-secondary text-[13px] leading-tight">{badge.subtitle}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

    </section>
  )
}
