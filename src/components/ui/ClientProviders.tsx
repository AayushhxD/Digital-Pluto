'use client'

import dynamic from 'next/dynamic'

const CustomCursor = dynamic(() => import('@/components/ui/CustomCursor'), { ssr: false })
const StarfieldBackground = dynamic(() => import('@/components/ui/StarfieldBackground'), { ssr: false })

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StarfieldBackground />
      <CustomCursor />
      {children}
    </>
  )
}
