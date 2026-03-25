import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import {
  Building2, Cpu, BarChart2, GraduationCap, ClipboardList,
} from 'lucide-react'
import type { Service } from '@/types'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2, Cpu, BarChart2, GraduationCap, ClipboardList,
}

interface ServicesPreviewSectionProps {
  services: Service[]
}

export function ServicesPreviewSection({ services }: ServicesPreviewSectionProps) {
  return (
    <section className="section-padding bg-white">
      <div className="container-site">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-3">
              Our Services
            </h2>
            <p className="text-text-secondary max-w-xl leading-relaxed">
              End-to-end energy consultancy services designed for West African businesses,
              facilities, and institutions.
            </p>
          </div>
          <Link href="/services" className="btn-outline text-sm py-2 shrink-0">
            View All Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = iconMap[service.icon_name] ?? Building2
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="card p-6 group flex flex-col gap-4"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary-50 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-text-primary text-lg mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">
                    {service.short_description}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-primary font-medium text-sm mt-auto">
                  Learn more <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
