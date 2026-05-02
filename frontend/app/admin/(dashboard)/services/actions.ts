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

export async function reorderServicesAction(updates: { id: string, display_order: number }[]) {
  const supabase = await createClient()
  
  // Supabase bulk update via Promise.all (for simplicity, as bulk update via RPC or upsert is trickier if we don't send all columns)
  for (const update of updates) {
    await (supabase.from('services') as any)
      .update({ display_order: update.display_order })
      .eq('id', update.id)
  }

  revalidatePath('/admin/services')
  revalidatePath('/')
  revalidatePath('/services')
  return { success: true }
}

export async function addServiceAction() {
  const supabase = await createClient()
  
  // Get max display order
  const { data: maxOrderData } = await (supabase.from('services') as any)
    .select('display_order')
    .order('display_order', { ascending: false })
    .limit(1)
  
  const nextOrder = (maxOrderData?.[0]?.display_order || 0) + 1
  const id = crypto.randomUUID()
  const newSlug = `new-service-${id.substring(0, 8)}`

  const { error } = await (supabase.from('services') as any).insert({
    id,
    title: 'New Service',
    slug: newSlug,
    short_description: 'Short description goes here.',
    full_description: '<p>Detailed content goes here.</p>',
    icon_name: 'Building2',
    is_active: false,
    display_order: nextOrder
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/services')
  revalidatePath('/')
  revalidatePath('/services')
  return { success: true }
}
