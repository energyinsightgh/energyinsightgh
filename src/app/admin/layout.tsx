import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Zap, LayoutDashboard, FileText, Settings, LogOut } from 'lucide-react'
import { signOutAction } from './actions'

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Blog Posts', href: '/admin/blog', icon: FileText },
  { label: 'Services', href: '/admin/services', icon: Settings },
]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/admin/login')

  return (
    <div className="min-h-screen bg-surface-muted flex">
      {/* Sidebar */}
      <aside className="w-60 bg-primary text-white flex flex-col shrink-0">
        <div className="flex items-center gap-2 font-bold text-lg p-6 border-b border-primary-400/30">
          <Zap className="w-5 h-5 text-accent fill-accent" />
          <span>energyinsight<span className="text-accent">gh</span></span>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-primary-100 hover:bg-primary-400/30 hover:text-white transition-colors text-sm font-medium"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-primary-400/30">
          <p className="text-xs text-primary-300 mb-3 truncate">{user.email}</p>
          <form action={signOutAction}>
            <button
              type="submit"
              className="flex items-center gap-2 text-sm text-primary-100 hover:text-white transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto p-8">{children}</main>
      </div>
    </div>
  )
}
