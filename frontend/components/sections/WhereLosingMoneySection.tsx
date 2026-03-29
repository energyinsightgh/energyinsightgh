'use client'

import React from 'react'
import { Fan, Building2, LineChart, ShieldAlert, RotateCcw, Target } from 'lucide-react'
import { cn } from '@/lib/utils'

const allProblems = [
  {
    icon: Fan,
    title: "Inefficient Equipment",
    subtitle: "ACs, Lighting & Motors",
    punchline: "Your systems aren't broken—they're just costing you more than they should.",
    microStat: "Up to 20–40% higher energy costs.",
    isTilted: true
  },
  {
    icon: Building2,
    title: "Poor Building Design",
    subtitle: "Load Imbalance & Heat Gain",
    punchline: "Your building could be forcing your systems to work harder than necessary.",
    microStat: null,
    isTilted: false
  },
  {
    icon: LineChart,
    title: "No Energy Tracking",
    subtitle: "Blind Spending, Zero Visibility",
    punchline: "You're paying for energy—but you don't know where it's going.",
    microStat: "No tracking = no accountability.",
    isTilted: false
  },
  {
    icon: ShieldAlert,
    title: "Regulatory Blind Spots",
    subtitle: "Silent Compliance Risks",
    punchline: "Non-compliance doesn't always show up—until it's too late.",
    microStat: null,
    isTilted: false
  },
  {
    icon: RotateCcw,
    title: "Waste in Daily Operations",
    subtitle: "Habits That Drain Your Budget",
    punchline: "Energy waste isn't just in systems—it's in daily behavior.",
    microStat: null,
    isTilted: false
  },
  {
    icon: Target,
    title: "No Energy Strategy",
    subtitle: "Recurring Loss Without a Plan",
    punchline: "Without a strategy, energy loss becomes a permanent expense.",
    microStat: null,
    isTilted: false
  }
]

export function WhereLosingMoneySection() {
  return (
    <section className="bg-[#eef2f7] py-16 lg:py-24 relative overflow-hidden">
      <div className="container-site relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 lg:mb-20">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-1.5 text-xs text-[#f5a623] font-bold shadow-sm mb-5 tracking-wide">
            The Financial Leak
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0a192f] leading-[1.1] tracking-tight mb-5">
            Where You&apos;re Losing Money <span className="text-[#14b8a6]">Right Now.</span>
          </h2>
          <p className="text-base text-slate-500 font-medium leading-relaxed">
            Your bill shows the total. It never shows the waste. Here&apos;s where your money quietly exits every single month.
          </p>
        </div>

        {/* Unified 2×3 Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allProblems.map((card, idx) => (
            <div 
              key={idx}
              className={cn(
                "bg-white rounded-2xl p-7 border border-slate-100 shadow-md flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
                card.isTilted && "md:rotate-2 md:scale-[1.03] z-10"
              )}
            >
              {/* Icon */}
              <div className="w-11 h-11 bg-[#f0fdfa] rounded-xl flex items-center justify-center mb-5 border border-[#ccfbf1]">
                <card.icon className="w-5 h-5 text-[#14b8a6]" />
              </div>
              
              {/* Title & Subtitle */}
              <h3 className="text-lg font-bold text-[#0a192f] leading-snug mb-1">
                {card.title}
              </h3>
              <p className="text-[#14b8a6] font-semibold text-[11px] uppercase tracking-wider mb-5">
                {card.subtitle}
              </p>
              
              {/* Punchline */}
              <div className="pt-5 border-t border-slate-100 mt-auto">
                <p className="text-[#0a192f]/80 font-semibold italic text-sm leading-snug">
                  &ldquo;{card.punchline}&rdquo;
                </p>
                {card.microStat && (
                  <div className="mt-3 bg-[#f0fdfa] text-[#0d9488] text-[11px] font-bold py-1.5 px-3 rounded-lg inline-block">
                    {card.microStat}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Often Overlooked Label */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <div className="h-px flex-1 max-w-xs bg-slate-200" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
            Often Overlooked
          </span>
          <div className="h-px flex-1 max-w-xs bg-slate-200" />
        </div>

      </div>
    </section>
  )
}
