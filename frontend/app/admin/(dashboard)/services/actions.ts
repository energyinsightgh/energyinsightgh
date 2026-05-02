'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateServiceAction(id: string, formData: FormData) {
  const supabase = await createClient()
  const title = formData.get('title') as string
  const short_description = formData.get('short_description') as string
  const full_description = formData.get('full_description') as string

  const { error } = await (supabase.from('services') as any)
    .update({ title, short_description, full_description })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/services')
  revalidatePath('/')
  return { success: true }
}
