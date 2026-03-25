import { createClient } from '@/lib/supabase/server'
import { Building2, Cpu, BarChart2, GraduationCap, ClipboardList, CheckCircle, XCircle } from 'lucide-react'
import type { Service } from '@/types'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2, Cpu, BarChart2, GraduationCap, ClipboardList,
}

export default async function AdminServicesPage() {
  const supabase = await createClient()
  const { data: services } = await supabase
    .from('services')
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
          const Icon = iconMap[service.icon_name] ?? Building2
          return (
            <div key={service.id} className="card p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary-50 text-primary flex items-center justify-center shrink-0">
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-bold text-text-primary">{service.title}</h3>
                  <span className="text-xs text-text-muted">Order: {service.display_order}</span>
                  {service.is_active ? (
                    <span className="flex items-center gap-1 text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                      <CheckCircle className="w-3 h-3" /> Active
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                      <XCircle className="w-3 h-3" /> Inactive
                    </span>
                  )}
                </div>
                <p className="text-text-secondary text-sm">{service.short_description}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 card p-6 bg-primary-50/30 border-primary-100">
        <p className="text-sm text-text-secondary">
          <strong>To edit service content:</strong> Go to your{' '}
          <a
            href="https://supabase.com/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Supabase Dashboard
          </a>
          {' '}→ Table Editor → services. You can toggle <code>is_active</code>, update descriptions, and reorder via <code>display_order</code>.
        </p>
      </div>
    </div>
  )
}
