'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const SERVICES = [
  {
    id: 'seo',
    icon: '📡',
    title: 'SEO & Search',
    desc: 'Dominate search rankings with technical precision, content strategy, and authority building that compounds over time.',
    metrics: ['+340% organic traffic', '#1 rankings in 90d'],
    color: '#00D9FF',
    gradient: 'from-[#00D9FF]/20 to-[#7B61FF]/10',
  },
  {
    id: 'social',
    icon: '🌐',
    title: 'Social Media',
    desc: 'Culturally-native content that builds communities, drives virality, and converts followers into loyal customers.',
    metrics: ['120K+ monthly reach', '4.8× engagement'],
    color: '#7B61FF',
    gradient: 'from-[#7B61FF]/20 to-[#f0abfc]/10',
  },
  {
    id: 'paid',
    icon: '📈',
    title: 'Performance Ads',
    desc: 'Full-funnel paid campaigns across Google, Meta, TikTok, and LinkedIn — built for measurable ROAS.',
    metrics: ['3.8× ROAS avg.', '$24M revenue driven'],
    color: '#f0abfc',
    gradient: 'from-[#f0abfc]/20 to-[#00D9FF]/10',
  },
  {
    id: 'brand',
    icon: '💎',
    title: 'Brand Identity',
    desc: 'Logo systems, visual languages, and brand guidelines that make your company unforgettable at every touchpoint.',
    metrics: ['50+ brands built', 'Award-winning creative'],
    color: '#00D9FF',
    gradient: 'from-[#00D9FF]/15 to-transparent',
  },
  {
    id: 'ai',
    icon: '🤖',
    title: 'AI Automation',
    desc: 'Marketing automation, AI-generated personalisation, and workflow systems that scale your growth 24/7.',
    metrics: ['90% time saved', 'Real-time optimisation'],
    color: '#7B61FF',
    gradient: 'from-[#7B61FF]/15 to-transparent',
  },
  {
    id: 'content',
    icon: '✍️',
    title: 'Content Studio',
    desc: 'From blog posts to video scripts to campaign copy — cinematic storytelling that moves people to act.',
    metrics: ['10M+ monthly reads', '65% conversion lift'],
    color: '#f0abfc',
    gradient: 'from-[#f0abfc]/15 to-transparent',
  },
]

function ServiceCard({ svc, index }: { svc: typeof SERVICES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`relative rounded-2xl p-7 border border-white/8 bg-gradient-to-br ${svc.gradient} backdrop-blur-xl group overflow-hidden animated-border`}
      style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.05) inset, 0 24px 64px rgba(0,0,0,0.4)' }}
    >
      {/* Hover glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{ background: `radial-gradient(circle at 50% 0%, ${svc.color}20, transparent 65%)` }}
      />

      {/* Bottom accent */}
      <div
        className="absolute bottom-0 inset-x-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${svc.color}, transparent)` }}
      />

      <div className="relative">
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4 + index * 0.4, repeat: Infinity, ease: 'easeInOut' }}
          className="text-3xl mb-5"
        >
          {svc.icon}
        </motion.div>

        <h3
          className="text-lg font-bold text-white mb-3"
          style={{ fontFamily: 'Syne, sans-serif' }}
        >
          {svc.title}
        </h3>

        <p className="text-sm text-white/50 leading-relaxed mb-5">{svc.desc}</p>

        <div className="flex flex-wrap gap-2">
          {svc.metrics.map((m) => (
            <span
              key={m}
              className="rounded-full px-3 py-1 text-xs font-medium"
              style={{
                background: `${svc.color}18`,
                border: `1px solid ${svc.color}30`,
                color: svc.color,
              }}
            >
              {m}
            </span>
          ))}
        </div>

        <div
          className="mt-5 flex items-center gap-1.5 text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300"
          style={{ color: svc.color }}
        >
          Learn more →
        </div>
      </div>
    </motion.div>
  )
}

export default function ServicesSection() {
  const titleRef = useRef<HTMLDivElement>(null)
  const inView = useInView(titleRef, { once: true, margin: '-100px' })

  return (
    <section id="services" data-section="services" className="relative min-h-screen py-32 overflow-hidden flex flex-col justify-center">
      {/* Background nebula */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 20% 50%, rgba(123,97,255,0.08), transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(0,217,255,0.07), transparent 55%)',
        }}
      />

      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div ref={titleRef} className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#00D9FF]/25 bg-[#00D9FF]/8 px-4 py-1.5 text-xs text-[#00D9FF] mb-5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#00D9FF]" />
            What We Do
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="scroll-reveal text-gradient-electric"
            style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 800 }}
          >
            Mission-Grade Services
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 max-w-xl mx-auto text-white/50 text-base"
          >
            Every capability in orbit around one goal — making your brand inevitable.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((svc, i) => (
            <ServiceCard key={svc.id} svc={svc} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
