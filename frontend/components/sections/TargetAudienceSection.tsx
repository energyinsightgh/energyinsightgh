'use client'

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { ArrowRight, ChevronRight, MoreHorizontal } from 'lucide-react'

const targets = [
  {
    title: "Businesses & Corporations",
    description: "Maximize your bottom line by eliminating operational waste and ensuring seamless regulatory compliance.",
    image: "/images/target_audience/Businesses & Corporations.jpg",
  },
  {
    title: "Industrial Facilities",
    description: "Keep heavy machinery and complex systems running at peak efficiency while lowering immense energy overhead.",
    image: "/images/target_audience/Industrial Facilities.jpg",
  },
  {
    title: "Government & Institutions",
    description: "Lead by example. Achieve sustainability mandates cleanly while optimizing public resource expenditure.",
    image: "/images/target_audience/Government & Institutions.jpg",
  },
  {
    title: "Residential Property Owners",
    description: "Protect your investments by creating energy-efficient, future-proof properties that attract higher value.",
    image: "/images/target_audience/Residential Property Owners.jpg",
  },
  {
    title: "Real Estate Agents & Agencies",
    description: "Differentiate your listings and provide buyers with certified, energy-optimized premium properties.",
    image: "/images/target_audience/Real Estate Agents & Agencies.jpg",
  },
]

export function TargetAudienceSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = React.useState(false)
  const [canScrollRight, setCanScrollRight] = React.useState(true)

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 10)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  React.useEffect(() => {
    const el = scrollRef.current
    if (el) {
      el.addEventListener('scroll', checkScroll)
      // Initial check
      checkScroll()
    }
    return () => el?.removeEventListener('scroll', checkScroll)
  }, [])

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 350, behavior: 'smooth' })
    }
  }

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -350, behavior: 'smooth' })
    }
  }

  return (
    <section id="target-audience" className="section-padding bg-slate-50 overflow-hidden border-b border-divider relative">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-site relative z-10">
        <div className="text-center mx-auto max-w-3xl mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#f5a623]/10 border border-[#f5a623]/20 rounded-full px-5 py-1.5 text-xs text-[#d97706] font-bold mb-5 tracking-wide uppercase">
            Make Them Feel Seen
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Who This Is For?
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Our frameworks are engineered specifically for leaders, owners, and operators who demand operational excellence, serious cost reduction, and sustainable impact. This is designed for <span className="font-bold text-text-primary">you</span>.
          </p>
        </div>

        <div className="relative group max-w-[1400px] mx-auto">
          {/* Scroll Left Button */}
          <div className={cn(
            "absolute left-0 top-1/2 -translate-y-1/2 z-20 -translate-x-4 md:-translate-x-8 transition-all duration-300",
            canScrollLeft ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}>
            <button
              onClick={scrollLeft}
              className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white shadow-xl border border-slate-100 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110 active:scale-95 group/btn"
              aria-label="Scroll left"
            >
              <ChevronRight className="w-8 h-8 rotate-180 transition-transform duration-300 group-hover/btn:-translate-x-1" />
            </button>
          </div>

          {/* Scroll Right Button */}
          <div className={cn(
            "absolute right-0 top-1/2 -translate-y-1/2 z-20 translate-x-4 md:translate-x-8 transition-all duration-300",
            canScrollRight ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}>
            <button
              onClick={scrollRight}
              className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white shadow-xl border border-slate-100 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110 active:scale-95 group/btn"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-8 h-8 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pt-4 -mt-4 scrollbar-hide pr-20 md:pr-40"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {targets.map((target, idx) => (
              <div
                key={idx}
                className="snap-start shrink-0 w-[85vw] sm:w-[320px] md:w-[350px]"
              >
                <div className="relative h-[480px] rounded-[32px] overflow-hidden group/card bg-white shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-500">
                  <Image
                    src={target.image}
                    alt={target.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover/card:scale-105"
                    sizes="(max-width: 768px) 85vw, 350px"
                  />

                  {/* Premium gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-[#0a192f]/60 to-transparent opacity-90 transition-opacity duration-300 group-hover/card:opacity-100" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end">
                    <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                      {target.title}
                    </h3>
                    <p className="text-white/80 leading-relaxed line-clamp-3">
                      {target.description}
                    </p>

                    {/* Decorative element */}
                    <div className="mt-8 flex items-center gap-3">
                      <div className="h-[2px] w-8 bg-[#f5a623]" />
                      <div className="w-[4px] h-[4px] rounded-full bg-[#f5a623]" />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* "And More" End Card / Indicator */}
            <div className="snap-start shrink-0 w-[180px] sm:w-[300px] flex flex-col items-center justify-center relative">
              <div className="px-6 py-3 bg-white border border-slate-200 shadow-md rounded-full flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">..and more</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
