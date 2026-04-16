'use client'

import React, { useState } from 'react'
import { ChevronDown, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const faqs = [
  {
    question: "Do I need special equipment?",
    answer: "Not necessarily. We start by optimizing the equipment you currently have. If hardware upgrades are recommended to achieve significant ROI, we’ll provide a clear cost-benefit analysis before proceeding."
  },
  {
    question: "How long does it take?",
    answer: "Initial assessments are typically completed within 1 to 2 weeks, depending on facility size. Implementation of operational strategies can begin immediately, offering fast initial returns while larger capital projects are phased in."
  },
  {
    question: "Is this only for large companies?",
    answer: "No. Energy waste happens at all scales. While industrial and large commercial properties see huge monetary shifts, smaller entities also achieve substantial percentage savings and crucial compliance readiness."
  },
  {
    question: "Will this disrupt operations?",
    answer: "Our audits are entirely non-invasive, and implementations are strategically scheduled to ensure zero downtime or disruption to your core business activities."
  },
  {
    question: "What kind of ROI can I expect?",
    answer: "Most clients see a complete return on investment within 12 to 24 months through reduced utility bills and operational efficiency gains alone, not counting the risk mitigation benefits."
  },
  {
    question: "How often should I perform an energy audit?",
    answer: "For dynamic facilities, we recommend an annual comprehensive audit. However, our continuous monitoring options can remove the need for massive annual deep-dives by providing real-time optimization."
  }
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="pt-16 pb-8 lg:pt-24 lg:pb-8 bg-white relative overflow-hidden">
      <div className="container-site max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#14b8a6]/10 border border-[#14b8a6]/20 rounded-full px-5 py-1.5 text-xs text-[#0f766e] font-bold mb-5 tracking-wide uppercase">
            Remove Objections
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-text-secondary">
            Get clear, straightforward answers to the most common concerns regarding our energy solutions.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className={cn(
                  "border rounded-2xl transition-all duration-300 overflow-hidden",
                  isOpen ? "border-[#14b8a6] bg-[#14b8a6]/5 shadow-sm" : "border-slate-200 bg-white hover:border-[#14b8a6]/50"
                )}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex items-center justify-between w-full p-6 text-left"
                >
                  <span className="text-lg font-bold text-text-primary pr-8">
                    {faq.question}
                  </span>
                  <div className={cn(
                    "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                    isOpen ? "bg-[#14b8a6] text-white rotate-180" : "bg-slate-100 text-slate-500"
                  )}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>
                <div 
                  className={cn(
                    "grid transition-all duration-300 ease-in-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="p-6 pt-0 text-text-secondary leading-relaxed border-t border-[#14b8a6]/10">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <button className="inline-flex items-center gap-2 bg-white border border-primary text-primary font-bold px-8 py-3 rounded-full hover:bg-primary hover:text-white transition-all duration-300 group">
            Read more FAQs
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  )
}
