import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Building2, Cpu, BarChart2, GraduationCap, ClipboardList } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { ContactCTASection } from '@/components/sections/ContactCTASection'
import type { Service } from '@/types'
import ServiceListClient from './ServiceListClient'

export const metadata: Metadata = { title: 'Our Services' }
export const revalidate = 3600

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2, Cpu, BarChart2, GraduationCap, ClipboardList,
}

export default async function ServicesPage() {
  const supabase = await createClient()
  const { data: services } = await (supabase.from('services') as any)
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
            <ServiceListClient services={(services ?? []) as Service[]} />
        </div>
      </section>

      <ContactCTASection />
    </>
  )
}
