import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Target, Eye, Award, Users, Lightbulb } from 'lucide-react'
import { ContactCTASection } from '@/components/sections/ContactCTASection'
import { cn } from '@/lib/utils'

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
        <div className="container-site">
          <div className="max-w-3xl text-left">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">About Us</h1>
            <p className="text-white/95 text-lg md:text-xl font-normal leading-relaxed max-w-2xl">
              We are West Africa&apos;s dedicated clean energy consultancy — helping businesses, institutions,
              and facilities take control of their energy, reduce waste, and build a sustainable future.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-white">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm font-bold text-accent uppercase tracking-widest mb-3 block">Our Mission</span>
              <h2 className="text-3xl font-extrabold text-text-primary mb-4">
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

      {/* Vision */}
      <section className="section-padding bg-[#F0F4F8]"> {/* Soothing soft blue-gray background */}
        <div className="container-site">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-sm font-bold text-accent uppercase tracking-widest mb-3 block">Our Vision</span>
            <h2 className="text-3xl font-extrabold text-text-primary mb-6">
              Leading the Transition to Sustainable Energy Practices
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-4">
              Our vision extends beyond immediate cost savings. We aim to fundamentally transform how organizations in West Africa consume and manage energy on a daily basis.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed">
              By integrating cutting-edge engineering with practical business strategies, we empower our clients to become champions of sustainability in their respective industries.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-32 bg-primary-50 overflow-hidden">
        <div className="container-site">
          <div className="text-center mb-16 relative">
            <div className="inline-block relative">
              <h2 className="text-3xl lg:text-4xl font-bold text-primary-900 mb-4">Our Values</h2>
              {/* Optional small decorative element similar to the "Do you like us?" pill in the image */}
              <div className="absolute -top-10 -right-8 bg-white px-4 py-2 rounded-full text-xs font-extrabold text-primary shadow-xl border border-gray-100 rotate-6 hidden md:block z-20 whitespace-nowrap">
                What drives us
              </div>
            </div>
            <p className="text-primary-700 max-w-xl mx-auto text-lg">
              We provide more than just consulting — we ensure quality, transparency, and actionable results for every client.
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row justify-center items-stretch gap-6 lg:gap-0 lg:py-10">
            {values.map((v, idx) => {
              const styles = [
                "z-10 lg:-rotate-[3deg] lg:translate-y-6",
                "z-20 lg:-ml-10 lg:rotate-[2deg] lg:-translate-y-4",
                "z-30 lg:-ml-10 lg:-rotate-[2deg] lg:translate-y-4",
                "z-40 lg:-ml-10 lg:rotate-[3deg] lg:-translate-y-6",
              ]
              return (
                <div 
                  key={v.title} 
                  className={cn(
                    "bg-white rounded-[28px] p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] border border-gray-100/50 max-w-sm w-full mx-auto lg:mx-0 lg:w-[300px] xl:w-[340px] transition-all duration-300 hover:z-50 hover:scale-[1.05] hover:rotate-0 hover:-translate-y-4 group flex flex-col",
                    styles[idx]
                  )}
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary text-white mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <v.icon className="w-6 h-6 fill-current" />
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary mb-4 tracking-tight">{v.title}</h3>
                  <p className="text-text-secondary text-[15px] leading-relaxed flex-grow">{v.description}</p>
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
