import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/admin/login')

  return (
    <div className="min-h-screen bg-surface-muted flex h-screen overflow-hidden">
      <AdminSidebar userEmail={user.email} />

      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
          <div className="text-sm font-medium text-text-secondary">
            Energy Insight GH <span className="mx-2 text-gray-300">/</span> Admin Panel
          </div>
          <div className="flex items-center gap-4">
             {/* Future space for header search, notifications, etc. */}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 bg-surface-muted/50">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
