import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'energyinsightgh — Energy Consultancy for West Africa',
    template: '%s — energyinsightgh',
  },
  description:
    'Expert energy audits, facility inspections, and system design — helping West African businesses cut costs and meet compliance standards.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  openGraph: {
    siteName: 'energyinsightgh',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
