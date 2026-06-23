import type { Metadata } from 'next'
import { Syne, Inter } from 'next/font/google'
import { CustomCursor, StarfieldBackground } from '@/components/ui/NoSsrWrappers'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Pluto ✲ Portfolio',
  description:
    'Pluto digital marketing agency portfolio — SEO, PPC, branding, social media, web design, and performance campaigns for clients worldwide.',
  keywords: 'digital marketing, SEO, PPC, branding, social media, content marketing, WhatsApp marketing',
  openGraph: {
    title: 'Pluto ✲ Digital Marketing',
    description: 'Strategy · creative · performance — comprehensive digital marketing for every client.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable}`}>
      <body className="bg-transparent text-white overflow-x-hidden" style={{ cursor: 'none' }}>
        <StarfieldBackground />
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
