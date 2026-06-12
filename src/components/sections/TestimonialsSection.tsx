'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const TESTIMONIALS = [
  {
    id: 't1',
    name: 'Sarah Chen',
    role: 'CEO, Apex Fitness Co.',
    avatar: '👩‍💼',
    quote: 'Pluto completely transformed our digital presence. Within 90 days we saw a 380% improvement in ROAS and our brand finally felt as premium as our product.',
    result: '+380% ROAS',
    stars: 5,
    color: '#00D9FF',
  },
  {
    id: 't2',
    name: 'Marcus Rivera',
    role: 'Founder, Nova SaaS',
    avatar: '🧑‍💻',
    quote: "The rebrand was game-changing. Our churn dropped 40% because customers finally understood our value prop. Pluto's strategy is genuinely out of this world.",
    result: '-40% churn',
    stars: 5,
    color: '#7B61FF',
  },
  {
    id: 't3',
    name: 'Priya Nair',
    role: 'CMO, Terra Sustainable',
    avatar: '👩‍🔬',
    quote: 'We went from zero organic traffic to 85,000 monthly visitors in 10 months. Pluto\'s SEO team are absolute wizards — worth every penny.',
    result: '85K organic/mo',
    stars: 5,
    color: '#34d399',
  },
  {
    id: 't4',
    name: 'Jake Thompson',
    role: 'Co-founder, Sol Beverages',
    avatar: '🧑‍🍳',
    quote: "Six months post-launch we had 500 stockists and had closed our Series A. Pluto's launch strategy was the difference between success and obscurity.",
    result: 'Series A closed',
    stars: 5,
    color: '#f0abfc',
  },
]

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const titleRef = useRef<HTMLDivElement>(null)
  const inView = useInView(titleRef, { once: true, margin: '-100px' })

  const t = TESTIMONIALS[current]

  return (
    <section id="testimonials" data-section="testimonials" className="relative min-h-screen py-32 overflow-hidden flex flex-col justify-center">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(123,97,255,0.1), transparent 60%)',
        }}
      />

      <div className="mx-auto max-w-5xl px-6">
        <div ref={titleRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#7B61FF]/25 bg-[#7B61FF]/8 px-4 py-1.5 text-xs text-[#7B61FF] mb-5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#7B61FF]" />
            Client Stories
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800 }}
            className="text-gradient-electric"
          >
            Mission Commanders Speak
          </motion.h2>
        </div>

        {/* Holographic panel */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-3xl border border-white/10 p-10 sm:p-14 glass-strong"
          style={{ boxShadow: `0 0 60px ${t.color}18, 0 40px 100px rgba(0,0,0,0.6)` }}
        >
          {/* Glare */}
          <div
            className="pointer-events-none absolute inset-0 rounded-3xl opacity-40"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%)',
            }}
          />

          {/* Top bar */}
          <div
            className="absolute top-0 inset-x-0 h-px rounded-t-3xl"
            style={{ background: `linear-gradient(90deg, transparent, ${t.color}80, transparent)` }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(t.stars)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-lg">★</span>
                ))}
              </div>

              {/* Quote */}
              <blockquote
                className="text-xl sm:text-2xl text-white/80 leading-relaxed mb-8 font-light"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                "{t.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div
                    className="h-12 w-12 rounded-full flex items-center justify-center text-2xl border border-white/10"
                    style={{ background: `${t.color}20` }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>{t.name}</div>
                    <div className="text-xs text-white/40 mt-0.5">{t.role}</div>
                  </div>
                </div>

                <div
                  className="rounded-full px-4 py-2 text-sm font-bold"
                  style={{
                    background: `${t.color}20`,
                    border: `1px solid ${t.color}40`,
                    color: t.color,
                    textShadow: `0 0 12px ${t.color}`,
                  }}
                >
                  {t.result}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex items-center gap-3 mt-10">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === current ? 24 : 8,
                  height: 8,
                  background: i === current
                    ? `linear-gradient(90deg, #00D9FF, #7B61FF)`
                    : 'rgba(255,255,255,0.2)',
                  boxShadow: i === current ? '0 0 12px rgba(0,217,255,0.5)' : 'none',
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
