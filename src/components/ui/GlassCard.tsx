'use client'

import { type ReactNode } from 'react'
import { motion } from 'framer-motion'

interface GlassCardProps {
  children: ReactNode
  className?: string
  accentColor?: string
  strong?: boolean
}

export default function GlassCard({
  children,
  className = '',
  accentColor,
  strong = false,
}: GlassCardProps) {
  return (
    <motion.div
      className={`relative rounded-2xl border border-white/8 overflow-hidden group ${strong ? 'glass-strong' : 'glass'} ${className}`}
      style={{
        boxShadow: strong
          ? '0 0 60px rgba(123,97,255,0.12), 0 40px 100px rgba(0,0,0,0.5)'
          : '0 20px 60px rgba(0,0,0,0.4)',
      }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {accentColor && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(circle at 50% 0%, ${accentColor}20, transparent 65%)` }}
        />
      )}
      <div className="relative">{children}</div>
    </motion.div>
  )
}
