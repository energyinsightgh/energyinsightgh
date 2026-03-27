'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Zap, TrendingDown, Clock, Activity, CloudOff, ShieldAlert, ChevronDown, ArrowUpRight, BatteryCharging } from 'lucide-react'
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

  return (
    <section className="py-20 lg:py-28 bg-surface-muted overflow-hidden">
      <div className="container-site">
        
        {/* Main Side-by-Side Flex Layout */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Interactive Content & Accordion */}
          <div className="flex-1 w-full flex flex-col justify-start">
            
            <div className="inline-flex items-center gap-2 bg-white border border-[#14b8a6]/10 rounded-full px-3 py-1 text-[11px] md:text-[12px] text-[#0a192f] font-bold shadow-sm w-max mb-6 tracking-wider uppercase">
              The Realization
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-[#0a192f] leading-[1.1] tracking-tight mb-5">
              Most Buildings Waste<br /> Energy—<span className="text-[#0a192f] underline decoration-accent decoration-[3px] underline-offset-6">Silently.</span>
            </h2>
            
            <p className="text-base text-slate-500 font-medium leading-relaxed max-w-lg mb-8">
              Because current systems only show you the total bill, finding the root cause of the waste is incredibly tough. 
            </p>

            {/* Compressed Card Accordion Items */}
            <div className="space-y-3 w-full max-w-md">
              {wastePoints.map((point, idx) => {
                const isOpen = openIndex === idx
                return (
                  <div 
                    key={idx}
                    className={cn(
                      "group border rounded-2xl transition-all duration-300 overflow-hidden",
                      isOpen ? "bg-white border-[#14b8a6]/30 shadow-sm ring-1 ring-[#14b8a6]/5" : "bg-white/50 border-white/80 hover:bg-white hover:border-[#14b8a6]/20"
                    )}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300",
                          isOpen ? "bg-[#14b8a6] text-white" : "bg-white text-[#14b8a6] shadow-[0_2px_4px_rgba(0,0,0,0.05)]"
                        )}>
                          <point.icon className="w-4 h-4" />
                        </div>
                        <h4 className="font-bold text-[#0a192f] text-[15px] md:text-base">
                          {point.title}
                        </h4>
                      </div>
                      <ChevronDown className={cn(
                        "w-4 h-4 text-slate-400 transition-transform duration-300",
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
                        <p className="px-4 pb-4 pt-0 text-[14px] text-slate-500 leading-relaxed font-medium max-w-[90%]">
                          {point.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            
          </div>

          {/* Right Column: High-Quality Visual with Adjusted Height & Positioning */}
          <div className="flex-1 w-full relative pt-12 lg:pt-16"> {/* Top padding to start the image at the 2nd line height */}
            {/* Image Container with constrained height ([aspect-video] or specific h) */}
            <div className="w-full h-[350px] md:h-[450px] relative rounded-[2.5rem] overflow-hidden shadow-xl border border-white/20">
              <Image
                src="/images/hero/man-working-environment-project-close-up.jpg"
                alt="Energy Consultant at Work"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              
              {/* Vibrant Overlay for Tension */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f]/80 via-[#0a192f]/20 to-transparent pointer-events-none" />

              {/* Smaller Glassmorphic Stat Cards Overlaid on Image */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-row gap-3 overflow-x-auto pb-2 scrollbar-hide">
                
                {/* Compact Glass Card 1 */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[1.5rem] p-4 shadow-xl min-w-[140px] flex-1">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-red-500/20 rounded-lg flex items-center justify-center">
                        <ArrowUpRight className="w-4 h-4 text-red-500" />
                      </div>
                      <span className="text-red-400 text-[9px] font-bold uppercase tracking-widest">Efficiency Gap</span>
                    </div>
                    <div>
                      <span className="text-white text-xl font-black">30%</span>
                      <p className="text-white/60 text-[11px] font-semibold mt-0.5">Wasted daily</p>
                    </div>
                  </div>
                </div>

                {/* Compact Glass Card 2 */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[1.5rem] p-4 shadow-xl min-w-[140px] flex-1">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-[#14b8a6]/20 rounded-lg flex items-center justify-center">
                        <BatteryCharging className="w-4 h-4 text-[#14b8a6]" />
                      </div>
                      <span className="text-[#14b8a6] text-[9px] font-bold uppercase tracking-widest">Monitoring</span>
                    </div>
                    <div>
                      <span className="text-white text-xl font-black">24/7</span>
                      <p className="text-white/60 text-[11px] font-semibold mt-0.5">Real-time oversight</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
