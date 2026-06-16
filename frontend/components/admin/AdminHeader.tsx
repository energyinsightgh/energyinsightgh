'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

function isUUID(str: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str)
}

export default function AdminHeader() {
  const pathname = usePathname()
  const pathSegments = pathname.split('/').filter(segment => segment && segment !== 'admin')
  
  // Track resolved labels for UUID segments (e.g. blog post titles)
  const [resolvedLabels, setResolvedLabels] = useState<Record<string, string>>({})

  useEffect(() => {
    // Find any UUID segments and resolve them to titles
    const uuidSegments = pathSegments.filter(seg => isUUID(seg))
    if (uuidSegments.length === 0) return

    const supabase = createClient()

    uuidSegments.forEach(async (id) => {
      if (resolvedLabels[id]) return
      // Try blog_posts first
      const { data } = await (supabase.from('blog_posts') as any)
        .select('title')
        .eq('id', id)
        .single()
      if (data?.title) {
        setResolvedLabels(prev => ({ ...prev, [id]: data.title }))
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <header className="sticky top-0 z-30 h-14 bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0 shadow-sm">
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
          
          // Use resolved title for UUIDs, otherwise capitalize the segment
          const displaySegment = isUUID(segment)
            ? (resolvedLabels[segment] || segment.substring(0, 8) + '…')
            : segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ')
          
          return (
            <div key={href} className="flex items-center gap-2">
              <span className="text-gray-300">/</span>
              {isLast ? (
                <span className="text-primary font-semibold truncate max-w-[200px]" title={displaySegment}>
                  {displaySegment}
                </span>
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
