import { createClient } from '@/lib/supabase/server'
import SettingsClient from './SettingsClient'

export const revalidate = 0

export default async function AdminSettingsPage() {
  const supabase = await createClient()

  // Ensure user is authenticated
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return <div>Unauthorized</div>

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-extrabold text-text-primary mb-2">Settings</h1>
        <p className="text-text-secondary">Manage admin panel preferences and site-wide configuration.</p>
      </div>

      <SettingsClient userEmail={user.email ?? 'Unknown User'} />
    </div>
  )
}
