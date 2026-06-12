'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { href: '#hero',         label: 'Home' },
  { href: '#services',     label: 'Services' },
  { href: '#portfolio',    label: 'Portfolio' },
  { href: '#stats',        label: 'About' },
  { href: '#contact',      label: 'Contact' },
]

function MagneticLink({ href, label }: { href: string; label: string }) {
  const ref = useRef<HTMLAnchorElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`
  }
  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative text-sm font-medium text-white/70 hover:text-white transition-colors duration-300 magnetic group px-1 py-0.5"
    >
      {label}
      <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-[#00D9FF] to-[#7B61FF] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </a>
  )
}

export default function NavBar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass border-b border-white/8 shadow-[0_4px_40px_rgba(0,0,0,0.5)]'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="group flex items-center gap-3">
            <div className="relative">
              <div
                className="h-8 w-8 rounded-full"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, rgba(0,217,255,0.9), rgba(123,97,255,0.8) 60%, rgba(5,5,5,0.9))',
                  boxShadow: '0 0 20px rgba(0,217,255,0.4), 0 0 40px rgba(123,97,255,0.2)',
                }}
              />
              {/* Orbit ring on logo */}
              <div
                className="absolute inset-0 rounded-full border border-[#00D9FF]/30"
                style={{ transform: 'scale(1.6)', animation: 'orbit 6s linear infinite' }}
              />
            </div>
            <span
              className="font-display text-xl font-extrabold tracking-[0.22em]"
              style={{
                fontFamily: 'Syne, sans-serif',
                background: 'linear-gradient(90deg, #ffffff, #00D9FF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              PLUTO
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <MagneticLink key={l.href} {...l} />
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="relative overflow-hidden rounded-full px-5 py-2 text-sm font-semibold text-[#050505]"
              style={{
                background: 'linear-gradient(135deg, #00D9FF, #7B61FF)',
                boxShadow: '0 0 24px rgba(0,217,255,0.3)',
              }}
            >
              Get Started →
            </motion.a>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span className={`h-px w-6 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`h-px w-6 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`h-px w-6 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 z-40 w-72 glass-strong border-l border-white/10 flex flex-col pt-24 px-8 gap-6"
          >
            {NAV_LINKS.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="text-xl font-semibold text-white/80 hover:text-white hover:text-gradient-electric transition-all"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                {l.label}
              </motion.a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-4 rounded-full py-3 text-center text-sm font-semibold text-[#050505]"
              style={{ background: 'linear-gradient(135deg, #00D9FF, #7B61FF)' }}
            >
              Get Started →
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
