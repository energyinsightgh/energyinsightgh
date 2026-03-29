'use client'

import React from 'react'
import { Fan, Building2, LineChart, ShieldAlert, RotateCcw, Target } from 'lucide-react'
import { cn } from '@/lib/utils'

const coreProblems = [
  {
    icon: Fan,
    title: "Inefficient Equipment",
    subtitle: "(ACs, Lighting, Motors)",
    punchline: "Your systems aren't broken—they're just costing you more than they should.",
    microStat: "Inefficient equipment can increase energy costs by up to 20–40%.",
    isTilted: true
  },
  {
    icon: Building2,
    title: "Poor Building Design",
    subtitle: "& Load Imbalance",
    punchline: "Your building could be forcing your systems to work harder than necessary.",
    microStat: null,
    isTilted: false
  },
  {
    icon: LineChart,
    title: "No Energy Tracking",
    subtitle: "or Carbon Visibility",
    punchline: "You're paying for energy—but you don't know where it's going.",
    microStat: "No baseline = no optimization. No tracking = no accountability.",
    isTilted: false
  }
]

const hiddenProblems = [
  {
    icon: ShieldAlert,
    title: "Regulatory Blind Spots",
    punchline: "Non-compliance doesn't always show up—until it's too late."
  },
  {
    icon: RotateCcw,
    title: "Energy Waste in Daily Operations",
    punchline: "Energy waste isn't just in systems—it's in daily behavior."
  },
  {
    icon: Target,
    title: "Lack of Energy Strategy",
    punchline: "Without a strategy, energy loss becomes a permanent expense."
  }
]

export function WhereLosingMoneySection() {
  return (
    <section className="bg-[#f8fafc] py-20 lg:py-32 relative overflow-hidden">
      <div className="container-site relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-1.5 text-xs text-[#f5a623] font-bold shadow-sm w-max mb-6 tracking-wide mx-auto">
            The Financial Leak
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-[#0a192f] leading-[1.1] tracking-tight mb-6">
            Where You&apos;re Losing Money <span className="text-[#14b8a6]">Right Now.</span>
          </h2>
          <p className="text-lg text-slate-500 font-medium leading-relaxed">
            Most businesses pay for the energy they use. Very few understand where it actually goes.
          </p>
        </div>

        {/* Option B Layout Structure */}
        <div className="flex flex-col gap-12 lg:gap-16">
          
          {/* Row 1: Core Problems */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreProblems.map((card, idx) => (
              <div 
                key={idx}
                className={cn(
                  "bg-white rounded-3xl p-8 lg:p-10 border border-slate-100 flex flex-col transition-all duration-300",
                  card.isTilted 
                    ? "transform md:-rotate-2 md:scale-105 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] z-10 hover:-translate-y-2 hover:-rotate-1" 
                    : "shadow-lg hover:-translate-y-2 hover:shadow-xl"
                )}
              >
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-slate-100">
                  <card.icon className={cn(
                    "w-7 h-7", 
                    card.isTilted ? "text-[#14b8a6]" : "text-[#0a192f]"
                  )} />
                </div>
                
                <h3 className="text-2xl font-bold text-[#0a192f] leading-tight mb-2">
                  {card.title}
                </h3>
                {card.subtitle && (
                  <p className="text-[#14b8a6] font-semibold text-sm mb-6 uppercase tracking-wider">
                    {card.subtitle}
                  </p>
                )}
                
                <div className="pt-6 border-t border-slate-100 mt-auto">
                  <p className="text-[#0a192f] font-bold italic text-[15px] leading-snug">
                    &ldquo;{card.punchline}&rdquo;
                  </p>
                  {card.microStat && (
                    <div className="mt-4 bg-[#f0fdfa] text-[#0d9488] text-xs font-bold py-2 px-3 rounded-lg inline-block">
                      {card.microStat}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Row 2: Often Overlooked (Dimmed Glassmorphic) */}
          <div className="relative mt-8 lg:mt-12">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
              <span className="bg-[#0a192f] text-white text-[11px] font-bold uppercase tracking-widest py-2 px-6 rounded-full shadow-lg border border-[#0a192f]/20 backdrop-blur-md">
                Often Overlooked
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
              {hiddenProblems.map((card, idx) => (
                <div 
                  key={idx}
                  className="bg-white/40 backdrop-blur-sm rounded-[2rem] p-8 border border-slate-200/60 shadow-sm flex flex-col hover:bg-white/60 transition-colors duration-300 group"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-white/60 rounded-xl flex items-center justify-center shadow-sm border border-slate-100 group-hover:bg-white transition-colors duration-300">
                      <card.icon className="w-5 h-5 text-slate-500 group-hover:text-[#f5a623] transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-700 group-hover:text-[#0a192f] transition-colors duration-300">
                      {card.title}
                    </h3>
                  </div>
                  
                  <div className="pt-5 border-t border-slate-200/60 mt-auto">
                    <p className="text-slate-600 font-semibold italic text-[14px] leading-snug group-hover:text-[#0a192f] transition-colors duration-300">
                      &ldquo;{card.punchline}&rdquo;
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
