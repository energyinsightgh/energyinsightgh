'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { submitContactForm, type ContactFormState } from './actions'
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

const initialState: ContactFormState = { success: false }

const serviceOptions = [
  'Facility Inspection',
  'System Design',
  'Energy Audits',
  'Training & Consulting',
  'Load Inventory Analysis',
  'General Inquiry',
]

function SubmitButton() {
  const { pending } = useFormStatus()
  
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Sending…
        </>
      ) : (
        'Send Message'
      )}
    </button>
  )
}

export function ContactForm() {
  const [state, formAction] = useFormState(submitContactForm, initialState)

  if (state.success) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-bold text-text-primary">Message Sent!</h3>
        <p className="text-text-secondary max-w-sm">
          Thank you for reaching out. Our team will get back to you within 1–2 business days.
        </p>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-5">
      {state.error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {state.error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Kwame Mensah"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-1.5">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="kwame@company.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-text-primary mb-1.5">
          Company / Organisation
        </label>
        <input
          id="company"
          name="company"
          type="text"
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Accra Manufacturing Ltd."
        />
      </div>

      <div>
        <label htmlFor="service_interest" className="block text-sm font-medium text-text-primary mb-1.5">
          Service of Interest
        </label>
        <select
          id="service_interest"
          name="service_interest"
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
        >
          <option value="">Select a service…</option>
          {serviceOptions.map((s) => (
             <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-1.5">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          placeholder="Tell us about your facility and energy challenges…"
        />
      </div>

      <SubmitButton />
    </form>
  )
}
