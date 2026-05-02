import { createClient } from '@/lib/supabase/server'
import type { Service } from '@/types'
import ServiceListAdminClient from './ServiceListAdminClient'

export default async function AdminServicesPage() {
  const supabase = await createClient()
  const { data: services } = await (supabase.from('services') as any)
    .select('*')
    .order('display_order', { ascending: true })

  return (
    <ServiceListAdminClient initialServices={(services ?? []) as Service[]} />
  )
}
