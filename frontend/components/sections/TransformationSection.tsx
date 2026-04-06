'use client'

import React, { useEffect, useRef, useState } from 'react'
import {
  AlertTriangle,
  TrendingDown,
  HelpCircle,
  Zap,
  CheckCircle,
  BarChart3,
  Shield,
  Gauge,
} from 'lucide-react'

const transformations = [
  {
    before: {
      label: 'High energy bills',
      icon: TrendingDown,
    },
    after: {
      label: 'Reduced energy costs',
      icon: CheckCircle,
    },
  },
  {
    before: {
      label: 'No emission tracking',
      icon: AlertTriangle,
    },
    after: {
      label: 'Clear carbon reports',
      icon: BarChart3,
    },
  },
  {
    before: {
      label: 'Compliance uncertainty',
      icon: HelpCircle,
    },
    after: {
      label: 'Audit-ready compliance',
      icon: Shield,
    },
  },
  {
    before: {
      label: 'Reactive decisions',
      icon: Zap,
    },
    after: {
      label: 'Data-driven control',
      icon: Gauge,
    },
  },
]

function AnimatedRow({
  item,
  index,
}: {
  item: (typeof transformations)[0]
  index: number
}) {
  const rowRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.3 }
    )
    if (rowRef.current) observer.observe(rowRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={rowRef}
      className={`grid grid-cols-1 md:grid-cols-[1fr_56px_1fr] md:gap-x-8 items-stretch transition-all duration-700 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* ── Before Card ── */}
      <div className="group relative flex items-center gap-4 bg-[#fff1f1] border border-red-200 rounded-xl px-5 py-4 shadow-sm transition-all duration-300 hover:shadow-md hover:border-red-300 h-full overflow-hidden">
        {/* Full-height left accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-[5px] bg-[#fb7185]" />

        <div className="shrink-0 w-11 h-11 rounded-xl bg-red-100 flex items-center justify-center text-[#f43f5e] group-hover:bg-red-200 transition-colors duration-300">
          <item.before.icon className="w-5 h-5 stroke-[2.5]" />
        </div>
        <span className="text-[15px] font-bold text-[#0a192f] leading-snug">
          {item.before.label}
        </span>
      </div>

      {/* ── Arrow Separator (Desktop) ── */}
      <div className="hidden md:flex items-center justify-center w-[56px]">
        <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#14b8a6] shadow-lg shadow-[#14b8a6]/20 ring-4 ring-[#14b8a6]/10">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-4 h-4 text-white"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </div>
      </div>

      {/* ── Arrow Separator (Mobile) ── */}
      <div className="flex md:hidden items-center justify-center py-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#14b8a6] text-white shadow-md">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-4 h-4 rotate-90"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </div>
      </div>

      {/* ── After Card ── */}
      <div className="group relative flex items-center gap-4 bg-[#ecfdf5] border border-emerald-200 rounded-xl px-5 py-4 shadow-sm transition-all duration-300 hover:shadow-md hover:border-emerald-300 h-full overflow-hidden">
        {/* Full-height left accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-[5px] bg-[#14b8a6]" />

        <div className="shrink-0 w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center text-[#059669] group-hover:bg-emerald-200 transition-colors duration-300">
          <item.after.icon className="w-5 h-5 stroke-[2.5]" />
        </div>
        <span className="text-[15px] font-bold text-[#0a192f] leading-snug">
          {item.after.label}
        </span>
      </div>
    </div>
  )
}

export function TransformationSection() {
  return (
    <section className="relative bg-slate-100 py-16 lg:py-24 overflow-hidden border-y border-slate-200">
      {/* Background accents */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#14b8a6]/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-[#f5a623]/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="container-site relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 lg:mb-20">
          <div className="inline-flex items-center gap-2 bg-white border border-[#f5a623]/20 rounded-full px-5 py-1.5 text-xs text-[#f5a623] font-bold shadow-[0_0_15px_rgba(245,166,35,0.05)] mb-5 tracking-wide uppercase">
            The Transformation
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0a192f] leading-[1.1] tracking-tight mb-4">
            What Changes After You{' '}
            <span className="relative inline-block pb-2">
              <span>Work With Us</span>
              <svg
                viewBox="0 0 300 20"
                className="absolute left-0 right-0 -bottom-1 w-full h-4 text-[#f5a623]"
                preserveAspectRatio="none"
              >
                <path
                  d="M5 15 Q 150 2 295 15"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                  fill="transparent"
                  className="opacity-90"
                />
              </svg>
            </span>
          </h2>

          <p className="text-base text-slate-500 font-medium leading-relaxed max-w-xl mx-auto">
            We don&apos;t just consult — we transform how you manage energy,
            costs, and compliance. Here&apos;s what our clients experience.
          </p>
        </div>

        {/* Column Headers */}
        <div className="max-w-4xl mx-auto mb-8 hidden md:grid grid-cols-[1fr_56px_1fr] gap-x-8 items-center">
          <div className="flex items-center justify-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#fb7185]" />
            <span className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#fb7185]/80">
              Before
            </span>
          </div>
          <div className="w-14" />
          <div className="flex items-center justify-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#14b8a6]" />
            <span className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#14b8a6]">
              After
            </span>
          </div>
        </div>

        {/* Transformation Rows */}
        <div className="max-w-4xl mx-auto flex flex-col gap-6 md:gap-5">
          {transformations.map((item, idx) => (
            <AnimatedRow key={idx} item={item} index={idx} />
          ))}
        </div>
        
        {/* "..and more" Indicator */}
        <div className="mt-10 text-center animate-pulse">
          <span className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 tracking-wide bg-white/50 px-4 py-1.5 rounded-full border border-slate-200/60 shadow-sm">
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            ..and more
            <span className="w-1 h-1 rounded-full bg-slate-300" />
          </span>
        </div>

        {/* Bottom tagline */}
        <div className="mt-16 lg:mt-20 flex items-center justify-center gap-4">
          <div className="h-px flex-1 max-w-xs bg-slate-200" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
            Clarity · Savings · Compliance
          </span>
          <div className="h-px flex-1 max-w-xs bg-slate-200" />
        </div>
      </div>
    </section>
  )
}
