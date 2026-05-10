'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function deleteClientEmail(formData: FormData): Promise<void> {
  const id = formData.get('id') as string
  if (!id) return

  const supabase = await createClient()
  
  // Need to ensure the user is an admin
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return
  }

  const { error } = await supabase
    .from('client_emails')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Delete error:', error)
    return
  }

  revalidatePath('/admin/emails')
  revalidatePath('/admin')
}
