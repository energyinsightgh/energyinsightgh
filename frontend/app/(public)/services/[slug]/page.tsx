import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  Building2, Cpu, BarChart2, GraduationCap, ClipboardList, CheckCircle, ArrowLeft,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { ContactCTASection } from '@/components/sections/ContactCTASection'
import type { Service } from '@/types'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2, Cpu, BarChart2, GraduationCap, ClipboardList,
}

export const revalidate = 3600

export async function generateStaticParams() {
  const supabase = await createClient()
  const { data } = await supabase.from('services').select('slug').eq('is_active', true)
  return (data as any[] ?? []).map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('services').select('title').eq('slug', slug).single()
  return { title: (data as any)?.title ?? 'Service' }
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: service } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (!service) notFound()

  const s = service as Service
  const Icon = iconMap[s.icon_name] ?? Building2

  return (
    <>
      <section className="bg-primary section-padding">
        <div className="container-site">
          <Link href="/services" className="inline-flex items-center gap-2 text-primary-100 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </Link>
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-xl bg-primary-400/30 text-accent flex items-center justify-center shrink-0">
              <Icon className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">{s.title}</h1>
              <p className="text-primary-100 text-lg">{s.short_description}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-text-primary mb-6">About This Service</h2>
              <div className="prose prose-lg max-w-none text-text-secondary leading-relaxed whitespace-pre-line">
                {s.full_description}
              </div>
            </div>
            <div>
              <div className="card p-6 sticky top-24">
                <h3 className="font-bold text-text-primary mb-4 text-lg">Key Benefits</h3>
                {s.benefits && s.benefits.length > 0 && (
                  <ul className="space-y-3">
                    {s.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3 text-sm text-text-secondary">
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="border-t border-gray-100 mt-6 pt-6">
                  <Link href="/contact" className="btn-primary w-full justify-center text-sm">
                    Request This Service
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactCTASection />
    </>
  )
}
