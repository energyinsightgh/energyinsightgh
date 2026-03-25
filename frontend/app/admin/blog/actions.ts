'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { slugify } from '@/lib/utils'

export async function createPostAction(formData: FormData): Promise<void> {
  const supabase = await createClient()
  const title = formData.get('title') as string
  const status = formData.get('status') as 'draft' | 'published'

  const { error } = await (supabase.from('blog_posts') as any).insert({
    title,
    slug: slugify(title),
    excerpt: formData.get('excerpt') as string || null,
    content: formData.get('content') as string || null,
    author: formData.get('author') as string || 'energyinsightgh',
    tags: (formData.get('tags') as string || '').split(',').map(t => t.trim()).filter(Boolean),
    status,
    published_at: status === 'published' ? new Date().toISOString() : null,
  })

  if (error) throw new Error(error.message)
  revalidatePath('/admin/blog')
  revalidatePath('/')
  revalidatePath('/blog')
  redirect('/admin/blog')
}

export async function updatePostAction(formData: FormData): Promise<void> {
  const supabase = await createClient()
  const id = formData.get('id') as string
  const status = formData.get('status') as 'draft' | 'published'

  // Get current post to check if we're publishing for the first time
  const { data: current } = await (supabase.from('blog_posts') as any).select('status, published_at').eq('id', id).single()
  const c = current as any
  const isFirstPublish = status === 'published' && c?.status !== 'published'

  const { error } = await (supabase.from('blog_posts') as any).update({
    title: formData.get('title') as string,
    excerpt: formData.get('excerpt') as string || null,
    content: formData.get('content') as string || null,
    author: formData.get('author') as string || 'energyinsightgh',
    tags: (formData.get('tags') as string || '').split(',').map(t => t.trim()).filter(Boolean),
    status,
    published_at: isFirstPublish ? new Date().toISOString() : (c?.published_at ?? null),
  }).eq('id', id)

  if (error) throw new Error(error.message)
  revalidatePath('/admin/blog')
  revalidatePath('/')
  revalidatePath('/blog')
  redirect('/admin/blog')
}

export async function deletePostAction(formData: FormData): Promise<void> {
  const supabase = await createClient()
  const id = formData.get('id') as string
  await supabase.from('blog_posts').delete().eq('id', id)
  revalidatePath('/admin/blog')
  revalidatePath('/')
  revalidatePath('/blog')
}
