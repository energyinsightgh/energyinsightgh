import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { slugify } from '@/lib/utils'

export async function POST(request: NextRequest) {
  const supabase = await createClient()

  // Verify user is authenticated
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const name = body.name?.trim()

  if (!name) {
    return NextResponse.json({ error: 'Category name is required' }, { status: 400 })
  }

  const slug = slugify(name)

  const { data, error } = await (supabase.from('categories') as any)
    .insert({ name, slug, description: null })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
