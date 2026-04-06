'use client'

import React from 'react'

const steps = [
  {
    number: '01',
    title: 'Request assessment',
    description: 'We start by understanding your facility, current energy usage, and goals.',
  },
  {
    number: '02',
    title: 'On-site / system audit',
    description: 'Our experts conduct a thorough, hassle-free inspection to uncover hidden inefficiencies.',
  },
  {
    number: '03',
    title: 'Insight report delivered',
    description: 'You receive a clear, actionable breakdown of exactly where you are losing money.',
  },
  {
    number: '04',
    title: 'Implementation guidance',
    description: 'We guide you step-by-step through executing the recommended cost-saving solutions.',
  },
]

export function SolutionFrameworkSection() {
  return (
    <section className="bg-white py-16 lg:py-24 relative overflow-hidden">
      {/* Subtle corner decor */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#14b8a6]/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="container-site relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 lg:mb-20">
          <div className="inline-flex items-center gap-2 bg-white border border-[#14b8a6]/20 rounded-full px-5 py-1.5 text-xs text-[#14b8a6] font-bold shadow-[0_0_15px_rgba(20,184,166,0.15)] mb-5 tracking-wide uppercase">
            Solution Framework
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0a192f] leading-[1.1] tracking-tight mb-6">
            We Don&apos;t Guess.{' '}
            <span className="relative inline-block pb-2">
              <span>We Diagnose and Optimize.</span>
              <svg
                viewBox="0 0 350 20"
                className="absolute left-0 right-0 -bottom-1 w-full h-4 text-[#f5a623]"
                preserveAspectRatio="none"
              >
                <path
                  d="M5 15 Q 175 2 345 15"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                  fill="transparent"
                  className="opacity-90"
                />
              </svg>
            </span>
          </h2>

          <p className="text-base text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
            We make optimizing your facility&apos;s energy effortlessly simple. With a straightforward, hassle-free process, we identify where you&apos;re losing money and give you the exact steps to fix it.
          </p>
        </div>

        <div className="relative max-w-[75rem] mx-auto px-4">

          {/* ── Desktop connector line ── */}
          {/*
            The line must span ONLY between the centers of circle 1 and circle 3.
            With 3 equal columns the centers sit at 1/6, 3/6, 5/6 of the wrapper width.
            So the line starts at ~16.67% and ends at ~83.33%.
          */}
          <div
            className="hidden lg:block absolute h-[2px] bg-[#0a192f]/10 top-[40px]"
            style={{ left: '12.5%', right: '12.5%' }}
          />

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-y-16 lg:gap-8">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="relative flex flex-col items-center"
              >
                {/* Vertical connector lines (only for mobile/tablet where stacked) */}
                <div className="md:hidden">
                  {idx < steps.length - 1 && (
                    <div className="absolute top-[80px] left-1/2 -translate-x-1/2 w-[2px] h-12 bg-[#0a192f]/10" />
                  )}
                </div>
                <div className="hidden md:block lg:hidden">
                  {/* Tablet vertical connector for 2-column layout */}
                  {idx % 2 === 0 && (
                    <div className="absolute left-center right-center h-[2px] bg-[#0a192f]/10 top-[40px] w-full" style={{ left: '50%' }} />
                  )}
                  {idx < 2 && (
                    <div className="absolute top-[80px] left-1/2 -translate-x-1/2 w-[2px] h-16 bg-[#0a192f]/10" />
                  )}
                </div>

                {/* Number Circle */}
                <div className="relative z-10 mb-8">
                  {idx === 1 || idx === 2 ? (
                    /* Middle steps — filled circle */
                    <div className="w-[72px] h-[72px] rounded-full bg-[#0a192f] border-[3px] border-[#0a192f] flex items-center justify-center shadow-lg ring-4 ring-[#0a192f]/10">
                      <span className="text-[22px] font-extrabold text-white tracking-tight">
                        {step.number}
                      </span>
                    </div>
                  ) : (
                    /* First & last steps — outlined circle */
                    <div className="w-[72px] h-[72px] rounded-full bg-white border-[2.5px] border-[#0a192f] flex items-center justify-center shadow-sm">
                      <span className="text-[22px] font-extrabold text-[#0a192f] tracking-tight">
                        {step.number}
                      </span>
                    </div>
                  )}
                </div>

                {/* Title & Description */}
                <div className="text-center px-2 max-w-[280px]">
                  <h3 className="text-lg font-extrabold text-[#0a192f] mb-2 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-16 flex flex-col items-center">
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-3 bg-[#0a192f] text-white font-bold px-8 py-4 rounded-full transition-all duration-300 hover:bg-[#14b8a6] hover:shadow-[0_10px_25px_-5px_rgba(20,184,166,0.4)] active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Your Assessment Now!! <span className="text-xl">👉</span>
            </span>
          </a>
          
          <div className="mt-12 flex items-center justify-center gap-4 w-full">
            <div className="h-px flex-1 max-w-xs bg-slate-200" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Precision · Data · Results
            </span>
            <div className="h-px flex-1 max-w-xs bg-slate-200" />
          </div>
        </div>
      </div>
    </section>
  )
}
