import { createClient } from '@/lib/supabase/server'
import MediaPageClient from './MediaPageClient'

export const revalidate = 0

export default async function AdminMediaPage() {
  const supabase = await createClient()

  const { data: files } = await supabase.storage
    .from('media')
    .list('', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'created_at', order: 'desc' },
    })

  const filesWithUrls = (files || [])
    .filter(f => f.name !== '.emptyFolderPlaceholder')
    .map(f => {
      const { data: urlData } = supabase.storage
        .from('media')
        .getPublicUrl(f.name)

      return {
        name: f.name,
        url: urlData.publicUrl,
        size: f.metadata?.size || 0,
        type: f.metadata?.mimetype || 'unknown',
        created_at: f.created_at || '',
      }
    })

  return <MediaPageClient initialFiles={filesWithUrls} />
}
