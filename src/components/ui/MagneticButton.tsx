'use client'

import { useRef, type ReactNode, type MouseEvent, type RefObject } from 'react'
import { motion } from 'framer-motion'

interface MagneticButtonProps {
  href?: string
  onClick?: () => void
  children: ReactNode
  className?: string
  variant?: 'primary' | 'ghost'
  type?: 'button' | 'submit'
  disabled?: boolean
}

const RADIUS = 60

export default function MagneticButton({
  href,
  onClick,
  children,
  className = '',
  variant = 'primary',
  type = 'button',
  disabled = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null)

  const handleMouseMove = (e: MouseEvent) => {
    const el = ref.current
    if (!el || disabled) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    const dist = Math.hypot(x, y)
    if (dist < RADIUS) {
      const pull = (RADIUS - dist) / RADIUS
      el.style.transform = `translate(${x * 0.35 * pull}px, ${y * 0.35 * pull}px)`
    }
  }

  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  const baseClass =
    variant === 'primary'
      ? 'relative overflow-hidden rounded-full px-8 py-3.5 text-sm font-semibold text-[#050505]'
      : 'rounded-full border border-white/15 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white/80 hover:text-white hover:border-white/25 hover:bg-white/8 backdrop-blur-sm'

  const style =
    variant === 'primary'
      ? {
          background: 'linear-gradient(135deg, #00D9FF 0%, #7B61FF 100%)',
          boxShadow: '0 0 32px rgba(0,217,255,0.35), 0 0 64px rgba(123,97,255,0.2)',
        }
      : undefined

  const motionProps = {
    whileHover: { scale: 1.05, y: -2 } as const,
    whileTap: { scale: 0.97 } as const,
    className: `magnetic inline-block ${baseClass} ${className}`,
    style,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  }

  if (href) {
    return (
      <motion.a ref={ref as RefObject<HTMLAnchorElement>} href={href} {...motionProps}>
        <span className="relative z-10">{children}</span>
      </motion.a>
    )
  }

  return (
    <motion.button
      ref={ref as RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...motionProps}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}
