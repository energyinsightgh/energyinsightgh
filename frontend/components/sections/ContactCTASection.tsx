import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Phone } from 'lucide-react'

export function ContactCTASection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <Image 
        src="/images/cta-bg.jpg"
        alt="Background"
        fill
        className="object-cover absolute inset-0 z-0"
        quality={90}
      />
      <div className="container-site relative z-10 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
          Ready to Cut Your Energy Costs?
        </h2>
        <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Talk to our engineers today. We&apos;ll assess your facility and deliver a clear,
          actionable path to energy efficiency and compliance.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className="btn-primary text-base py-4 px-8 justify-center">
            Request a Free Consultation
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href="tel:+233000000000"
            className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-semibold px-8 py-4 rounded-lg hover:border-primary hover:bg-primary-50 transition-colors duration-200"
          >
            <Phone className="w-5 h-5" />
            Call Us Now
          </a>
        </div>
      </div>
    </section>
  )
}
