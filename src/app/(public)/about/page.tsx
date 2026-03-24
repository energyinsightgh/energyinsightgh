import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Target, Eye, Award, Users } from 'lucide-react'
import { ContactCTASection } from '@/components/sections/ContactCTASection'

export const metadata: Metadata = { title: 'About Us' }

const values = [
  { icon: Target, title: 'Precision', description: 'Every audit and inspection is built on rigorous measurement, not estimates.' },
  { icon: Eye, title: 'Transparency', description: 'We deliver clear, readable reports — no jargon, no hidden findings.' },
  { icon: Award, title: 'Excellence', description: 'Our engineers hold international certifications and follow ASHRAE and ISO standards.' },
  { icon: Users, title: 'Partnership', description: 'We work alongside your team, not just for them — building lasting internal capacity.' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary section-padding">
        <div className="container-site max-w-3xl">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">About energyinsightgh</h1>
          <p className="text-primary-100 text-lg leading-relaxed">
            We are West Africa&apos;s dedicated clean energy consultancy — helping businesses, institutions,
            and facilities take control of their energy, reduce waste, and build a sustainable future.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-white">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-semibold text-accent uppercase tracking-widest mb-3 block">Our Mission</span>
              <h2 className="text-3xl font-bold text-text-primary mb-4">
                Making Energy Efficiency Accessible to Every West African Business
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                energyinsightgh was founded on a simple belief: that every business in West Africa deserves
                access to world-class energy engineering expertise. Too many facilities are losing thousands
                to energy waste that could be solved with proper analysis and guidance.
              </p>
              <p className="text-text-secondary leading-relaxed mb-6">
                Our certified engineers bring international standards — ASHRAE, ISO 50001 — to the Ghanaian
                and West African market, delivering actionable results that show up on your utility bills.
              </p>
              <Link href="/contact" className="btn-primary text-sm">
                Work With Us <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-surface-muted rounded-2xl p-10 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold text-primary mb-2">15–30%</div>
                <div className="text-text-secondary font-medium">Average energy cost reduction<br />achieved for our clients</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-surface-muted">
        <div className="container-site">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-3">Our Values</h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              The principles that guide every engagement, every report, and every recommendation.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="card p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-50 text-primary mb-4">
                  <v.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-text-primary mb-2">{v.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTASection />
    </>
  )
}
