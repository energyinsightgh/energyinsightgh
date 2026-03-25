import Link from 'next/link'
import { Zap, Mail, Phone, MapPin } from 'lucide-react'

const serviceLinks = [
  { label: 'Facility Inspection', href: '/services/facility-inspection' },
  { label: 'System Design', href: '/services/system-design' },
  { label: 'Energy Audits', href: '/services/energy-audits' },
  { label: 'Training & Consulting', href: '/services/training-consulting' },
  { label: 'Load Inventory Analysis', href: '/services/load-inventory-analysis' },
]

const quickLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container-site py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <Zap className="w-6 h-6 text-accent fill-accent" />
              <span>energyinsight<span className="text-accent">gh</span></span>
            </Link>
            <p className="text-primary-200 text-sm leading-relaxed">
              Fostering energy literacy and awareness, ensuring clients save on expenditures 
              while contributing to a greener, more sustainable future.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-primary-200 mb-4">Services</h3>
            <ul className="space-y-2">
              {serviceLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-primary-100 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-primary-200 mb-4">Company</h3>
            <ul className="space-y-2">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-primary-100 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-primary-200 mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-primary-100">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-accent" />
                <span>Accra, Ghana, West Africa</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-100">
                <Mail className="w-4 h-4 shrink-0 text-accent" />
                <a href="mailto:info@energyinsightgh.com" className="hover:text-white transition-colors">
                  info@energyinsightgh.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-100">
                <Phone className="w-4 h-4 shrink-0 text-accent" />
                <a href="tel:+233000000000" className="hover:text-white transition-colors">
                  +233 000 000 000
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-400 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-primary-200 text-sm">
            © {new Date().getFullYear()} energyinsightgh. All rights reserved.
          </p>
          <p className="text-primary-300 text-xs">
            Building West Africa&apos;s energy future.
          </p>
        </div>
      </div>
    </footer>
  )
}
