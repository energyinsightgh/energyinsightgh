import { createClient } from '@/lib/supabase/server'
import { Building2, Cpu, BarChart2, GraduationCap, ClipboardList, CheckCircle, XCircle } from 'lucide-react'
import type { Service } from '@/types'
import ServiceAdminCard from '@/components/admin/ServiceAdminCard'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2, Cpu, BarChart2, GraduationCap, ClipboardList,
}

export default async function AdminServicesPage() {
  const supabase = await createClient()
  const { data: services } = await (supabase.from('services') as any)
    .select('*')
    .order('display_order', { ascending: true })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Services</h1>
          <p className="text-text-secondary text-sm mt-1">
            Service cards are seeded from the database. Update content directly in Supabase.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {((services ?? []) as Service[]).map((service) => {
          return <ServiceAdminCard key={service.id} service={service} icon_name={service.icon_name} />
        })}
      </div>


    </div>
  )
}
