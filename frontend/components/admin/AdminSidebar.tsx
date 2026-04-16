'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, FileText, Settings, LogOut } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { cn } from '@/lib/utils'
import { signOutAction } from '@/app/admin/actions'

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Blog Posts', href: '/admin/blog', icon: FileText },
  { label: 'Services', href: '/admin/services', icon: Settings },
]

interface AdminSidebarProps {
  userEmail: string | undefined
}

export default function AdminSidebar({ userEmail }: AdminSidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-primary text-white flex flex-col shrink-0 border-r border-primary-400/20">
      <div className="p-6 border-b border-primary-400/30">
        <Logo className="brightness-0 invert h-6 w-auto" />
      </div>
      
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="text-[10px] font-bold uppercase tracking-wider text-primary-300 mb-4 px-3">
          Management
        </div>
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium",
                    isActive 
                      ? "bg-white/10 text-white shadow-sm" 
                      : "text-primary-100 hover:bg-primary-400/30 hover:text-white"
                  )}
                >
                  <item.icon className={cn("w-4 h-4", isActive ? "text-white" : "text-primary-300")} />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-primary-400/30 bg-primary-600/20">
        <div className="flex items-center gap-3 px-3 py-2 mb-4 rounded-lg bg-black/10">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-white border border-white/20">
            {userEmail?.substring(0, 2).toUpperCase() || 'AD'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white truncate">Admin</p>
            <p className="text-[10px] text-primary-300 truncate">{userEmail}</p>
          </div>
        </div>
        
        <form action={signOutAction}>
          <button
            type="submit"
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-primary-200 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  )
}
