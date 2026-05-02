import Link from 'next/link'
import { Mail, Phone, MapPin, Twitter, Linkedin, Instagram, Facebook, Youtube } from 'lucide-react'

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
    <footer className="bg-primary text-white relative">
      <div className="container-site py-16 md:py-20">
        
        {/* Newsletter Subscription Card */}
        <div className="bg-[#EAF5F8] border border-slate-200 shadow-xl rounded-xl p-8 md:px-12 md:py-10 mb-20 flex flex-col md:flex-row items-center justify-between mx-auto max-w-5xl">
          <div className="md:w-1/2 mb-6 md:mb-0 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">Subscribe to our Newsletter!</h3>
            <p className="text-text-secondary text-sm md:text-base pr-0 md:pr-10">
              Join visionary leaders receiving curated strategies and actionable efficiency tips directly from our experts.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center md:justify-end w-full">
            <form className="flex w-full max-w-md bg-transparent rounded overflow-hidden">
              <input 
                type="email" 
                placeholder="Enter Email" 
                className="flex-1 px-4 py-3 outline-none text-text-primary placeholder:text-slate-500 bg-transparent text-sm md:text-base border border-slate-400 rounded-l focus:border-accent focus:ring-1 focus:ring-accent transition-all" 
                required 
              />
              <button 
                type="submit" 
                className="bg-accent text-white px-6 md:px-8 py-3 font-semibold text-sm hover:bg-accent/90 transition-colors uppercase tracking-wide rounded-r border border-accent"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <a href="/" className="inline-flex items-center gap-3 mb-6 group">
              <div className="flex flex-col">
                <span className="text-white font-extrabold text-xl tracking-tight leading-none group-hover:text-primary-100 transition-colors">
                  Energy Insight
                </span>
                <span className="text-accent font-bold text-[10px] tracking-[0.22em] uppercase mt-1">
                  Ghana
                </span>
              </div>
            </a>
            <p className="text-primary-200 text-sm leading-relaxed mb-8 max-w-sm">
              Fostering energy literacy and awareness, ensuring clients save on expenditures 
              while contributing to a greener, more sustainable future.
            </p>
            <div className="flex items-center gap-4 text-white">
              <a href="#" aria-label="Twitter" className="hover:text-accent transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" aria-label="LinkedIn" className="hover:text-accent transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href="#" aria-label="Instagram" className="hover:text-accent transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" aria-label="Facebook" className="hover:text-accent transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" aria-label="YouTube" className="hover:text-accent transition-colors"><Youtube className="w-5 h-5" /></a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-semibold text-base text-white mb-6">Services</h3>
            <ul className="space-y-4">
              {serviceLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-primary-200 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-semibold text-base text-white mb-6">Company</h3>
            <ul className="space-y-4">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-primary-200 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-semibold text-base text-white mb-6">Support</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-primary-200">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-accent/70" />
                <span>Accra, Ghana<br/>West Africa</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-200">
                <Mail className="w-4 h-4 shrink-0 text-accent/70" />
                <a href="mailto:info@energyinsightgh.com" className="hover:text-white transition-colors">info@energyinsightgh.com</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-200">
                <Phone className="w-4 h-4 shrink-0 text-accent/70" />
                <a href="tel:+233000000000" className="hover:text-white transition-colors">+233 000 000 000</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-400/30 mt-16 pt-8 flex flex-col items-center gap-6">
          <div className="flex flex-wrap justify-center gap-6 text-primary-200 text-sm">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Code of Conduct</a>
          </div>
          <p className="text-primary-300 text-sm text-center">
            © {new Date().getFullYear()} Energy Insight. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
