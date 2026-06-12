'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import MagneticButton from '@/components/ui/MagneticButton'

const WORDS = ['Marketing', 'Branding', 'Strategy', 'Growth', 'Creative']

function Typewriter() {
  const [index, setIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = WORDS[index]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 90)
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 2200)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 55)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setIndex((i) => (i + 1) % WORDS.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, deleting, index])

  return (
    <span
      style={{
        background: 'linear-gradient(135deg, #00D9FF, #7B61FF)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
      {displayed}
      <span className="text-[#00D9FF] animate-pulse">|</span>
    </span>
  )
}

export default function HeroSection() {
  return (
    <section
      id="hero"
      data-section="hero"
      className="relative min-h-screen overflow-hidden flex items-center"
      style={{ background: 'radial-gradient(ellipse 80% 80% at 50% -10%, rgba(123,97,255,0.15), transparent 55%)' }}
    >
      {/* Deep space gradient overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 70% at 75% 50%, transparent, rgba(5,5,5,0.55) 65%), radial-gradient(ellipse at 0% 100%, rgba(5,5,5,0.85), transparent 50%)',
        }}
      />

      {/* Mesh grid */}
      <div className="absolute inset-0 z-0 mesh-grid opacity-100 pointer-events-none" />

      {/* Hero copy — left side */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 w-full">
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-[#00D9FF]/30 bg-[#00D9FF]/8 px-4 py-1.5 text-xs text-[#00D9FF] mb-7 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#00D9FF] animate-pulse shadow-[0_0_8px_#00D9FF]" />
            Awwwards-Level Digital Agency
          </motion.div>

          {/* Headline */}
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, lineHeight: 1.02 }}>
            {['Out of This', 'World'].map((line, i) => (
              <motion.span
                key={line}
                className="block"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 + i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontSize: 'clamp(3rem, 7vw, 6rem)',
                  background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {line}
              </motion.span>
            ))}
            <motion.span
              className="block"
              style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.69, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <Typewriter />
            </motion.span>
          </h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7 }}
            className="mt-6 text-base sm:text-lg text-white/55 max-w-lg leading-relaxed"
          >
            Premium strategy · immersive creative · performance at scale.
            We launch brands into orbit — with cinematic precision.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.7 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <MagneticButton href="#contact">Launch Your Brand 🚀</MagneticButton>
            <MagneticButton href="#services" variant="ghost">Explore Services ↓</MagneticButton>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="mt-14 flex items-center gap-5"
          >
            <div className="flex -space-x-3">
              {['🧑‍🚀','👩‍💼','👨‍🎨','👩‍💻','🧑‍💻'].map((e, i) => (
                <div
                  key={i}
                  className="h-9 w-9 rounded-full border-2 border-[#050505] flex items-center justify-center text-base"
                  style={{
                    background: `hsl(${220 + i*40}, 60%, 22%)`,
                    boxShadow: '0 0 0 1px rgba(255,255,255,0.1)',
                  }}
                >
                  {e}
                </div>
              ))}
            </div>
            <div>
              <div className="flex gap-0.5">{[...Array(5)].map((_,i)=><span key={i} className="text-amber-400 text-xs">★</span>)}</div>
              <div className="text-xs text-white/40 mt-0.5">120+ brands launched into orbit</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">Scroll</span>
        <div className="h-10 w-px bg-gradient-to-b from-[#00D9FF]/60 to-transparent" />
        <div className="h-1.5 w-1.5 rounded-full bg-[#00D9FF] shadow-[0_0_10px_#00D9FF]" />
      </motion.div>

      {/* Bottom vignette */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#050505] z-10" />
    </section>
  )
}
