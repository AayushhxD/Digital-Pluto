'use client'

import dynamic from 'next/dynamic'

export const CustomCursor = dynamic(() => import('@/components/ui/CustomCursor'), { ssr: false })
export const StarfieldBackground = dynamic(() => import('@/components/ui/StarfieldBackground'), { ssr: false })
