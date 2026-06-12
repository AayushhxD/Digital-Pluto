import type { Metadata } from 'next'
import { Syne, Inter } from 'next/font/google'
import dynamic from 'next/dynamic'
import './globals.css'

const CustomCursor = dynamic(() => import('@/components/ui/CustomCursor'), { ssr: false })

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
      <body className="bg-black text-white overflow-x-hidden" style={{ cursor: 'none' }}>
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
