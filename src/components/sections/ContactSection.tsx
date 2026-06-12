'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function ContactSection() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', message: '' })
  const titleRef = useRef<HTMLDivElement>(null)
  const inView = useInView(titleRef, { once: true, margin: '-100px' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 5000)
    setForm({ name: '', email: '', company: '', service: '', message: '' })
  }

  const inputClass = `w-full rounded-xl border border-white/10 bg-white/4 px-4 py-3.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#00D9FF]/60 focus:bg-white/6 focus:shadow-[0_0_0_3px_rgba(0,217,255,0.1)] transition-all duration-300 backdrop-blur-sm`

  return (
    <section id="contact" data-section="contact" className="relative min-h-screen py-32 overflow-hidden flex flex-col justify-center">
      {/* Bg */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(123,97,255,0.14), transparent 55%), radial-gradient(ellipse 50% 40% at 20% 30%, rgba(0,217,255,0.08), transparent 55%)',
        }}
      />

      {/* Grid */}
      <div className="pointer-events-none absolute inset-0 mesh-grid opacity-100" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#00D9FF]/25 bg-[#00D9FF]/8 px-4 py-1.5 text-xs text-[#00D9FF] mb-5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#00D9FF] animate-pulse shadow-[0_0_8px_#00D9FF]" />
            Mission Control
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 800 }}
            className="text-gradient-electric"
          >
            Ready for Liftoff?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-white/45 max-w-lg mx-auto"
          >
            Send us your mission brief. We'll respond within 24 hours with a tailored trajectory.
          </motion.p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] items-start">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.15 }}
            className="space-y-5"
          >
            {/* Mission brief card */}
            <div
              className="rounded-2xl border border-white/8 p-7 glass"
              style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(123,97,255,0.1)' }}
            >
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.1rem', marginBottom: 12, color: '#fff' }}>
                🚀 Launch Your Brand Into Orbit
              </h3>
              <p className="text-sm text-white/45 leading-relaxed mb-6">
                Tell us your mission. We'll return with a creative strategy, timeline, and action plan — no fluff, just clarity.
              </p>
              <ul className="space-y-3">
                {[
                  { icon: '🎯', text: 'Full strategy + execution' },
                  { icon: '🖌️', text: 'Creative that wins awards' },
                  { icon: '📡', text: 'Data-driven performance' },
                  { icon: '🤝', text: 'Long-term partnership' },
                ].map((item) => (
                  <li key={item.text} className="flex items-center gap-3 text-sm text-white/55">
                    <span>{item.icon}</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact info */}
            {[
              { icon: '📡', label: 'Signal', value: 'signal@pluto.agency' },
              { icon: '🌍', label: 'Orbit', value: 'Remote-first · Worldwide' },
              { icon: '⚡', label: 'Response', value: 'Within 24 hours' },
            ].map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ x: 4 }}
                className="rounded-xl border border-white/8 p-4 flex items-center gap-4 glass transition-all"
              >
                <div
                  className="h-10 w-10 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                  style={{ background: 'rgba(0,217,255,0.1)', border: '1px solid rgba(0,217,255,0.2)' }}
                >
                  {item.icon}
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-white/30">{item.label}</div>
                  <div className="text-sm text-white/70">{item.value}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.2 }}
            className="rounded-2xl border border-white/10 p-8 glass-strong"
            style={{ boxShadow: '0 0 60px rgba(123,97,255,0.12), 0 40px 100px rgba(0,0,0,0.5)' }}
          >
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.18em] text-white/35 block mb-2">Name *</label>
                  <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={inputClass} placeholder="Mission captain" />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.18em] text-white/35 block mb-2">Email *</label>
                  <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className={inputClass} placeholder="signal@brand.com" />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.18em] text-white/35 block mb-2">Company</label>
                <input value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} className={inputClass} placeholder="Brand / organisation name" />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.18em] text-white/35 block mb-2">Service Needed</label>
                <select
                  value={form.service}
                  onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
                  className={inputClass}
                  style={{ appearance: 'none' }}
                >
                  <option value="" style={{ background: '#0a0a14' }}>Select a service...</option>
                  {['SEO & Search', 'Social Media', 'Performance Ads', 'Brand Identity', 'AI Automation', 'Content Studio', 'Full-Service'].map(s => (
                    <option key={s} value={s} style={{ background: '#0a0a14' }}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.18em] text-white/35 block mb-2">Mission Brief *</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className={`${inputClass} resize-none py-3`}
                  placeholder="Describe your brand, goals, and what success looks like in 12 months..."
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-4 flex-wrap">
              <span className="text-xs text-white/25" aria-live="polite">
                {sent ? (
                  <span className="flex items-center gap-2 text-[#00D9FF]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00D9FF] shadow-[0_0_8px_#00D9FF]" />
                    Transmission received — we'll be in touch!
                  </span>
                ) : 'No spam. Just orbit-ready clarity.'}
              </span>

              <motion.button
                type="submit"
                disabled={sent}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="relative overflow-hidden rounded-full px-7 py-3 text-sm font-semibold text-[#050505] disabled:opacity-70"
                style={{
                  background: 'linear-gradient(135deg, #00D9FF, #7B61FF)',
                  boxShadow: '0 0 30px rgba(0,217,255,0.35)',
                }}
              >
                {sent ? '✓ Sent!' : 'Send Transmission →'}
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
