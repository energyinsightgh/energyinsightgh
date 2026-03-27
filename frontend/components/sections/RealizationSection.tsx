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
    <section className="bg-white py-20 lg:py-28 overflow-hidden">
      <div className="container-site">
        
        {/* Main Side-by-Side Typography Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
          
          {/* Left Column: Minimalist Content & Typography Accordion */}
          <div className="flex-1 w-full flex flex-col justify-start">
            
            <div className="inline-flex items-center gap-2 bg-white border border-slate-100 rounded-full px-5 py-2 text-[13px] text-[#0a192f] font-bold shadow-sm w-max mb-8 tracking-wide">
              The Realization
            </div>
            
            <h2 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.8rem] font-bold text-[#0a192f] leading-[1.05] tracking-tight mb-10">
              Most Buildings Waste<br /> Energy—<span className="text-[#0a192f] underline decoration-[#f5a623] decoration-[5px] underline-offset-[14px]">Silently.</span>
            </h2>
            
            <p className="text-[1.1rem] text-slate-500 font-medium leading-relaxed max-w-xl mb-14">
              Because current systems only show you the total bill, finding the root cause of the waste is incredibly tough. 
            </p>

            {/* Minimalist Accordion List */}
            <div className="space-y-0 w-full max-w-lg mb-10">
              {displayedPoints.map((point, idx) => {
                const isOpen = openIndex === idx
                return (
                  <div 
                    key={idx}
                    className="border-b border-slate-100 last:border-0"
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between py-6 text-left focus:outline-none group"
                    >
                      <div className="flex items-center gap-5">
                        <point.icon className={cn(
                          "w-5 h-5 transition-colors duration-300",
                          isOpen ? "text-[#14b8a6]" : "text-slate-300 group-hover:text-slate-500"
                        )} />
                        <h4 className={cn(
                          "font-bold text-[1.15rem] transition-colors duration-300",
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
                        "grid transition-all duration-300 ease-in-out",
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="pb-6 pl-10 text-[1rem] text-slate-500 leading-relaxed font-medium">
                          {point.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            
            {/* "See More" Toggle Button - Capsule Design matching c2.png */}
            <div>
              <button
                onClick={() => setShowAll(!showAll)}
                className="group inline-flex items-center gap-3 bg-white border border-slate-200 text-[#0a192f] font-bold text-[15px] px-8 py-3.5 rounded-full hover:bg-slate-50 transition-all duration-300 shadow-sm"
              >
                {showAll ? (
                  <>Show Less <Minus className="w-4 h-4 text-[#14b8a6]" /></>
                ) : (
                  <>See {wastePoints.length - 3} More <Plus className="w-4 h-4 text-[#14b8a6]" /></>
                )}
              </button>
            </div>
            
          </div>

          {/* Right Column: Constrained Rounded Image Block */}
          <div className="flex-1 w-full relative pt-12 lg:pt-32">
            <div className="w-full h-[480px] relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-50">
              <Image
                src="/images/hero/man-working-environment-project-close-up.jpg"
                alt="Energy Consultant with Tablet"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              {/* Stat Overlays */}
              <div className="absolute bottom-8 left-8 right-8 flex gap-5">
                
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[1.5rem] p-5 flex-1 shadow-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-bold text-xl tracking-tight">30%</span>
                    <ArrowUpRight className="w-4 h-4 text-[#f5a623]" />
                  </div>
                  <div className="text-white/60 text-[10px] font-extrabold uppercase tracking-widest">Waste</div>
                </div>

                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[1.5rem] p-5 flex-1 shadow-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-bold text-xl tracking-tight">24/7</span>
                  </div>
                  <div className="text-white/60 text-[10px] font-extrabold uppercase tracking-widest">Monitor</div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
