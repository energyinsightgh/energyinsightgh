'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  ArrowRight, 
  Activity, 
  Building2, 
  BarChart2, 
  Search, 
  ShieldCheck, 
  FileSearch, 
  TrendingUp, 
  GraduationCap,
  Zap
} from 'lucide-react'
import { cn } from '@/lib/utils'

const slideImages = [
  {
    src: '/images/hero/image1.jpg',
    title: 'Energy Insight Analytics'
  },
  {
    src: '/images/hero/man-working-environment-project-close-up.jpg',
    title: 'Commercial Efficiency Audits'
  },
  {
    src: '/images/hero/turbine-green-energy-electricity-technology-concept.jpg',
    title: 'Renewable Power Strategies'
  },
  {
    src: '/images/hero/wind-power-with-affordable-clean-energy-environment-banner.jpg',
    title: 'Sustainable Growth'
  }
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

const floatingStats = [
  { value: 'Energy', text: 'Audits', type: 'warn' },
  { value: 'Carbon', text: 'Accounting', type: 'success' },
  { value: 'Environmental', text: 'Compliance', type: 'info' }
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [statIndex, setStatIndex] = useState(0)

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slideImages.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slideImages.length - 1 : prev - 1))

  useEffect(() => {
    const slideTimer = setInterval(() => {
      nextSlide()
    }, 5000)
    
    // Cycle stats every 6 seconds to match the bounce animation duration
    const statTimer = setInterval(() => {
      setStatIndex((prev) => (prev + 1) % floatingStats.length)
    }, 6000)

    return () => {
      clearInterval(slideTimer)
      clearInterval(statTimer)
    }
  }, [])

  // Duplicate items for the marquee to ensure a continuous scrolling effect
  const marqueeItems = [...trustBadges, ...trustBadges, ...trustBadges]

  return (
    <section className="bg-white flex flex-col pt-1 pb-4 md:pt-2 md:pb-6 overflow-hidden">
      
      {/* Container for the Hero Card (Unconstrained Width) */}
      <div className="w-full mx-auto px-0 md:px-4 mb-6 md:mb-12">
        <div className="relative w-full min-h-[85vh] rounded-none md:rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-center bg-[#0a192f]">
          
          {/* Background Slider */}
          {slideImages.map((slide, index) => (
            <div
              key={slide.src}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000 ease-in-out",
                index === currentSlide ? "opacity-100" : "opacity-0"
              )}
            >
              <Image
                src={slide.src}
                alt="Energy insight background"
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}

          {/* Overlay - Evenly darkening to make centered text legible anywhere */}
          <div className="absolute inset-0 bg-black/30" />
          
          {/* Subtle Animated Accents */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent animate-[pulse_3s_ease-in-out_infinite]" />
          </div>

          {/* Centered Container taking exactly 60% of space on large screens */}
          <div className="relative z-10 w-full lg:w-[60%] mx-auto h-full flex flex-col justify-center items-center px-6 py-16 md:px-12 text-center">
            
            <div className="space-y-6 md:space-y-8 flex flex-col items-center relative w-full">
              <div className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 text-sm text-white font-medium shadow-sm w-max">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                Energy Insight
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-extrabold text-white leading-[1.1] tracking-tight text-shadow-md">
                “You’re Paying for Energy <span className="text-accent underline decoration-accent/50 underline-offset-8">
                   You Don’t Use.”
                </span>
              </h1>

              <p className="text-lg md:text-xl text-white/90 leading-relaxed font-medium">
                We identify where you’re losing energy, measure your carbon impact, and ensure you meet environmental standards—so you save money and stay compliant without the guesswork.
              </p>

              <div className="pt-2 flex flex-col items-center">
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-[#0a192f] font-bold px-6 py-3 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-md text-sm md:text-base"
                >
                  See Where You’re Losing Energy
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <div className="mt-6 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2.5 max-w-md">
                  <p className="text-xs md:text-sm text-white/90 font-medium leading-relaxed flex items-center gap-3 text-left">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    Trusted by homeowners, engineers, and commercial facilities to reduce energy costs.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Top Right Floating Stat Bubble */}
          <div className="absolute top-6 right-6 lg:top-12 lg:right-12 z-20 pointer-events-none hidden sm:block">
            {floatingStats.map((stat, idx) => (
              <div 
                key={idx}
                className={cn(
                  "absolute top-0 right-0 bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-3 shadow-2xl animate-[float_6s_ease-in-out_infinite] transition-opacity duration-700 w-max",
                  idx === statIndex ? "opacity-100" : "opacity-0"
                )}
              >
                <div className="flex items-center gap-3">
                  {stat.type === 'warn' && <Activity className="w-5 h-5 text-red-400" />}
                  {stat.type === 'success' && <TrendingUp className="w-5 h-5 text-emerald-400" />}
                  {stat.type === 'info' && <Search className="w-5 h-5 text-blue-400" />}
                  <p className="text-white text-sm font-medium">
                    <span className={cn("font-bold", stat.type === 'warn' ? "text-red-400" : stat.type === 'success' ? "text-emerald-400" : "text-blue-400")}>{stat.value}</span> {stat.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Left Slider Navigation Controls */}
          <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-20 flex flex-col md:flex-row md:items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-[1rem] border border-white/10">
            <div className="text-white font-medium text-xs flex items-center gap-2">
              <span className="text-accent font-bold">0{currentSlide + 1}</span> 
              <span className="text-white/50">/</span> 
              <span className="text-white/50">0{slideImages.length}</span>
              <span className="hidden md:inline-block w-6 h-[1px] bg-white/30 mx-1.5" />
              <span className="text-primary-50 tracking-wide">{slideImages[currentSlide].title}</span>
            </div>
            
            <div className="flex items-center gap-1.5">
              <button 
                onClick={prevSlide}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Previous Slide"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </button>
              <button 
                onClick={nextSlide}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Next Slide"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Marquee Section Right Below the Hero Card */}
      <div className="w-full bg-surface-muted py-6 md:py-8 border-y border-gray-100 flex flex-col justify-center overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-surface-muted to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-surface-muted to-transparent z-10 pointer-events-none" />
        
        <p className="text-center text-xs font-bold text-text-muted uppercase tracking-widest mb-4 z-20 relative">
          The Insight Promise
        </p>

        <div className="flex overflow-hidden relative w-full group">
          <div className="flex animate-marquee group-hover:paused w-max items-center gap-6 px-3">
            {marqueeItems.map((badge, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl px-6 py-4 shadow-sm min-w-[320px] md:min-w-[380px]"
              >
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-opacity-10 shadow-sm", badge.bg, "bg-opacity-10 text-current")}>
                  <badge.icon className={cn("w-6 h-6", badge.color)} />
                </div>
                <div className="flex-1">
                  <h4 className="text-text-primary font-bold text-[15px] leading-tight mb-1">{badge.title}</h4>
                  <p className="text-text-secondary text-[13px] leading-tight">{badge.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  )
}
