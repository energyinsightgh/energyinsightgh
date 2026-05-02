import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

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
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} min-h-screen bg-white text-text-primary antialiased selection:bg-primary/10 selection:text-primary`}>
        {children}
      </body>
    </html>
  )
}
