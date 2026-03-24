import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'

const highlights = [
  'ASHRAE-aligned energy audits',
  'ISO 50001 consulting',
  'Certified facility engineers',
]

export function HeroSection() {
  return (
    <section className="relative bg-primary overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #F5A623 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="container-site relative section-padding">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-primary-400/30 border border-primary-300/30 rounded-full px-4 py-1.5 text-sm text-primary-100 mb-6">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            West Africa&apos;s Energy Efficiency Partner
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Powering West Africa&apos;s{' '}
            <span className="text-accent">Transition</span>{' '}
            to Efficient Energy
          </h1>

          <p className="text-lg sm:text-xl text-primary-100 leading-relaxed mb-8 max-w-2xl">
            Expert energy audits, facility inspections, and system design — helping businesses
            cut costs, reduce waste, and meet compliance standards across West Africa.
          </p>

          <ul className="flex flex-col sm:flex-row gap-3 sm:gap-6 mb-10">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-primary-100">
                <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="btn-accent text-base py-4 px-8 justify-center sm:justify-start"
            >
              Request a Free Consultation
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-lg hover:border-white hover:bg-white/10 transition-colors duration-200"
            >
              View Our Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
