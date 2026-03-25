'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, Zap, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Add a slight shadow when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={cn("sticky top-0 z-50 bg-white transition-shadow duration-200", scrolled ? "shadow-md" : "border-b border-gray-100")}>
      <div className="container-site">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-text-primary text-xl md:text-2xl shrink-0">
            <Zap className="w-7 h-7 text-accent fill-accent" />
            <span>energyinsight<span className="text-accent">gh</span></span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-text-secondary hover:text-primary font-medium transition-colors duration-200 text-[15px]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Contact Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+233558213055"
              className="inline-flex items-center gap-2 border border-gray-200 text-text-primary text-sm font-semibold px-5 py-2.5 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-colors duration-200 shadow-sm"
            >
              <Phone className="w-4 h-4 text-primary" />
              +233 558 213 055
            </a>
            <a
              href="https://wa.me/233502344573"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-accent/90 transition-colors duration-200 shadow-[0_4px_14px_0_rgba(245,166,35,0.39)] transform hover:-translate-y-0.5"
            >
              <WhatsAppIcon className="w-4 h-4" />
              Let's Talk
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-2 text-text-secondary hover:text-primary transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Nav */}
        <div
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white',
            menuOpen ? 'max-h-[32rem] pb-6 border-t border-gray-100' : 'max-h-0'
          )}
        >
          <ul className="flex flex-col gap-1 pt-4">
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block px-4 py-3 text-text-secondary hover:text-primary font-medium rounded-xl hover:bg-gray-50 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-4 flex flex-col gap-3 px-2">
              <a
                href="tel:+233558213055"
                className="inline-flex items-center justify-center gap-2 border border-gray-200 text-text-primary text-sm font-semibold px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <Phone className="w-4 h-4 text-primary" />
                Call +233 558 213 055
              </a>
              <a
                href="https://wa.me/233502344573"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-accent text-white text-sm font-semibold px-4 py-3 rounded-xl hover:bg-accent/90 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <WhatsAppIcon className="w-4 h-4" />
                WhatsApp Us
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}

