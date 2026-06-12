'use client'

import { useEffect, useRef, useCallback } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from 'framer-motion'
import { useState } from 'react'

/* ─────────────────────────────────────────────────────────
   Three independent layers:
   1. Dot      — instant, raw mouse position
   2. Ring     — medium spring lag, morphs on hover
   3. Glow     — very slow spring, big radial spotlight
   + A comet tail using requestAnimationFrame canvas
───────────────────────────────────────────────────────── */

const DOT_SIZE = 6
const RING_SIZE_DEFAULT = 38
const RING_SIZE_HOVER = 56
const RING_SIZE_PRESS = 22
const GLOW_SIZE = 140

/* spring configs */
const SPRING_DOT  = { stiffness: 1400, damping: 80, mass: 0.2 }
const SPRING_RING = { stiffness: 180,  damping: 26, mass: 0.7 }
const SPRING_GLOW = { stiffness: 60,   damping: 20, mass: 1.4 }

type CursorState = 'idle' | 'hover' | 'press'

export default function CustomCursor() {
  /* raw position */
  const mx = useMotionValue(-300)
  const my = useMotionValue(-300)

  /* dot — almost instantaneous */
  const dotX = useSpring(mx, SPRING_DOT)
  const dotY = useSpring(my, SPRING_DOT)

  /* ring — medium lag */
  const ringX = useSpring(mx, SPRING_RING)
  const ringY = useSpring(my, SPRING_RING)

  /* glow spotlight — very slow */
  const glowX = useSpring(mx, SPRING_GLOW)
  const glowY = useSpring(my, SPRING_GLOW)

  const [state, setState] = useState<CursorState>('idle')
  const [visible, setVisible] = useState(false)

  /* canvas tail ref */
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const points = useRef<{ x: number; y: number; age: number }[]>([])
  const rafRef = useRef<number | null>(null)
  const posRef = useRef({ x: -300, y: -300 })

  /* ── Canvas tail render loop ── */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const TAIL_LENGTH = 28
    const FADE_SPEED = 0.06

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // age points
      points.current = points.current
        .map((p) => ({ ...p, age: p.age + FADE_SPEED }))
        .filter((p) => p.age < 1)

      // draw bezier trail
      if (points.current.length > 2) {
        for (let i = 1; i < points.current.length; i++) {
          const p0 = points.current[i - 1]
          const p1 = points.current[i]
          const t = i / points.current.length
          const alpha = (1 - p1.age) * (1 - t * 0.3)
          const width = (1 - t) * 3.5 + 0.5

          // hue shifts cyan → violet along the tail
          const hue = 190 + t * 70
          ctx.beginPath()
          ctx.moveTo(p0.x, p0.y)
          ctx.lineTo(p1.x, p1.y)
          ctx.strokeStyle = `hsla(${hue}, 100%, 72%, ${alpha * 0.8})`
          ctx.lineWidth = width
          ctx.lineCap = 'round'
          ctx.stroke()
        }
      }

      rafRef.current = requestAnimationFrame(loop)
    }

    loop()
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  /* ── Mouse tracking ── */
  const onMove = useCallback(
    (e: MouseEvent) => {
      mx.set(e.clientX)
      my.set(e.clientY)
      posRef.current = { x: e.clientX, y: e.clientY }
      if (!visible) setVisible(true)

      points.current.push({ x: e.clientX, y: e.clientY, age: 0 })
      if (points.current.length > 32) points.current.shift()
    },
    [mx, my, visible]
  )

  const onOver = useCallback((e: MouseEvent) => {
    if (state === 'press') return
    const el = e.target as HTMLElement
    const interactive = el.closest(
      'button, a, input, textarea, select, [role="button"], [data-cursor-hover]'
    )
    setState(interactive ? 'hover' : 'idle')
  }, [state])

  const onDown = useCallback(() => setState('press'), [])
  const onUp   = useCallback((e: MouseEvent) => {
    const el = e.target as HTMLElement
    const interactive = el.closest(
      'button, a, input, textarea, select, [role="button"], [data-cursor-hover]'
    )
    setState(interactive ? 'hover' : 'idle')
  }, [])

  const onLeave = useCallback(() => setVisible(false), [])
  const onEnter = useCallback(() => setVisible(true), [])

  useEffect(() => {
    window.addEventListener('mousemove',  onMove,  { passive: true })
    window.addEventListener('mouseover',  onOver,  { passive: true })
    window.addEventListener('mousedown',  onDown)
    window.addEventListener('mouseup',    onUp)
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)
    return () => {
      window.removeEventListener('mousemove',  onMove)
      window.removeEventListener('mouseover',  onOver)
      window.removeEventListener('mousedown',  onDown)
      window.removeEventListener('mouseup',    onUp)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
    }
  }, [onMove, onOver, onDown, onUp, onLeave, onEnter])

  /* ── Derived values ── */
  const ringSize =
    state === 'hover' ? RING_SIZE_HOVER
    : state === 'press' ? RING_SIZE_PRESS
    : RING_SIZE_DEFAULT

  const dotScale = state === 'press' ? 0.4 : state === 'hover' ? 1.4 : 1

  return (
    <>
      {/* ── Canvas comet tail ── */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 99990, mixBlendMode: 'screen' }}
      />

      {/* ── Glow spotlight (slowest) ── */}
      <motion.div
        className="fixed pointer-events-none"
        style={{
          left: glowX,
          top: glowY,
          x: '-50%',
          y: '-50%',
          zIndex: 99991,
          width: GLOW_SIZE,
          height: GLOW_SIZE,
          borderRadius: '50%',
          background:
            state === 'hover'
              ? 'radial-gradient(circle, rgba(0,217,255,0.14) 0%, rgba(123,97,255,0.08) 50%, transparent 70%)'
              : 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 65%)',
          filter: 'blur(2px)',
        }}
        animate={{ opacity: visible ? 1 : 0, scale: state === 'hover' ? 1.3 : 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />

      {/* ── Outer ring (medium spring) ── */}
      <motion.div
        className="fixed pointer-events-none"
        style={{
          left: ringX,
          top: ringY,
          x: '-50%',
          y: '-50%',
          zIndex: 99997,
          border: '1.5px solid',
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: visible ? 1 : 0,
          borderRadius: state === 'hover' ? '35%' : '50%',
          rotate: state === 'hover' ? 45 : 0,
          borderColor:
            state === 'hover'
              ? 'rgba(0,217,255,0.9)'
              : state === 'press'
              ? 'rgba(123,97,255,0.9)'
              : 'rgba(255,255,255,0.5)',
          boxShadow:
            state === 'hover'
              ? '0 0 0 1px rgba(0,217,255,0.2), 0 0 20px rgba(0,217,255,0.35)'
              : state === 'press'
              ? '0 0 0 1px rgba(123,97,255,0.2), 0 0 20px rgba(123,97,255,0.5)'
              : '0 0 0 1px rgba(255,255,255,0.05)',
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 24 }}
      />

      {/* ── Rotating accent arc (only on hover) ── */}
      <AnimatePresence>
        {state === 'hover' && (
          <motion.div
            className="fixed pointer-events-none"
            style={{
              left: ringX,
              top: ringY,
              x: '-50%',
              y: '-50%',
              zIndex: 99998,
              width: ringSize + 12,
              height: ringSize + 12,
            }}
            initial={{ opacity: 0, scale: 0.7, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: 360 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{
              opacity: { duration: 0.2 },
              scale: { type: 'spring', stiffness: 300, damping: 20 },
              rotate: { duration: 1.8, ease: 'linear', repeat: Infinity },
            }}
          >
            <svg width="100%" height="100%" viewBox="0 0 70 70">
              <circle
                cx="35"
                cy="35"
                r="32"
                fill="none"
                stroke="url(#cg)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="30 170"
              />
              <defs>
                <linearGradient id="cg" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00D9FF" stopOpacity="1" />
                  <stop offset="100%" stopColor="#7B61FF" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Inner dot (fastest) ── */}
      <motion.div
        className="fixed pointer-events-none rounded-full"
        style={{
          left: dotX,
          top: dotY,
          x: '-50%',
          y: '-50%',
          zIndex: 99999,
          width: DOT_SIZE,
          height: DOT_SIZE,
          background:
            state === 'hover'
              ? 'linear-gradient(135deg, #00D9FF, #7B61FF)'
              : state === 'press'
              ? '#7B61FF'
              : '#ffffff',
          boxShadow:
            state === 'hover'
              ? '0 0 8px rgba(0,217,255,1), 0 0 20px rgba(0,217,255,0.5)'
              : state === 'press'
              ? '0 0 12px rgba(123,97,255,1)'
              : '0 0 6px rgba(255,255,255,0.7)',
        }}
        animate={{
          scale: dotScale,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 600, damping: 28 }}
      />
    </>
  )
}
