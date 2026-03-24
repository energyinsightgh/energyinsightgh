import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Building2, Cpu, BarChart2, GraduationCap, ClipboardList } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { ContactCTASection } from '@/components/sections/ContactCTASection'
import type { Service } from '@/types'

export const metadata: Metadata = { title: 'Our Services' }
export const revalidate = 3600

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2, Cpu, BarChart2, GraduationCap, ClipboardList,
}

export default async function ServicesPage() {
  const supabase = await createClient()
  const { data: services } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })

  return (
    <>
      {/* Page Header */}
      <section className="bg-primary section-padding">
        <div className="container-site">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">Our Services</h1>
          <p className="text-primary-100 text-lg max-w-2xl">
            Comprehensive energy consultancy services built for West African businesses,
            facilities, and institutions seeking efficiency, compliance, and cost reduction.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-white">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {((services ?? []) as Service[]).map((service) => {
              const Icon = iconMap[service.icon_name] ?? Building2
              return (
                <div key={service.slug} className="card p-8 flex gap-6">
                  <div className="shrink-0">
                    <div className="w-14 h-14 rounded-xl bg-primary-50 text-primary flex items-center justify-center">
                      <Icon className="w-7 h-7" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h2 className="text-xl font-bold text-text-primary">{service.title}</h2>
                    <p className="text-text-secondary leading-relaxed">{service.short_description}</p>
                    {service.benefits && service.benefits.length > 0 && (
                      <ul className="space-y-1 mt-1">
                        {service.benefits.slice(0, 3).map((b) => (
                          <li key={b} className="flex items-start gap-2 text-sm text-text-secondary">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1 text-primary font-medium text-sm mt-2 hover:gap-2 transition-all"
                    >
                      Learn more <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <ContactCTASection />
    </>
  )
}
