import { createClient } from '@/lib/supabase/server'
import { createPostAction } from '../actions'
import WPPostForm from '@/components/admin/WPPostForm'
import { Category } from '@/types'

export const revalidate = 0

export default async function NewBlogPostPage() {
  const supabase = await createClient()
  
  const { data: categoriesData } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true })
    
  const categories = (categoriesData as Category[]) || []

  return (
    <div className="w-full">
      <h1 className="text-2xl text-[#1d2327] mb-2 font-normal" style={{ fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen-Sans,Ubuntu,Cantarell,'Helvetica Neue',sans-serif" }}>
        Add New Post
      </h1>
      <WPPostForm 
        action={createPostAction}
        categories={categories}
      />
    </div>
  )
}

