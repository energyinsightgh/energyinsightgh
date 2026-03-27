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
    <section className="section-padding bg-surface-muted overflow-hidden">
      <div className="container-site">
        
        {/* Main Side-by-Side Flex Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-stretch">
          
          {/* Left Column: Interactive Content & Accordion */}
          <div className="flex-1 w-full bg-[#f0fbfa] rounded-[3rem] p-8 md:p-12 lg:p-16 flex flex-col justify-center border border-[#14b8a6]/10 shadow-sm">
            
            <div className="inline-flex items-center gap-2 bg-white border border-[#14b8a6]/20 rounded-full px-4 py-1.5 text-sm text-[#0a192f] font-bold shadow-sm w-max mb-6">
              The Realization
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0a192f] leading-[1.1] tracking-tight mb-6">
              Most Buildings Waste<br /> Energy—<span className="text-[#0a192f] underline decoration-accent underline-offset-8">Silently.</span>
            </h2>
            
            <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-xl mb-12">
              Because current systems only show you the total bill, finding the root cause of the waste is incredibly tough. 
            </p>

            {/* Bulky Card Accordion Items */}
            <div className="space-y-4 w-full">
              {wastePoints.map((point, idx) => {
                const isOpen = openIndex === idx
                return (
                  <div 
                    key={idx}
                    className={cn(
                      "group border rounded-3xl transition-all duration-300 overflow-hidden",
                      isOpen ? "bg-white border-[#14b8a6]/30 shadow-md ring-1 ring-[#14b8a6]/5" : "bg-white/50 border-white/80 hover:bg-white hover:border-[#14b8a6]/20"
                    )}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300",
                          isOpen ? "bg-[#14b8a6] text-white" : "bg-white text-[#14b8a6] shadow-sm"
                        )}>
                          <point.icon className="w-5 h-5" />
                        </div>
                        <h4 className="font-bold text-[#0a192f] text-lg">
                          {point.title}
                        </h4>
                      </div>
                      <ChevronDown className={cn(
                        "w-5 h-5 text-slate-400 transition-transform duration-300",
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
                        <p className="px-6 pb-6 pt-0 text-slate-600 leading-relaxed font-medium">
                          {point.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            
          </div>

          {/* Right Column: High-Quality Visual with Glass Overlays */}
          <div className="flex-1 w-full relative min-h-[500px] lg:min-h-full">
            {/* Image Container with Rounding matching the card style */}
            <div className="w-full h-full relative rounded-[3rem] overflow-hidden shadow-2xl border border-white/20">
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

              {/* Glassmorphic Stat Cards Overlaid on Image */}
              <div className="absolute bottom-10 left-8 right-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Glass Card 1 */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] p-6 shadow-2xl transform transition-transform hover:scale-[1.02] cursor-default">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
                        <ArrowUpRight className="w-6 h-6 text-red-500" />
                      </div>
                      <span className="text-red-400 text-xs font-bold uppercase tracking-widest">Efficiency Gap</span>
                    </div>
                    <div>
                      <span className="text-white text-3xl font-black">30%</span>
                      <p className="text-white/70 text-sm font-semibold mt-1">Energy consumption wasted daily</p>
                    </div>
                  </div>
                </div>

                {/* Glass Card 2 */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] p-6 shadow-2xl transform transition-transform hover:scale-[1.02] cursor-default hidden sm:block">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 bg-[#14b8a6]/20 rounded-xl flex items-center justify-center">
                        <BatteryCharging className="w-6 h-6 text-[#14b8a6]" />
                      </div>
                      <span className="text-[#14b8a6] text-xs font-bold uppercase tracking-widest">Active Monitoring</span>
                    </div>
                    <div>
                      <span className="text-white text-3xl font-black">24/7</span>
                      <p className="text-white/70 text-sm font-semibold mt-1">Real-time facility oversight</p>
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
