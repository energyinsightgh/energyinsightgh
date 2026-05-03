import { createClient } from '@/lib/supabase/server'
import type { Service } from '@/types'
import ServicesAdminClient from './ServicesAdminClient'

export default async function AdminServicesPage() {
  const supabase = await createClient()
  const { data: services } = await (supabase.from('services') as any)
    .select('*')
    .order('display_order', { ascending: true })

  return (
    <ServicesAdminClient initialServices={(services ?? []) as Service[]} />
  )
}
