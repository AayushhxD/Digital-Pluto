'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

function CountUp({ end, suffix = '', prefix = '', duration = 2.2 }: { end: number; suffix?: string; prefix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const step = (now: number) => {
      const elapsed = (now - start) / (duration * 1000)
      const progress = Math.min(elapsed, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(ease * end))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, end, duration])

  return <span ref={ref}>{prefix}{count}{suffix}</span>
}

const STATS = [
  { value: 120, suffix: '+', label: 'Brands Launched',        icon: '🚀', color: '#00D9FF' },
  { value: 380, suffix: '%', label: 'Avg. ROAS Increase',     icon: '📈', color: '#7B61FF' },
  { value: 94,  suffix: '%', label: 'Client Retention',       icon: '🤝', color: '#34d399' },
  { value: 24,  suffix: 'M+',label: 'Revenue Generated', prefix:'$', icon: '💰', color: '#f0abfc' },
  { value: 8,   suffix: '+', label: 'Years in Orbit',         icon: '⭐', color: '#00D9FF' },
  { value: 50,  suffix: '+', label: 'Awards Won',             icon: '🏆', color: '#7B61FF' },
]

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="stats" data-section="stats" className="relative min-h-screen py-24 overflow-hidden border-y border-white/6 flex items-center">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,217,255,0.06), transparent 60%)' }}
      />

      <div ref={ref} className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="relative text-center group"
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
                className="text-2xl mb-3"
              >
                {s.icon}
              </motion.div>

              <div
                className="text-4xl font-extrabold leading-none mb-1 num-glow"
                style={{
                  fontFamily: 'Syne, sans-serif',
                  background: `linear-gradient(135deg, ${s.color}, #ffffff)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                <CountUp end={s.value} suffix={s.suffix} prefix={s.prefix ?? ''} />
              </div>

              <div className="text-xs text-white/35 leading-snug">{s.label}</div>

              {/* Hover underline */}
              <div
                className="absolute bottom-0 inset-x-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"
                style={{ background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
