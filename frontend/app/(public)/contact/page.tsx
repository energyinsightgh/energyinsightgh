import type { Metadata } from 'next'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { ContactForm } from './ContactForm'

export const metadata: Metadata = { title: 'Contact Us' }

const contactInfo = [
  { icon: MapPin, label: 'Location', value: 'Accra, Ghana, West Africa' },
  { icon: Mail, label: 'Email', value: 'info@energyinsightgh.com', href: 'mailto:info@energyinsightgh.com' },
  { icon: Phone, label: 'Phone', value: '+233 000 000 000', href: 'tel:+233000000000' },
  { icon: Clock, label: 'Hours', value: 'Mon–Fri, 8:00 AM – 5:00 PM GMT' },
]

export default function ContactPage() {
  return (
    <>
      <section className="bg-primary section-padding">
        <div className="container-site">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-primary-100 text-lg max-w-2xl">
            Ready to start your energy efficiency journey? Get in touch — our engineers typically
            respond within 1–2 business days.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="text-xl font-bold text-text-primary mb-6">Get In Touch</h2>
              <ul className="space-y-5">
                {contactInfo.map((item) => (
                  <li key={item.label} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-0.5">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a href={item.href} className="text-text-secondary hover:text-primary transition-colors text-sm">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-text-secondary text-sm">{item.value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 card p-8">
              <h2 className="text-xl font-bold text-text-primary mb-6">Send Us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
