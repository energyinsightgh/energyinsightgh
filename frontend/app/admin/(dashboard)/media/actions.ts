'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

const BUCKET = 'media'

export async function uploadMediaAction(formData: FormData) {
  const supabase = await createClient()
  const file = formData.get('file') as File

  if (!file || file.size === 0) {
    return { error: 'No file selected' }
  }

  // Generate a unique file name to avoid collisions
  const ext = file.name.split('.').pop()
  const timestamp = Date.now()
  const safeName = file.name
    .replace(/\.[^/.]+$/, '') // remove extension
    .replace(/[^a-zA-Z0-9-_]/g, '-') // sanitize
    .toLowerCase()
  const filePath = `${timestamp}-${safeName}.${ext}`

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/media')
  return { success: true, path: filePath }
}

export async function deleteMediaAction(formData: FormData) {
  const supabase = await createClient()
  const path = formData.get('path') as string

  if (!path) return { error: 'No path provided' }

  const { error } = await supabase.storage
    .from(BUCKET)
    .remove([path])

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/media')
  return { success: true }
}

export async function listMediaAction() {
  const supabase = await createClient()

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .list('', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'created_at', order: 'desc' },
    })

  if (error) {
    return { error: error.message, files: [] }
  }

  // Get public URLs for all files
  const filesWithUrls = (data || [])
    .filter(f => f.name !== '.emptyFolderPlaceholder') // Supabase placeholder
    .map(f => {
      const { data: urlData } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(f.name)

      return {
        name: f.name,
        url: urlData.publicUrl,
        size: f.metadata?.size || 0,
        type: f.metadata?.mimetype || 'unknown',
        created_at: f.created_at || '',
      }
    })

  return { files: filesWithUrls }
}
