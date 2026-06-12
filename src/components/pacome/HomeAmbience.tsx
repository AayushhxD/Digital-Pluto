'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion'

/* ─── Data ──────────────────────────────────────────────── */
const CHIPS = [
  { label: 'ROAS', value: '4.1×', accent: '#00D9FF', x: 8, y: 18 },
  { label: 'organic / mo', value: '85K', accent: '#4ade80', x: 78, y: 12 },
  { label: 'churn', value: '−40%', accent: '#a78bfa', x: 88, y: 72 },
  { label: 'followers', value: '120K', accent: '#fb7185', x: 5, y: 68 },
  { label: 'revenue', value: '$2.4M', accent: '#fcd34d', x: 44, y: 6 },
  { label: 'scale', value: '10×', accent: '#fb923c', x: 14, y: 86 },
  { label: 'stockists', value: '500+', accent: '#38bdf8', x: 82, y: 88 },
]

/* ─── Floating orb blobs ─────────────────────────────────── */
const BLOBS = [
  { color: '#00D9FF22', size: 320, x: 15, y: 30, duration: 18 },
  { color: '#7B61FF22', size: 280, x: 75, y: 60, duration: 22 },
  { color: '#39ff1411', size: 200, x: 50, y: 80, duration: 14 },
  { color: '#fb718511', size: 240, x: 85, y: 20, duration: 26 },
]

/* ─── Shooting stars ─────────────────────────────────────── */
interface Star { id: number; x: number; y: number; angle: number; length: number; speed: number; color: string }

const STAR_COLORS = ['#00D9FF', '#7B61FF', '#ffffff', '#4ade80', '#fb7185']

function useShootingStars() {
  const [stars, setStars] = useState<Star[]>([])
  const idRef = useRef(0)

  useEffect(() => {
    const spawn = () => {
      const id = idRef.current++
      const star: Star = {
        id,
        x: Math.random() * 100,
        y: Math.random() * 40,
        angle: 20 + Math.random() * 30,
        length: 60 + Math.random() * 80,
        speed: 0.6 + Math.random() * 0.8,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      }
      setStars((s) => [...s, star])
      setTimeout(() => setStars((s) => s.filter((x) => x.id !== id)), 1200)
    }

    const interval = setInterval(spawn, 2200 + Math.random() * 1800)
    return () => clearInterval(interval)
  }, [])

  return stars
}

/* ─── Animated counter ───────────────────────────────────── */
function AnimatedValue({ value }: { value: string }) {
  const [displayed, setDisplayed] = useState('0')
  const hasRun = useRef(false)

  useEffect(() => {
    if (hasRun.current) return
    hasRun.current = true
    // just flash the value with a glitch effect
    const chars = '0123456789$%×K+'
    let frame = 0
    const total = 12
    const iv = setInterval(() => {
      frame++
      if (frame < total) {
        setDisplayed(
          value
            .split('')
            .map((c) => (/[0-9]/.test(c) ? chars[Math.floor(Math.random() * 10)] : c))
            .join('')
        )
      } else {
        setDisplayed(value)
        clearInterval(iv)
      }
    }, 40)
  }, [value])

  return <>{displayed}</>
}

/* ─── Stat chip ─────────────────────────────────────────── */
function StatChip({
  chip,
  delay,
}: {
  chip: (typeof CHIPS)[0]
  delay: number
}) {
  const yOffset = useMotionValue(0)
  const phaseRef = useRef(Math.random() * Math.PI * 2)
  const ampRef = useRef(6 + Math.random() * 8)
  const speedRef = useRef(0.4 + Math.random() * 0.4)

  useAnimationFrame((t) => {
    const secs = t / 1000
    yOffset.set(Math.sin(secs * speedRef.current + phaseRef.current) * ampRef.current)
  })

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${chip.x}%`, top: `${chip.y}%`, y: yOffset }}
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.7, type: 'spring', stiffness: 200, damping: 18 }}
    >
      <div
        className="flex flex-col items-start gap-0.5 px-3 py-2 rounded-xl"
        style={{
          background: 'rgba(0,0,0,0.55)',
          border: `1px solid ${chip.accent}44`,
          boxShadow: `0 0 16px ${chip.accent}22, inset 0 1px 0 rgba(255,255,255,0.06)`,
          backdropFilter: 'blur(12px)',
        }}
      >
        <span
          className="font-display font-bold text-base leading-none"
          style={{ color: chip.accent, textShadow: `0 0 12px ${chip.accent}88` }}
        >
          <AnimatedValue value={chip.value} />
        </span>
        <span className="text-[9px] uppercase tracking-[0.18em] text-white/35">{chip.label}</span>
      </div>
    </motion.div>
  )
}

/* ─── Grid of tiny pulsing dots ─────────────────────────── */
function PulseDots() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 2,
            height: 2,
            left: `${5 + (i % 6) * 18}%`,
            top: `${10 + Math.floor(i / 6) * 35}%`,
            background: i % 3 === 0 ? '#00D9FF' : i % 3 === 1 ? '#7B61FF' : '#fff',
          }}
          animate={{
            opacity: [0.08, 0.5, 0.08],
            scale: [1, 1.8, 1],
          }}
          transition={{
            duration: 2.5 + (i % 3) * 0.7,
            delay: i * 0.15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

/* ─── Ambient floating blobs ─────────────────────────────── */
function AmbientBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {BLOBS.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: b.size,
            height: b.size,
            left: `${b.x}%`,
            top: `${b.y}%`,
            background: `radial-gradient(circle, ${b.color} 0%, transparent 70%)`,
            filter: 'blur(40px)',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 30, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

/* ─── Shooting star line ─────────────────────────────────── */
function ShootingStar({ star }: { star: Star }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${star.x}%`,
        top: `${star.y}%`,
        rotate: star.angle,
        zIndex: 1,
      }}
      initial={{ opacity: 0, x: 0 }}
      animate={{ opacity: [0, 1, 0], x: star.length * 3 }}
      transition={{ duration: star.speed, ease: 'easeIn' }}
    >
      <div
        style={{
          width: star.length,
          height: 1.5,
          background: `linear-gradient(90deg, transparent, ${star.color}, transparent)`,
          boxShadow: `0 0 6px ${star.color}`,
          borderRadius: 2,
        }}
      />
    </motion.div>
  )
}

/* ─── Main export ────────────────────────────────────────── */
export default function HomeAmbience() {
  const stars = useShootingStars()

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {/* Ambient color blobs */}
      <AmbientBlobs />

      {/* Tiny pulse dots */}
      <PulseDots />

      {/* Shooting stars */}
      {stars.map((s) => (
        <ShootingStar key={s.id} star={s} />
      ))}

      {/* Stat chips */}
      {CHIPS.map((chip, i) => (
        <StatChip key={chip.label} chip={chip} delay={0.3 + i * 0.12} />
      ))}

      {/* Corner decorators */}
      <motion.div
        className="absolute top-16 left-8 w-16 h-16 rounded-full border border-white/08"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{ borderColor: 'rgba(0,217,255,0.12)' }}
      >
        <div className="absolute top-0 left-1/2 w-1 h-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric" style={{ background: '#00D9FF' }} />
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-10 w-10 h-10 rounded-full border"
        animate={{ rotate: -360 }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        style={{ borderColor: 'rgba(123,97,255,0.18)' }}
      >
        <div className="absolute top-0 left-1/2 w-1 h-1 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: '#7B61FF' }} />
      </motion.div>

      {/* Bottom marquee ticker */}
      <div className="absolute bottom-0 left-0 right-0 h-7 overflow-hidden" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="marquee-track flex gap-12 items-center h-full whitespace-nowrap">
          {Array.from({ length: 3 }).flatMap(() =>
            ['strategy', '·', 'creative', '·', 'performance', '·', 'seo', '·', 'ppc', '·', 'branding', '·', 'social', '·', 'analytics', '·'].map(
              (w, i) => (
                <span
                  key={`${w}-${i}`}
                  className="text-[9px] uppercase tracking-[0.25em] text-white/20"
                  style={w === '·' ? { color: 'rgba(0,217,255,0.3)' } : {}}
                >
                  {w}
                </span>
              )
            )
          )}
        </div>
      </div>
    </div>
  )
}
