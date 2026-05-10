'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function deleteClientEmail(formData: FormData) {
  const id = formData.get('id') as string
  if (!id) return { success: false, error: 'No ID provided' }

  const supabase = await createClient()
  
  // Need to ensure the user is an admin
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: 'Unauthorized' }
  }

  const { error } = await supabase
    .from('client_emails')
    .delete()
    .eq('id', id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/emails')
  revalidatePath('/admin')
  return { success: true }
}
