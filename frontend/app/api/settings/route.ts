import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// GET /api/settings — returns all site_settings as a key/value object
export async function GET() {
  try {
    const supabase = await createClient()
    // Supabase types may not include site_settings in our generated Database map.
    const { data, error } = await (supabase.from('site_settings') as any).select('key, value')
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    const settings: Record<string, string> = {}
    for (const row of (data as any[]) ?? []) {
      settings[row.key] = row.value ?? ''
    }
    return NextResponse.json(settings)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// POST /api/settings — upserts key/value pairs
export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    // Auth check
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const updates = Object.entries(body).map(([key, value]) => ({
      key,
      value: String(value),
      updated_at: new Date().toISOString(),
    }))

    const { error } = await (supabase as any)
      .from('site_settings')
      .upsert(updates, { onConflict: 'key' })

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
