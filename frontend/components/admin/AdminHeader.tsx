'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function AdminHeader() {
  const pathname = usePathname()

  // Generate breadcrumbs from pathname
  // e.g. /admin/blog/new -> ['admin', 'blog', 'new']
  const pathSegments = pathname.split('/').filter(segment => segment && segment !== 'admin')
  
  return (
    <header className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0">
      <div className="text-sm font-medium text-text-secondary flex items-center gap-2">
        <Link href="/admin" className="hover:text-primary transition-colors">
          Energy Insight GH
        </Link>
        <span className="text-gray-300">/</span>
        <Link href="/admin" className="hover:text-primary transition-colors">
          Admin Panel
        </Link>
        
        {pathSegments.map((segment, index) => {
          const href = `/admin/${pathSegments.slice(0, index + 1).join('/')}`
          const isLast = index === pathSegments.length - 1
          
          // Format segment for display (capitalize, replace dashes with spaces)
          const displaySegment = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ')
          
          return (
            <div key={href} className="flex items-center gap-2">
              <span className="text-gray-300">/</span>
              {isLast ? (
                <span className="text-primary font-semibold">{displaySegment}</span>
              ) : (
                <Link href={href} className="hover:text-primary transition-colors">
                  {displaySegment}
                </Link>
              )}
            </div>
          )
        })}
      </div>
      <div className="flex items-center gap-4">
         {/* Future space for header search, notifications, etc. */}
      </div>
    </header>
  )
}
