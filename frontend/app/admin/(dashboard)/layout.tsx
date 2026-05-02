import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader'
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/admin-login')

  return (
    <div className="min-h-screen bg-surface-muted flex h-screen overflow-hidden">
      <AdminSidebar userEmail={user.email} />

      <main className="flex-1 flex flex-col min-w-0">
        <AdminHeader />

        <div className="flex-1 overflow-y-auto p-6 bg-surface-muted/50">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
