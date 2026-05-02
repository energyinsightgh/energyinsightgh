'use client'

import { useEffect, useState } from 'react'
import { User } from 'lucide-react'

export default function AuthorDisplayClient({ authorNameFallback }: { authorNameFallback: string }) {
  const [authorName, setAuthorName] = useState(authorNameFallback)
  const [authorAvatar, setAuthorAvatar] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('ei_settings')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed.authorName) setAuthorName(parsed.authorName)
        if (parsed.authorAvatar) setAuthorAvatar(parsed.authorAvatar)
      } catch (e) {}
    }
  }, [])

  return (
    <div className="flex items-center gap-2">
      {authorAvatar ? (
        <img src={authorAvatar} alt={authorName} className="w-10 h-10 rounded-full object-cover border-2 border-primary-400 shadow-sm" />
      ) : (
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary-400">
          <User className="w-5 h-5" />
        </div>
      )}
      <span className="font-semibold text-lg">{authorName}</span>
    </div>
  )
}
