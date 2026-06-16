'use client'

import { useState, useEffect, useRef } from 'react'
import { redirect } from 'next/navigation'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader'

// We export a client wrapper so the sidebar scroll state can control the main margin
export default function AdminLayoutClient({
  children,
  userEmail,
}: {
  children: React.ReactNode
  userEmail: string | undefined
}) {
  const [sidebarHidden, setSidebarHidden] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      const diff = currentY - lastScrollY.current
      if (window.innerWidth >= 1024) {
        if (diff > 6 && currentY > 80) {
          setSidebarHidden(true)
        } else if (diff < -6) {
          setSidebarHidden(false)
        }
      }
      lastScrollY.current = currentY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-surface-muted flex">
      <AdminSidebar userEmail={userEmail} />

      {/* Main content — offset by sidebar width on desktop, transitions with sidebar */}
      <main
        className="flex-1 flex flex-col min-w-0 transition-all duration-300"
        style={{ marginLeft: sidebarHidden ? 0 : undefined }}
      >
        <AdminHeader />
        <div className="flex-1 overflow-y-auto p-6 bg-surface-muted/50 min-h-screen">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
