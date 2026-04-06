'use client'

import React, { useEffect, useState, useRef } from 'react'
import { cn } from '@/lib/utils'

const sections = [
  { id: 'realization', label: "Here's why" },
  { id: 'where-losing-money', label: "You're losing money" },
  { id: 'solution', label: "Here's the fix" },
  { id: 'services', label: "How we help" },
  { id: 'transformation', label: "Here's proof" },
  { id: 'target-audience', label: "Who this is for" },
  { id: 'faq', label: "Questions?" },
  { id: 'newsletter', label: "Stay updated" },
  { id: 'contact', label: "Let's act" },
]

export function PageScrollNavigator() {
  const [activeSection, setActiveSection] = useState<string>('')
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollTimeout = useRef<any>(null)

  useEffect(() => {
    const handleScroll = () => {
      // Mark as scrolling to show labels
      setIsScrolling(true)
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false)
      }, 2000) // Labels disappear 2 seconds after scroll stops

      const scrollPosition = window.scrollY + window.innerHeight / 3
      let current = ''

      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const { offsetTop = 0, offsetHeight = 0 } = element
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            current = section.id
          }
        }
      }

      if (current !== activeSection) {
        setActiveSection(current)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    setTimeout(handleScroll, 100)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
    }
  }, [activeSection])

  // Don't render until client side to avoid hydration mismatch if we want, but it's safe.
  
  return (
    <div className="hidden xl:flex fixed left-8 top-1/2 -translate-y-1/2 z-50 flex-col gap-4 group">
      {sections.map((section) => {
        const isActive = activeSection === section.id
        
        return (
          <button
            key={section.id}
            onClick={() => {
              const el = document.getElementById(section.id)
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className="group/item flex items-center relative"
            aria-label={`Scroll to ${section.label}`}
          >
            {/* The Dot/Line */}
            <div 
              className={cn(
                "w-1.5 transition-all duration-300 ease-out rounded-full bg-slate-300 group-hover/item:bg-[#14b8a6]",
                isActive ? "h-10 bg-[#14b8a6] shadow-[0_0_8px_rgba(20,184,166,0.5)]" : "h-3"
              )}
            />
            
            {/* The Label (Pop up text) */}
            <div 
              className={cn(
                "absolute left-6 whitespace-nowrap px-3 py-1.5 rounded-lg bg-white border border-slate-100 shadow-md text-xs font-bold transition-all duration-300 origin-left",
                (isActive && isScrolling)
                  ? "opacity-100 scale-100 text-[#0a192f] translate-x-0" 
                  : "opacity-0 scale-95 -translate-x-2 pointer-events-none group-hover/item:opacity-100 group-hover/item:scale-100 group-hover/item:translate-x-0 text-slate-500"
              )}
            >
              {section.label}
              
              {/* Arrow if we want "You're losing money ->" style, but standard is just showing the label */}
              {isActive && section.id !== 'contact' && (
                <span className="hidden"> →</span>
              )}
            </div>
          </button>
        )
      })}
    </div>
  )
}
