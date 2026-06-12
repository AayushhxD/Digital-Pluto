'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const PROJECTS = [
  {
    id: 'apex',
    category: 'Growth + Paid',
    title: 'Apex Fitness Co.',
    desc: 'Transformed a mid-size gym brand into a $4.2M revenue machine through viral TikTok campaigns and precision Meta ads.',
    results: ['+380% ROAS', '$4.2M revenue', '620K followers'],
    color: '#00D9FF',
    emoji: '💪',
  },
  {
    id: 'nova',
    category: 'Brand + Web',
    title: 'Nova SaaS Platform',
    desc: 'Complete brand overhaul — logo, design system, and landing pages — cutting churn 40% with premium positioning.',
    results: ['-40% churn', '2.9× conversion', 'Awwwards nom.'],
    color: '#7B61FF',
    emoji: '⚡',
  },
  {
    id: 'terra',
    category: 'SEO + Content',
    title: 'Terra Sustainable Co.',
    desc: 'Content-led SEO strategy that took a D2C brand from zero to 85,000 monthly organic visitors in 10 months.',
    results: ['85K organic/mo', '#1 for 40+ terms', '320% ROAS'],
    color: '#34d399',
    emoji: '🌱',
  },
  {
    id: 'pulse',
    category: 'Social Media',
    title: 'Pulse Media Group',
    desc: 'Built a full-funnel social ecosystem across 6 platforms, driving 120K engaged followers and 18% engagement rates.',
    results: ['120K followers', '18% engagement', '5× reach'],
    color: '#f0abfc',
    emoji: '📱',
  },
  {
    id: 'orbit',
    category: 'AI Automation',
    title: 'Orbit Retail Chain',
    desc: 'Deployed AI-powered personalisation and marketing automation across 200 retail locations, scaling operations 10×.',
    results: ['10× scale', '90% time saved', '+$8M revenue'],
    color: '#00D9FF',
    emoji: '🤖',
  },
  {
    id: 'sol',
    category: 'Launch Strategy',
    title: 'Sol Beverage Brand',
    desc: 'Full-stack launch strategy for a premium sparkling water brand — from zero to 500 stockists in 6 months.',
    results: ['500 stockists', '1.2M launch reach', 'Series A funded'],
    color: '#7B61FF',
    emoji: '🥤',
  },
]

const CATEGORIES = ['All', 'Growth + Paid', 'Brand + Web', 'SEO + Content', 'Social Media', 'AI Automation', 'Launch Strategy']

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative rounded-2xl border border-white/8 overflow-hidden group cursor-pointer"
      style={{
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(20px)',
        boxShadow: hovered
          ? `0 0 40px ${project.color}20, 0 24px 64px rgba(0,0,0,0.5)`
          : '0 8px 32px rgba(0,0,0,0.3)',
        transition: 'box-shadow 0.4s ease',
      }}
    >
      {/* Top gradient bar */}
      <div
        className="h-1.5 w-full transition-all duration-500 group-hover:h-2"
        style={{
          background: `linear-gradient(90deg, ${project.color}, rgba(123,97,255,0.7))`,
          boxShadow: `0 0 16px ${project.color}60`,
        }}
      />

      {/* Hover bg glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle at 50% 0%, ${project.color}15, transparent 70%)` }}
      />

      <div className="p-7 relative">
        <div className="flex items-start justify-between mb-4">
          <span className="text-3xl">{project.emoji}</span>
          <span
            className="text-xs font-medium rounded-full px-3 py-1"
            style={{
              background: `${project.color}15`,
              border: `1px solid ${project.color}30`,
              color: project.color,
            }}
          >
            {project.category}
          </span>
        </div>

        <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.15rem', color: '#fff', marginBottom: 8 }}>
          {project.title}
        </h3>

        <p className="text-sm text-white/45 leading-relaxed mb-5">{project.desc}</p>

        <div className="flex flex-wrap gap-2">
          {project.results.map((r) => (
            <span
              key={r}
              className="text-xs font-bold rounded-full px-3 py-1"
              style={{
                background: `${project.color}18`,
                border: `1px solid ${project.color}35`,
                color: project.color,
              }}
            >
              {r}
            </span>
          ))}
        </div>

        <div
          className="mt-5 flex items-center gap-1.5 text-xs font-medium opacity-0 group-hover:opacity-100 group-hover:gap-3 transition-all duration-300"
          style={{ color: project.color }}
        >
          View Case Study →
        </div>
      </div>
    </motion.div>
  )
}

export default function PortfolioSection() {
  const [active, setActive] = useState('All')
  const titleRef = useRef<HTMLDivElement>(null)
  const inView = useInView(titleRef, { once: true, margin: '-100px' })

  const filtered = active === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === active)

  return (
    <section id="portfolio" data-section="portfolio" className="relative min-h-screen py-32 overflow-hidden flex flex-col justify-center">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 80% 20%, rgba(0,217,255,0.07), transparent 55%), radial-gradient(ellipse 60% 50% at 20% 80%, rgba(123,97,255,0.07), transparent 55%)',
        }}
      />

      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div ref={titleRef} className="mb-14 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#7B61FF]/25 bg-[#7B61FF]/8 px-4 py-1.5 text-xs text-[#7B61FF] mb-5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#7B61FF]" />
            Case Studies
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 800 }}
            className="text-gradient-electric"
          >
            Work That Orbits
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-white/45 max-w-xl mx-auto"
          >
            Real results for real brands. No fluff — just numbers.
          </motion.p>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300"
              style={{
                background: active === cat ? 'linear-gradient(135deg, #00D9FF, #7B61FF)' : 'rgba(255,255,255,0.05)',
                color: active === cat ? '#050505' : 'rgba(255,255,255,0.55)',
                border: active === cat ? 'none' : '1px solid rgba(255,255,255,0.1)',
                boxShadow: active === cat ? '0 0 20px rgba(0,217,255,0.3)' : 'none',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
