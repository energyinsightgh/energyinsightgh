'use client'

import React, { useState } from 'react'
import { ArrowRight, X } from 'lucide-react'
import type { Service } from '@/types'
import { Building2, Cpu, BarChart2, GraduationCap, ClipboardList } from 'lucide-react'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2, Cpu, BarChart2, GraduationCap, ClipboardList,
}

interface ServiceListClientProps {
  services: Service[]
}

export default function ServiceListClient({ services }: ServiceListClientProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => {
          const Icon = iconMap[service.icon_name] ?? Building2
          return (
            <div 
              key={service.slug} 
              className="group bg-white rounded-2xl p-8 border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 relative overflow-hidden"
            >
              {/* Decorative background element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
              
              <div className="relative z-10 flex flex-col gap-5">
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-primary-50 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <h2 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">{service.title}</h2>
                  <p className="text-gray-600 leading-relaxed text-sm">{service.short_description}</p>
                  {service.benefits && service.benefits.length > 0 && (
                    <ul className="space-y-1.5 mt-2">
                      {service.benefits.slice(0, 3).map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                  <button
                    onClick={() => setSelectedService(service)}
                    className="inline-flex items-center gap-2 text-primary font-bold text-sm mt-auto pt-4 group/btn"
                  >
                    Read more 
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Modal Popup for Read More */}
      {selectedService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedService(null)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden transform transition-all">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  {(() => {
                    const Icon = iconMap[selectedService.icon_name] ?? Building2
                    return <Icon className="w-5 h-5" />
                  })()}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{selectedService.title}</h3>
              </div>
              <button 
                onClick={() => setSelectedService(null)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto custom-scrollbar">
              {selectedService.full_description ? (
                <div 
                  className="prose prose-sm sm:prose-base prose-primary max-w-none"
                  dangerouslySetInnerHTML={{ __html: selectedService.full_description }}
                />
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <p>Detailed content for this service is coming soon.</p>
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex justify-end">
              <button 
                onClick={() => setSelectedService(null)}
                className="px-6 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
