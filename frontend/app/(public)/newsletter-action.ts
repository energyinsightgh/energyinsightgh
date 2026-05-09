'use server'

import { createClient } from '@/lib/supabase/server'

export async function subscribeNewsletter(email: string) {
  if (!email || !email.includes('@')) return { success: false, error: 'Invalid email' }
  const supabase = await createClient()
  const { error } = await supabase.from('client_emails').insert({ email, source: 'newsletter' })
  
  try {
    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? 'noreply@energyinsightgh.com',
      to: process.env.RESEND_TO_EMAIL ?? 'energyinsightgh@gmail.com',
      subject: `New Newsletter Subscription`,
      text: `A new user has subscribed to the newsletter:\nEmail: ${email}`,
    })
  } catch (err) {
    console.error('Newsletter email error:', err)
  }
  
  if (error) return { success: false, error: error.message }
  return { success: true }
}
