'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Zap, TrendingDown, Clock, Activity, CloudOff, ShieldAlert, ChevronDown, ArrowUpRight, BatteryCharging, Plus, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

const wastePoints = [
  {
    icon: Zap,
    title: "Hidden Waste",
    description: "Up to 30% of energy consumption is wasted without detection.",
  },
  {
    icon: Activity,
    title: "Invisible Losses",
    description: "Lack of monitoring hides real-time energy losses.",
  },
  {
    icon: TrendingDown,
    title: "Blind Billing",
    description: "Energy bills reflect usage—not inefficiency.",
  },
  {
    icon: ShieldAlert,
    title: "Compliance Risks",
    description: "Regulatory gaps can expose your business to penalties.",
  },
  {
    icon: Clock,
    title: "Daily Inefficiency",
    description: "Outdated systems operate below optimal performance daily.",
  },
  {
    icon: CloudOff,
    title: "Untracked Emissions",
    description: "Carbon emissions often go untracked and unmanaged.",
  }
]

export function RealizationSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [showAll, setShowAll] = useState(false)

  const displayedPoints = showAll ? wastePoints : wastePoints.slice(0, 3)

  return (
    <section className="bg-surface-muted py-20 lg:py-32 overflow-hidden">
      <div className="container-site">
        
        {/* Main Side-by-Side Typography Layout (No bulky box wrapper) */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center lg:items-start">
          
          {/* Left Column: Minimalist Content & Typography Accordion */}
          <div className="flex-1 w-full flex flex-col justify-center">
            
            <div className="inline-flex items-center gap-2 bg-white border border-[#14b8a6]/20 rounded-full px-4 py-1.5 text-sm text-[#0a192f] font-bold shadow-sm w-max mb-6">
              The Realization
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-[#0a192f] leading-[1.1] tracking-tight mb-6">
              Most Buildings Waste<br /> Energy—<span className="text-[#0a192f] underline decoration-accent decoration-[4px] underline-offset-8">Silently.</span>
            </h2>
            
            <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-xl mb-10">
              Because current systems only show you the total bill, finding the root cause of the waste is incredibly tough. 
            </p>

            {/* Minimalist Accordion List */}
            <div className="space-y-0 w-full max-w-lg mb-8">
              {displayedPoints.map((point, idx) => {
                const isOpen = openIndex === idx
                return (
                  <div 
                    key={idx}
                    className="border-b border-slate-200/80 last:border-0"
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between py-5 text-left focus:outline-none group"
                    >
                      <div className="flex items-center gap-4">
                        <point.icon className={cn(
                          "w-5 h-5 transition-colors duration-300",
                          isOpen ? "text-[#14b8a6]" : "text-slate-400 group-hover:text-slate-600"
                        )} />
                        <h4 className={cn(
                          "font-semibold text-lg transition-colors duration-300",
                          isOpen ? "text-[#0a192f]" : "text-slate-600 group-hover:text-[#0a192f]"
                        )}>
                          {point.title}
                        </h4>
                      </div>
                      <ChevronDown className={cn(
                        "w-5 h-5 text-slate-400 transition-transform duration-300 shrink-0",
                        isOpen && "rotate-180"
                      )} />
                    </button>
                    
                    <div 
                      className={cn(
                        "grid transition-all duration-300 ease-in-out",
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="pb-5 pl-9 text-base text-slate-600 leading-relaxed max-w-sm">
                          {point.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            
            {/* "More" Toggle Button */}
            <div>
              <button
                onClick={() => setShowAll(!showAll)}
                className="group inline-flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-[#0a192f] font-semibold px-6 py-2.5 rounded-full transition-all duration-300 shadow-sm"
              >
                {showAll ? (
                  <>Show Less <Minus className="w-4 h-4 text-[#14b8a6]" /></>
                ) : (
                  <>See {wastePoints.length - 3} More <Plus className="w-4 h-4 text-[#14b8a6]" /></>
                )}
              </button>
            </div>
            
          </div>

          {/* Right Column: Constrained Rounded Image Block (Not stretching full height) */}
          <div className="flex-1 w-full relative max-w-[550px] aspect-[4/5] mx-auto lg:mx-0 shrink-0">
            <div className="w-full h-full relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/hero/man-working-environment-project-close-up.jpg"
                alt="Energy Consultant with Tablet"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              
              {/* Subtle tint overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f]/80 via-[#0a192f]/20 to-transparent pointer-events-none" />

              {/* Minimal Glassmorphic Overlays within Image Block Bounds */}
              <div className="absolute bottom-6 left-6 right-6 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                
                {/* Stat 1 */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex-1 min-w-[130px]">
                  <div className="text-white font-bold text-lg flex items-center gap-1 mb-1">
                    30% <ArrowUpRight className="w-4 h-4 text-red-400" />
                  </div>
                  <div className="text-white/70 text-xs font-semibold uppercase tracking-wider">Hidden Waste</div>
                </div>

                {/* Stat 2 */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex-1 min-w-[130px]">
                  <div className="text-white font-bold text-lg mb-1">24/7</div>
                  <div className="text-white/70 text-xs font-semibold uppercase tracking-wider">Monitoring</div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
