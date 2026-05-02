'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, FileText, Settings, LogOut, Tags, Mail, ToggleLeft, ImagePlus } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { cn } from '@/lib/utils'
import { signOutAction } from '@/app/admin/(dashboard)/actions'

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Blog Posts', href: '/admin/blog', icon: FileText },
  { label: 'Media', href: '/admin/media', icon: ImagePlus },
  { label: 'Categories', href: '/admin/categories', icon: Tags },
  { label: 'Services', href: '/admin/services', icon: Settings },
  { label: 'Clients Emails', href: '/admin/emails', icon: Mail },
  { label: 'Settings', href: '/admin/settings', icon: ToggleLeft },
]

interface AdminSidebarProps {
  userEmail: string | undefined
}

export default function AdminSidebar({ userEmail }: AdminSidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-[#0a192f] text-white flex flex-col shrink-0 border-r border-white/5 selection:bg-accent/20 sticky top-0 h-screen overflow-hidden">
      <div className="p-6 border-b border-white/5">
        <Logo className="brightness-0 invert h-6 w-auto" />
      </div>
      
      <nav className="flex-1 p-4 overflow-y-auto custom-scrollbar">
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-300/50 mb-4 px-3">
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
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-[13px] font-medium group",
                    isActive 
                      ? "bg-primary text-white shadow-lg shadow-primary/20" 
                      : "text-primary-100/70 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <item.icon className={cn("w-4 h-4 transition-colors", isActive ? "text-accent" : "text-primary-300 group-hover:text-white")} />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-white/5 bg-black/20">
        <div className="flex items-center gap-3 px-3 py-2.5 mb-3 rounded-lg bg-white/5 border border-white/5 backdrop-blur-sm">
          <div className="w-8 h-8 rounded-full bg-primary/30 flex items-center justify-center text-[10px] font-bold text-accent border border-accent/20">
            {userEmail?.substring(0, 2).toUpperCase() || 'AD'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-bold text-white truncate">Administrator</p>
            <p className="text-[9px] text-primary-300/60 truncate">{userEmail}</p>
          </div>
        </div>
        
        <form action={signOutAction}>
          <button
            type="submit"
            className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-primary-200 hover:text-white hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-all group"
          >
            <LogOut className="w-3.5 h-3.5 text-primary-300 group-hover:text-red-400" />
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  )
}
