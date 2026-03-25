import { cn } from '@/lib/utils'

interface BadgeProps {
  label: string
  className?: string
}

export function Badge({ label, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-block px-3 py-1 text-xs font-medium rounded-full',
        'bg-primary-50 text-primary-500',
        className
      )}
    >
      {label}
    </span>
  )
}
