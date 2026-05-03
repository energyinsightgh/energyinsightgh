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
  revalidatePath('/services')
  revalidatePath('/')
  return { success: true }
}

export async function createServiceAction(formData: FormData) {
  const supabase = await createClient()
  const title = formData.get('title') as string
  const short_description = formData.get('short_description') as string
  const icon_name = formData.get('icon_name') as string

  // Get max display_order
  const { data: existing } = await (supabase.from('services') as any)
    .select('display_order')
    .order('display_order', { ascending: false })
    .limit(1)

  const nextOrder = existing && existing.length > 0 ? (existing[0].display_order ?? 0) + 1 : 1
  const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

  const { error } = await (supabase.from('services') as any).insert({
    title,
    slug,
    short_description,
    icon_name: icon_name || 'Building2',
    is_active: true,
    display_order: nextOrder,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/services')
  revalidatePath('/services')
  revalidatePath('/')
  return { success: true }
}

export async function reorderServicesAction(orderedIds: string[]) {
  const supabase = await createClient()

  const updates = orderedIds.map((id, index) =>
    (supabase.from('services') as any)
      .update({ display_order: index + 1 })
      .eq('id', id)
  )

  const results = await Promise.all(updates)
  const error = results.find((r) => r.error)?.error
  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/services')
  revalidatePath('/services')
  revalidatePath('/')
  return { success: true }
}

export async function deleteServiceAction(id: string) {
  const supabase = await createClient()
  const { error } = await (supabase.from('services') as any).delete().eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/admin/services')
  revalidatePath('/services')
  revalidatePath('/')
  return { success: true }
}
