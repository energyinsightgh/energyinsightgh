import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  priority?: boolean
}

export function Logo({ className, priority = false }: LogoProps) {
  return (
    <Link href="/" className={cn('flex items-center shrink-0 group', className)}>
      {/*
        The logo is a wide landscape PNG (white background) containing:
        the circular mark + "ENERGY INSIGHT GH" + tagline.
        Width is left as 'auto' so the aspect ratio is preserved at the fixed height.
        The header nav is h-20 (80px); we show the logo at 52px / 60px — clear and bold.
      */}
      <Image
        src="/energyinsightgh-logo.png"
        alt="Energy Insight Ghana – Efficient & Affordable Energy"
        width={420}
        height={160}
        className={cn(
          'h-12 logo-custom-height w-auto object-contain',
          'transition-opacity duration-300 group-hover:opacity-85'
        )}
        priority={priority}
      />
    </Link>
  )
}
