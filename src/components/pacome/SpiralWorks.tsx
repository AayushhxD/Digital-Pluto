'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  animate,
  AnimatePresence,
  useMotionValueEvent,
} from 'framer-motion'
import { PORTFOLIO } from '@/data/plutoContent'
import PortfolioCard from './PortfolioCard'

// Card dimensions
const CARD_W = 180
const CARD_H = 244

function mod(n: number, m: number) {
  return ((n % m) + m) % m
}

/* ── Particle burst ─────────────────────────────── */
function Particle({ x, y, color }: { x: number; y: number; color: string }) {
  const angle = Math.random() * Math.PI * 2
  const dist = 60 + Math.random() * 100
  return (
    <motion.div
      className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
      style={{ left: x, top: y, background: color, zIndex: 999 }}
      initial={{ opacity: 1, scale: 1.4, x: 0, y: 0 }}
      animate={{ opacity: 0, scale: 0, x: Math.cos(angle) * dist, y: Math.sin(angle) * dist }}
      transition={{ duration: 0.8 + Math.random() * 0.4, ease: [0.22, 1, 0.36, 1] }}
    />
  )
}

/* ── Glow ring ──────────────────────────────────── */
function GlowRing({ color }: { color: string }) {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none rounded-2xl"
      style={{ boxShadow: `0 0 0 1.5px ${color}, 0 0 32px 8px ${color}55, 0 0 80px 24px ${color}1a` }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    />
  )
}

/* ── Shimmer ────────────────────────────────────── */
function Shimmer() {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden"
      style={{ zIndex: 50 }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)',
        }}
        initial={{ x: '-100%' }}
        animate={{ x: '200%' }}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
      />
    </motion.div>
  )
}

/* ── "Tap to explore" hint ──────────────────────── */
function ExploreHint({ accent }: { accent: string }) {
  return (
    <motion.div
      className="flex items-center gap-1.5 justify-center mt-2"
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.25, delay: 0.1 }}
    >
      <motion.span
        className="inline-block w-3.5 h-px"
        style={{ background: accent, opacity: 0.7 }}
        animate={{ scaleX: [1, 1.6, 1] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
      />
      <span className="text-[9px] uppercase tracking-[0.22em]" style={{ color: accent, opacity: 0.7 }}>
        tap to explore
      </span>
      <motion.span
        className="inline-block w-3.5 h-px"
        style={{ background: accent, opacity: 0.7 }}
        animate={{ scaleX: [1, 1.6, 1] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut', delay: 0.8 }}
      />
    </motion.div>
  )
}

/* ── Single orbiting card ───────────────────────── */
function OrbCard({
  index,
  total,
  angleMotion,
  containerW,
  containerH,
  onSnap,
  onOpen,
  activeIndex,
}: {
  index: number
  total: number
  angleMotion: ReturnType<typeof useSpring>
  containerW: number
  containerH: number
  onSnap: (i: number) => void
  onOpen: (i: number) => void
  activeIndex: number
}) {
  const project = PORTFOLIO[index]
  const ref = useRef<HTMLDivElement>(null)
  const pointerDownX = useRef(0)

  const isActive = index === activeIndex
  const [wasActive, setWasActive] = useState(isActive)
  const [shimmer, setShimmer] = useState(false)

  useEffect(() => {
    if (isActive && !wasActive) {
      setShimmer(true)
      const t = setTimeout(() => setShimmer(false), 650)
      return () => clearTimeout(t)
    }
    setWasActive(isActive)
  }, [isActive, wasActive])

  // Drive position from spring — no React re-renders on move
  useMotionValueEvent(angleMotion, 'change', (angle) => {
    if (!ref.current) return
    const step = (Math.PI * 2) / total
    const theta = index * step + angle

    const isMobile = containerW < 640
    // Orbital radii — wider horizontally, taller vertically for a proper 3D look
    // On mobile, use a wider percentage of the screen width and smaller vertical span
    const rx = isMobile ? containerW * 0.42 : containerW * 0.38
    const ry = isMobile ? containerH * 0.16 : containerH * 0.22

    const cx = Math.sin(theta) * rx
    // Offset cards DOWN from center so the active card sits at ~55% height
    const cy = -Math.cos(theta) * ry * 0.72

    const depth = Math.cos(theta)           // 1 = front, -1 = back
    // Scale down cards on mobile
    const baseScale = isMobile ? 0.8 : 1
    const scale = (0.48 + depth * 0.52) * baseScale
    const opacity = depth > -0.2 ? 1 : Math.max(0, (depth + 0.55) / 0.35)
    const zIndex = Math.round((depth + 1) * 50)

    ref.current.style.transform = `translate(${cx - CARD_W / 2}px, ${cy - CARD_H / 2}px) scale(${scale})`
    ref.current.style.opacity = String(opacity)
    ref.current.style.zIndex = String(zIndex)
    ref.current.style.visibility = opacity < 0.03 ? 'hidden' : 'visible'
  })

  // Initial style (SSR-safe, no flash)
  const initStyle = (() => {
    const step = (Math.PI * 2) / total
    const theta = index * step
    const w = containerW || 900
    const h = containerH || 700
    const isMobile = w < 640
    const rx = isMobile ? w * 0.42 : w * 0.38
    const ry = isMobile ? h * 0.16 : h * 0.22
    const cx = Math.sin(theta) * rx
    const cy = -Math.cos(theta) * ry * 0.72
    const depth = Math.cos(theta)
    const baseScale = isMobile ? 0.8 : 1
    const scale = (0.48 + depth * 0.52) * baseScale
    const opacity = depth > -0.2 ? 1 : Math.max(0, (depth + 0.55) / 0.35)
    return {
      transform: `translate(${cx - CARD_W / 2}px, ${cy - CARD_H / 2}px) scale(${scale})`,
      opacity,
      zIndex: Math.round((depth + 1) * 50),
    }
  })()

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerDownX.current = e.clientX
  }

  const handleClick = (e: React.MouseEvent) => {
    // Ignore if the pointer moved more than 6px (drag, not click)
    const moved = Math.abs(e.clientX - pointerDownX.current)
    if (moved > 6) return

    if (isActive) {
      onOpen(index)
    } else {
      onSnap(index)
    }
  }

  return (
    <div
      ref={ref}
      className="absolute cursor-pointer"
      style={{
        width: CARD_W,
        height: CARD_H,
        left: '50%',
        top: '50%',
        willChange: 'transform, opacity',
        ...initStyle,
      }}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
    >
      <div className="relative w-full h-full" style={{ borderRadius: 16, overflow: 'hidden' }}>
        <PortfolioCard project={project} highlighted={isActive} className="w-full h-full" />
        <AnimatePresence>{isActive && <GlowRing color={project.accent} />}</AnimatePresence>
        <AnimatePresence>{shimmer && <Shimmer />}</AnimatePresence>
      </div>

      {/* Label below active card */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-center pointer-events-none"
            style={{ top: CARD_H + 14 }}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
          >
            <div className="text-[12px] font-semibold text-white/90 leading-tight tracking-wide">
              {project.title}
            </div>
            <div
              className="text-[9px] uppercase tracking-[0.24em] mt-1"
              style={{ color: project.accent }}
            >
              {project.category}
            </div>
            <ExploreHint accent={project.accent} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Dot nav ────────────────────────────────────── */
function DotNav({
  total,
  active,
  onDot,
}: {
  total: number
  active: number
  onDot: (i: number) => void
}) {
  return (
    <motion.div
      className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-50"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.4 }}
    >
      {Array.from({ length: total }).map((_, i) => (
        <motion.button
          key={i}
          onClick={() => onDot(i)}
          animate={{
            width: i === active ? 20 : 5,
            opacity: i === active ? 1 : 0.25,
            background: i === active ? PORTFOLIO[active].accent : '#ffffff',
          }}
          transition={{ type: 'spring', stiffness: 440, damping: 30 }}
          className="h-[5px] rounded-full border-none outline-none"
        />
      ))}
    </motion.div>
  )
}

type ParticleData = { id: number; x: number; y: number; color: string }

/* ── Main ───────────────────────────────────────── */
export default function SpiralWorks({ onOpen }: { onOpen?: (index: number) => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ w: 900, h: 700 })
  const [activeIndex, setActiveIndex] = useState(0)
  const [particles, setParticles] = useState<ParticleData[]>([])
  const particleId = useRef(0)

  const total = PORTFOLIO.length

  const angleRaw = useMotionValue(0)
  const angleSpr = useSpring(angleRaw, { stiffness: 120, damping: 25, mass: 1 })

  const isDragging = useRef(false)
  const lastX = useRef(0)
  const vel = useRef(0)
  const lastT = useRef(0)
  const dragDist = useRef(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(() => setSize({ w: el.clientWidth, h: el.clientHeight }))
    ro.observe(el)
    setSize({ w: el.clientWidth, h: el.clientHeight })
    return () => ro.disconnect()
  }, [])

  const snapTo = useCallback(
    (idx: number) => {
      const step = (Math.PI * 2) / total
      const cur = angleRaw.get()
      const raw = -idx * step
      const diff = ((raw - cur + Math.PI) % (Math.PI * 2)) - Math.PI
      const target = cur + diff

      setActiveIndex(idx)

      animate(angleRaw, target, {
        type: 'spring',
        stiffness: 120,
        damping: 25,
        mass: 1,
        onComplete: () => {
          const cx = (containerRef.current?.clientWidth ?? 900) / 2
          const cy = (containerRef.current?.clientHeight ?? 700) / 2
          const color = PORTFOLIO[idx].accent
          const newP: ParticleData[] = Array.from({ length: 10 }, () => ({
            id: particleId.current++,
            x: cx + (Math.random() - 0.5) * 120,
            y: cy + (Math.random() - 0.5) * 60,
            color,
          }))
          setParticles((p) => [...p, ...newP])
          setTimeout(() => setParticles((p) => p.filter((x) => !newP.includes(x))), 1200)
        },
      })
    },
    [angleRaw, total]
  )

  useMotionValueEvent(angleSpr, 'change', (v) => {
    const step = (Math.PI * 2) / total
    const idx = mod(Math.round(-v / step), total)
    setActiveIndex(idx)
  })

  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true
    dragDist.current = 0
    lastX.current = e.clientX
    vel.current = 0
    lastT.current = performance.now()
    ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return
    const now = performance.now()
    const dt = now - lastT.current
    const dx = e.clientX - lastX.current
    dragDist.current += Math.abs(dx)
    vel.current = dt > 0 ? dx / dt : 0
    lastX.current = e.clientX
    lastT.current = now
    angleRaw.set(angleRaw.get() + dx * 0.0045)
  }

  const onPointerUp = useCallback(() => {
    if (!isDragging.current) return
    isDragging.current = false
    const step = (Math.PI * 2) / total
    const flung = angleRaw.get() + vel.current * 100 * 0.0045
    snapTo(mod(Math.round(-flung / step), total))
  }, [angleRaw, snapTo, total])

  const onWheel = useCallback(
    (e: React.WheelEvent) => {
      e.stopPropagation()
      const step = (Math.PI * 2) / total
      // Support both horizontal and vertical scrolling correctly
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      angleRaw.set(angleRaw.get() - delta * 0.002)
      clearTimeout((window as any).__spiralSnap)
      ;(window as any).__spiralSnap = setTimeout(() => {
        const idx = mod(Math.round(-angleRaw.get() / step), total)
        snapTo(idx)
      }, 120)
    },
    [angleRaw, snapTo, total]
  )

  const goNext = useCallback(() => snapTo(mod(activeIndex + 1, total)), [snapTo, activeIndex, total])
  const goPrev = useCallback(() => snapTo(mod(activeIndex - 1, total)), [snapTo, activeIndex, total])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [goNext, goPrev])

  const activeProject = PORTFOLIO[activeIndex]

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden touch-none select-none"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      onWheel={onWheel}
    >
      {/* Ambient background glow — transitions smoothly with active card */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: `radial-gradient(ellipse 60% 44% at 50% 54%, ${activeProject.accent}14 0%, transparent 72%)`,
        }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />

      {/* Subtle noise grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '150px',
        }}
      />

      {/* Orbit track ellipse */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: size.w * 0.76,
          height: size.h * 0.44,
          border: '1px solid rgba(255,255,255,0.04)',
          borderRadius: '50%',
        }}
      />
      {/* Inner accent ring */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: size.w * 0.76,
          height: size.h * 0.44,
          borderRadius: '50%',
          boxShadow: `0 0 0 1px ${activeProject.accent}10`,
          transition: 'box-shadow 1s ease',
        }}
      />

      {/* Cards */}
      {PORTFOLIO.map((_, i) => (
        <OrbCard
          key={i}
          index={i}
          total={total}
          angleMotion={angleSpr}
          containerW={size.w}
          containerH={size.h}
          onSnap={snapTo}
          onOpen={onOpen ?? (() => {})}
          activeIndex={activeIndex}
        />
      ))}

      {/* Particles */}
      {particles.map((p) => (
        <Particle key={p.id} x={p.x} y={p.y} color={p.color} />
      ))}

      {/* Arrow buttons */}
      {[
        { side: 'left-5', dir: 'prev', icon: '←', fn: goPrev, init: { opacity: 0, x: -16 } },
        { side: 'right-5', dir: 'next', icon: '→', fn: goNext, init: { opacity: 0, x: 16 } },
      ].map((btn) => (
        <motion.button
          key={btn.dir}
          className={`absolute ${btn.side} top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-full flex items-center justify-center text-white/50 hover:text-white border border-white/8 hover:border-white/25 transition-all`}
          style={{ background: 'rgba(10,10,10,0.6)', backdropFilter: 'blur(12px)' }}
          onClick={btn.fn}
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(30,30,30,0.8)' }}
          whileTap={{ scale: 0.92 }}
          initial={btn.init}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 280, damping: 22 }}
        >
          <span className="text-sm">{btn.icon}</span>
        </motion.button>
      ))}

      {/* Dot nav */}
      <DotNav total={total} active={activeIndex} onDot={snapTo} />
    </div>
  )
}
