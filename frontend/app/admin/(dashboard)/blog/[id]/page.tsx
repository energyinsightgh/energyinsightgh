import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { updatePostAction } from '../actions'
import type { BlogPost, Category } from '@/types'
import WPPostForm from '@/components/admin/WPPostForm'

export const revalidate = 0

export default async function EditBlogPostPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params
  const supabase = await createClient()
  
  const { data: postData } = await (supabase.from('blog_posts') as any).select('*').eq('id', id).single()
  const { data: categoriesData } = await supabase.from('categories').select('*').order('name', { ascending: true })

  if (!postData) notFound()
  
  const post = postData as BlogPost
  const categories = (categoriesData as Category[]) || []

  return (
    <div className="w-full">
      <h1 className="text-2xl text-[#1d2327] mb-2 font-normal" style={{ fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen-Sans,Ubuntu,Cantarell,'Helvetica Neue',sans-serif" }}>
        Edit Post
      </h1>
      <WPPostForm 
        action={updatePostAction}
        initialData={post}
        categories={categories}
      />
    </div>
  )
}

