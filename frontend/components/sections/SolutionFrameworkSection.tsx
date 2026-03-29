'use client'

import React from 'react'

const steps = [
  {
    number: '01',
    title: 'Inspect',
    description: 'Facility checks, audits, load analysis',
  },
  {
    number: '02',
    title: 'Analyze',
    description: 'Energy data + carbon accounting + inefficiencies',
  },
  {
    number: '03',
    title: 'Transform',
    description: 'Recommendations, compliance, cost reduction',
  },
]

export function SolutionFrameworkSection() {
  return (
    <section className="bg-white py-16 lg:py-24 relative overflow-hidden">
      
      {/* Background Decor: Very subtle teal/grey radial gradient in corner for "energy" feel */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#14b8a6]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-site relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 bg-white border border-[#14b8a6]/20 rounded-full px-5 py-1.5 text-xs text-[#14b8a6] font-bold shadow-[0_0_15px_rgba(20,184,166,0.15)] mb-6 tracking-wide uppercase transition-all duration-300">
            Solution Framework
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#0a192f] leading-[1.05] tracking-tight mb-6">
            We Don&apos;t Guess.<br />
            <span className="relative inline-block text-[#f5a623] drop-shadow-[0_0_8px_rgba(245,166,35,0.4)]">
              We Diagnose and Optimize.
            </span>
          </h2>

          <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
            Our systematic approach ensures that every efficiency project is built on a 
            foundation of technical precision and verifiable energy data.
          </p>
        </div>

        {/* 3-Step Flow Wrapper */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* Main Connector Line (Desktop) - behind circles */}
          <div className="hidden lg:block absolute top-[40px] left-0 right-0 h-[2px] bg-slate-100 -z-10" />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-0">
            {steps.map((step, idx) => (
              <div key={idx} className="relative flex flex-col items-center">
                
                {/* Connector Line (Mobile) - behind circles */}
                {idx < steps.length - 1 ? (
                  <div className="lg:hidden absolute top-[80px] bottom-[-48px] left-1/2 -translate-x-1/2 w-[2px] bg-slate-100 -z-10" />
                ) : null}

                {/* Number Circle */}
                <div className="relative mb-8">
                  <div className={/* Circle 02 has the double border look from reference image */
                    "w-20 h-20 rounded-full bg-white border-2 border-[#14b8a6] flex items-center justify-center transition-all duration-300 " +
                    (idx === 1 ? "ring-4 ring-offset-0 ring-[#14b8a6]/10" : "")
                  }>
                    <span className="text-2xl font-black text-[#0a192f] tracking-tighter">
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Content - Simple Text precisely beneath circles */}
                <div className="text-center px-4 max-w-[280px]">
                  <h3 className="text-xl font-bold text-[#0a192f] mb-3 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed">
                    {step.description}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Dynamic design: Minimal Authority line */}
        <div className="mt-20 flex items-center justify-center">
           <div className="flex items-center gap-1.5 bg-[#f8fafc] border border-slate-100 rounded-full px-4 py-1.5 shadow-sm">
             <div className="w-1.5 h-1.5 rounded-full bg-[#14b8a6] animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0a192f]/40">
               Live Performance Monitoring
             </span>
           </div>
        </div>

      </div>
    </section>
  )
}
