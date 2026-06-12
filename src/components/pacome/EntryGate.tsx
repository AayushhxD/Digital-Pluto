'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { PLUTO_TAGLINE } from '@/data/plutoContent'

const PacomeOrb = dynamic(() => import('./PacomeOrb'), { ssr: false })

interface EntryGateProps {
  onEnter: () => void
}

/* ── Typewriter hook ─────────────────────────────── */
function useTypewriter(lines: string[], speed = 42, pauseBetween = 520) {
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const [done, setDone] = useState(false)

  // Type characters
  useEffect(() => {
    if (done) return
    const currentLine = lines[lineIndex]
    if (charIndex < currentLine.length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), speed + Math.random() * 18)
      return () => clearTimeout(t)
    } else if (lineIndex < lines.length - 1) {
      // Pause then move to next line
      const t = setTimeout(() => {
        setLineIndex((l) => l + 1)
        setCharIndex(0)
      }, pauseBetween)
      return () => clearTimeout(t)
    } else {
      // All done — let cursor blink a couple more times then hide
      const t = setTimeout(() => setDone(true), 900)
      return () => clearTimeout(t)
    }
  }, [charIndex, lineIndex, lines, speed, pauseBetween, done])

  // Cursor blink
  useEffect(() => {
    const iv = setInterval(() => setShowCursor((s) => !s), 520)
    return () => clearInterval(iv)
  }, [])

  const typed = lines.map((line, i) => {
    if (i < lineIndex) return line
    if (i === lineIndex) return line.slice(0, charIndex)
    return ''
  })

  return { typed, showCursor: !done && showCursor, done }
}

/* ── Blinking cursor ─────────────────────────────── */
function Cursor({ visible, accent }: { visible: boolean; accent: string }) {
  return (
    <span
      aria-hidden
      className="inline-block w-[2px] h-[0.85em] ml-[2px] rounded-sm align-middle"
      style={{
        background: accent,
        opacity: visible ? 1 : 0,
        boxShadow: visible ? `0 0 8px ${accent}` : 'none',
        transition: 'opacity 0.08s, box-shadow 0.08s',
        verticalAlign: 'middle',
      }}
    />
  )
}

export default function EntryGate({ onEnter }: EntryGateProps) {
  const LINES = [PLUTO_TAGLINE.line1, PLUTO_TAGLINE.line2]
  const ACCENT = '#00D9FF'

  const { typed, showCursor, done } = useTypewriter(LINES, 44, 480)

  // Which line the cursor is on (the last line still being typed)
  const activeLine = typed.findIndex((t, i) => t.length < LINES[i].length)
  const cursorLine = activeLine === -1 ? LINES.length - 1 : activeLine

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black px-6"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Subtle ambient glow behind orb */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 320,
          height: 320,
          background: `radial-gradient(circle, ${ACCENT}12 0%, transparent 70%)`,
          filter: 'blur(40px)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -68%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="flex flex-col items-center text-center"
      >
        {/* Rotating Pluto orb */}
        <PacomeOrb size="lg" className="mb-8 sm:mb-10" />

        {/* Typewriter headline */}
        <h1 className="font-display text-[clamp(1.6rem,4.5vw,3rem)] font-bold leading-[1.12] tracking-[-0.02em] text-white lowercase min-h-[2.8em]">
          {/* Line 1 */}
          <span className="block">
            {typed[0] || ''}
            {cursorLine === 0 && (
              <Cursor visible={showCursor} accent={ACCENT} />
            )}
          </span>

          {/* Line 2 — only renders once line 1 is complete or in progress */}
          <AnimatePresence>
            {typed[1] !== undefined && (
              <motion.span
                className="block text-white/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.18 }}
              >
                {typed[1]}
                {cursorLine === 1 && (
                  <Cursor visible={showCursor} accent={ACCENT} />
                )}
              </motion.span>
            )}
          </AnimatePresence>
        </h1>

        {/* Enter button — fades in slightly after mount rather than waiting for typewriter */}
        <AnimatePresence>
          <motion.button
            type="button"
            onClick={onEnter}
            className="pacome-pill mt-10 sm:mt-12"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            enter portfolio
            <span className="pacome-dot" />
          </motion.button>
        </AnimatePresence>
      </motion.div>

      {/* Subtle scanline at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}30, transparent)` }}
      />
    </motion.div>
  )
}
