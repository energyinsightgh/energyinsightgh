'use server'

import { createClient } from '@/lib/supabase/server'

export async function subscribeNewsletter(email: string, source: string = 'newsletter') {
  if (!email || !email.includes('@')) return { success: false, error: 'Invalid email' }
  const supabase = await createClient()
  const { error } = await (supabase.from('client_emails') as any).insert({ email, source })
  
  try {
    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)
    const isWaitlist = source === 'blog_waitlist'
    const subject = isWaitlist ? 'New Blog Waitlist Subscription' : 'New Newsletter Subscription'
    const msgType = isWaitlist ? 'blog waitlist' : 'newsletter'
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev',
      to: process.env.RESEND_TO_EMAIL ?? 'energyinsightgh@gmail.com',
      subject: `${subject} — energyinsightgh`,
      text: `A new user has subscribed to the ${msgType}:\nEmail: ${email}`,
    })
  } catch (err) {
    console.error('Newsletter email error:', err)
  }
  
  if (error) return { success: false, error: error.message }
  return { success: true }
}
