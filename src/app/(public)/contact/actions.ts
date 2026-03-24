'use server'

import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  service_interest: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export interface ContactFormState {
  success: boolean
  error?: string
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const raw = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    company: formData.get('company') as string | undefined,
    service_interest: formData.get('service_interest') as string | undefined,
    message: formData.get('message') as string,
  }

  const result = contactSchema.safeParse(raw)
  if (!result.success) {
    return { success: false, error: result.error.errors[0].message }
  }

  const { name, email, company, service_interest, message } = result.data

  try {
    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? 'noreply@energyinsightgh.com',
      to: process.env.RESEND_TO_EMAIL ?? 'info@energyinsightgh.com',
      subject: `New Enquiry from ${name} — energyinsightgh`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        company ? `Company: ${company}` : '',
        service_interest ? `Service Interest: ${service_interest}` : '',
        `\nMessage:\n${message}`,
      ]
        .filter(Boolean)
        .join('\n'),
    })

    return { success: true }
  } catch (err) {
    console.error('Contact form email error:', err)
    return { success: false, error: 'Failed to send your message. Please try again or contact us directly.' }
  }
}
