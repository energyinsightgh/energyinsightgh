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

  const renderPoint = (point: typeof wastePoints[0], idx: number) => {
    const isOpen = openIndex === idx
    return (
      <div 
        key={idx}
        className={cn(
          "border-b border-slate-200 transition-colors duration-300",
          idx === wastePoints.length - 1 ? "border-0" : ""
        )}
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
              isOpen ? "text-[#0a192f]" : "text-[#0a192f]/70 group-hover:text-[#0a192f]"
            )}>
              {point.title}
            </h4>
          </div>
          <ChevronDown className={cn(
            "w-5 h-5 text-slate-300 transition-transform duration-300 shrink-0",
            isOpen && "rotate-180"
          )} />
        </button>
        
        <div 
          className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out",
            isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <p className="pb-6 pl-9 text-base text-slate-500 leading-relaxed font-medium">
            {point.description}
          </p>
        </div>
      </div>
    )
  }

  return (
    <section className="bg-white py-12 lg:py-28 overflow-hidden">
      <div className="container-site">
        
        {/* Main Side-by-Side Typography Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-start">
          
          {/* Left Column: Minimalist Content & Typography Accordion */}
          <div className="flex-1 w-full flex flex-col justify-start">
            
            <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-1.5 text-[11px] lg:text-xs text-[#0a192f] font-bold shadow-sm w-max mb-6 tracking-wide">
              The Realization
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-[3.2rem] font-extrabold text-[#0a192f] leading-[1.1] tracking-tight mb-8">
              Most Buildings Waste<br /> Energy—<span className="text-[#0a192f] underline decoration-[#f5a623] decoration-[4px] underline-offset-[8px] lg:underline-offset-[12px]">Silently.</span>
            </h2>
            
            <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-xl mb-12">
              Because current systems only show you the total bill, finding the root cause of the waste is incredibly tough. 
            </p>

            {/* Minimalist Accordion List with Borders strictly between items */}
            <div className="space-y-0 w-full max-w-lg mb-8">
              {wastePoints.slice(0, 3).map((point, idx) => renderPoint(point, idx))}
              
              <div 
                className={cn(
                  "transition-all duration-500 ease-in-out overflow-hidden origin-top",
                  showAll ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
                )}
              >
                {wastePoints.slice(3).map((point, idx) => renderPoint(point, idx + 3))}
              </div>
            </div>
            
            {/* "More" Toggle Button */}
            <div className="pt-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setShowAll(!showAll)}
                className="group inline-flex items-center justify-center w-full sm:w-auto gap-2 sm:gap-3 bg-white border border-slate-200 hover:border-slate-300 text-[#0a192f] font-bold text-sm sm:text-[15px] px-6 py-3 sm:py-2.5 rounded-full shadow-sm transition-all duration-300 active:scale-95"
              >
                {showAll ? (
                  <>Show Less <Minus className="w-4 h-4 text-[#14b8a6]" /></>
                ) : (
                  <>See {wastePoints.length - 3} More <Plus className="w-4 h-4 text-[#14b8a6]" /></>
                )}
              </button>
            </div>
            
          </div>

          {/* Right Column: Constrained Rounded Image Block, Aligned precisely with 2nd line */}
          <div className="flex-1 w-full relative lg:mt-[112px]">
            <div className="w-full h-[450px] relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100">
              <Image
                src="/images/hero/man-working-environment-project-close-up.jpg"
                alt="Energy Consultant with Tablet"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              
              {/* Subtle tint overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Minimal Glassmorphic Overlays within Image Block Bounds */}
              <div className="absolute bottom-6 left-6 right-6 flex gap-4">
                
                {/* Stat 1 */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[1.5rem] p-5 flex-1 shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-bold text-xl tracking-tight">30%</span>
                    <ArrowUpRight className="w-4 h-4 text-[#f5a623]" />
                  </div>
                  <div className="text-white/60 text-[10px] font-bold uppercase tracking-[0.1em]">Waste</div>
                </div>

                {/* Stat 2 */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[1.5rem] p-5 flex-1 shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-bold text-xl tracking-tight">24/7</span>
                  </div>
                  <div className="text-white/60 text-[10px] font-bold uppercase tracking-[0.1em]">Monitor</div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
