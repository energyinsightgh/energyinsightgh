'use client'

import React from 'react'

const steps = [
  {
    number: '01',
    title: 'Inspect',
    description:
      'Facility checks, audits, load analysis',
  },
  {
    number: '02',
    title: 'Analyze',
    description:
      'Energy data + carbon accounting + inefficiencies',
  },
  {
    number: '03',
    title: 'Transform',
    description:
      'Recommendations, compliance, cost reduction',
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

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0a192f] leading-[1.1] tracking-tight mb-5">
            We Don&apos;t Guess.{' '}
            <span className="relative inline-block">
              <span>We Diagnose and Optimize.</span>
              <span
                aria-hidden="true"
                className="absolute left-0 right-0 bottom-0 h-[4px] rounded-full bg-[#f5a623]"
              />
            </span>
          </h2>

          <p className="text-base text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
            Every recommendation we make is evidence-based — rooted in data, not
            assumptions. Our structured three-phase process turns energy
            complexity into clarity and measurable results.
          </p>
        </div>

        {/* 3-Step Flow */}
        <div className="relative max-w-4xl mx-auto px-4">

          {/* ── Desktop connector line ── */}
          {/*
            The line must span ONLY between the centers of circle 1 and circle 3.
            With 3 equal columns the centers sit at 1/6, 3/6, 5/6 of the wrapper width.
            So the line starts at ~16.67% and ends at ~83.33%.
          */}
          <div
            className="hidden lg:block absolute h-[2px] bg-[#0a192f]/10 top-[40px]"
            style={{ left: '16.67%', right: '16.67%' }}
          />

          {/* Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-14 lg:gap-0">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="relative flex flex-col items-center"
              >
                {/* Mobile vertical connector (only between steps) */}
                {idx < steps.length - 1 ? (
                  <div className="lg:hidden absolute top-[80px] left-1/2 -translate-x-1/2 w-[2px] h-12 bg-[#0a192f]/10" />
                ) : null}

                {/* Number Circle */}
                <div className="relative z-10 mb-8">
                  {idx === 1 ? (
                    /* Middle step — filled circle (like reference 02) */
                    <div className="w-[72px] h-[72px] rounded-full bg-[#0a192f] border-[3px] border-[#0a192f] flex items-center justify-center shadow-lg ring-4 ring-[#0a192f]/10">
                      <span className="text-[22px] font-extrabold text-white tracking-tight">
                        {step.number}
                      </span>
                    </div>
                  ) : (
                    /* First & last steps — outlined circle (like reference 01/03) */
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

        {/* Bottom authority tagline */}
        <div className="mt-16 lg:mt-20 flex items-center justify-center gap-4">
          <div className="h-px flex-1 max-w-xs bg-slate-200" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
            Precision · Data · Results
          </span>
          <div className="h-px flex-1 max-w-xs bg-slate-200" />
        </div>
      </div>
    </section>
  )
}
