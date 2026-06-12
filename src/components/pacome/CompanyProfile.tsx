'use client'

import { useRef } from 'react'
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from 'framer-motion'

/* ─── reusable fade-up reveal ─────────────────────────── */
function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* ─── section label ────────────────────────────────────── */
function SectionLabel({ text }: { text: string }) {
  return (
    <Reveal>
      <div className="flex items-center gap-3 mb-4">
        <div className="h-px flex-1 max-w-[40px]" style={{ background: 'rgba(0,217,255,0.4)' }} />
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/35">{text}</span>
      </div>
    </Reveal>
  )
}

/* ─── neon divider ─────────────────────────────────────── */
function Divider() {
  return (
    <div className="neon-divider my-20 sm:my-28" />
  )
}

/* ─── SECTION: How We Work ─────────────────────────────── */
const HOW_STEPS = [
  { n: '01', label: 'Research', desc: 'We research every aspect of the project — market mapping, competitor audit, audience profiling — before writing a single line of strategy.' },
  { n: '02', label: 'Recreate', desc: 'We rebuild the sales funnel and content architecture from scratch, tailored to achieve new heights for your specific goals.' },
  { n: '03', label: 'Results', desc: 'Our first two Rs fuel this one. Data-backed performance, reported transparently, improved continuously.' },
]

function HowWeWork() {
  return (
    <section className="max-w-5xl mx-auto px-6 sm:px-10">
      <SectionLabel text="how we work" />
      <Reveal>
        <h2 className="font-display text-4xl sm:text-6xl font-bold lowercase leading-[1.05] mb-16 text-white">
          the 3<span className="text-gradient-electric">'R'</span> strategy
        </h2>
      </Reveal>
      <div className="grid sm:grid-cols-3 gap-6">
        {HOW_STEPS.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.1}>
            <div
              className="relative overflow-hidden rounded-2xl p-7 h-full group"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              {/* hover glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'radial-gradient(ellipse at top left, rgba(0,217,255,0.08) 0%, transparent 60%)' }}
              />
              <span
                className="font-display text-6xl font-bold leading-none mb-4 block"
                style={{ color: 'rgba(0,217,255,0.15)' }}
              >
                {s.n}
              </span>
              <h3 className="font-display text-xl font-bold lowercase text-white mb-3">{s.label}</h3>
              <p className="text-sm text-white/40 leading-relaxed">{s.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ─── SECTION: Services ────────────────────────────────── */
const SERVICES = [
  {
    cat: 'Design',
    accent: '#00D9FF',
    icon: '✦',
    items: [
      'Graphics Posts', 'Video Posts / Reels', 'Organic Social Media Growth',
      'Account & Page Handling', 'Competition Research', 'Strategy Building',
      'Posting on Trends', 'Calendar (Event) Posting',
    ],
  },
  {
    cat: 'Marketing',
    accent: '#7B61FF',
    icon: '◈',
    items: [
      'Google Ads', 'Facebook Ads', 'LinkedIn Ads', 'YouTube Ads',
      'WhatsApp Campaign', 'E-mail Campaign', 'Commercial Database', 'Customer Database',
    ],
  },
  {
    cat: 'Development',
    accent: '#4ade80',
    icon: '⬡',
    items: [
      'Domain & Hosting', 'Website Development', 'Website Research',
      'SEO (On-page & Off-page)', 'Backlinks Generation', 'Website Optimisation',
      'Website Security', 'Bugs Removal',
    ],
  },
]

function Services() {
  return (
    <section className="max-w-5xl mx-auto px-6 sm:px-10">
      <SectionLabel text="our services" />
      <Reveal>
        <h2 className="font-display text-4xl sm:text-6xl font-bold lowercase leading-[1.05] mb-16 text-white">
          what we <span className="text-gradient-warm">deliver</span>
        </h2>
      </Reveal>
      <div className="grid sm:grid-cols-3 gap-6">
        {SERVICES.map((svc, si) => (
          <Reveal key={svc.cat} delay={si * 0.12}>
            <div
              className="rounded-2xl p-7 h-full relative overflow-hidden group"
              style={{
                background: `linear-gradient(145deg, ${svc.accent}10 0%, rgba(0,0,0,0) 60%)`,
                border: `1px solid ${svc.accent}28`,
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl" style={{ color: svc.accent }}>{svc.icon}</span>
                <h3 className="font-display text-lg font-bold lowercase text-white">{svc.cat}</h3>
              </div>
              <ul className="space-y-2">
                {svc.items.map((item, ii) => (
                  <motion.li
                    key={item}
                    className="flex items-center gap-2.5 text-sm text-white/50"
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: si * 0.1 + ii * 0.04, duration: 0.4 }}
                  >
                    <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: svc.accent }} />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ─── SECTION: Growth timeline ─────────────────────────── */
const GROWTH = [
  { year: '2019', clients: 3, founders: 'Founded by Avdhut Sutar & Omkar Bhosale' },
  { year: '2020', clients: 6, founders: null },
  { year: '2021', clients: 8, founders: null },
  { year: '2022', clients: 13, founders: null },
  { year: '2023', clients: 20, founders: null },
]

function Growth() {
  const max = 20
  return (
    <section className="max-w-5xl mx-auto px-6 sm:px-10">
      <SectionLabel text="growth" />
      <Reveal>
        <h2 className="font-display text-4xl sm:text-6xl font-bold lowercase leading-[1.05] mb-6 text-white">
          growth <span className="text-gradient-electric">every year</span>
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="text-white/40 text-sm sm:text-base leading-relaxed max-w-2xl mb-16">
          Since 2019, Pluto has scaled from a 3-client startup to a 20+ client agency — by leveraging cutting-edge technologies and strategic marketing insights that propel businesses to new heights.
        </p>
      </Reveal>

      <div className="space-y-5">
        {GROWTH.map((g, i) => (
          <Reveal key={g.year} delay={i * 0.08}>
            <div className="flex items-center gap-6 group">
              <span className="font-display text-sm text-white/30 w-10 flex-shrink-0">{g.year}</span>
              {/* bar */}
              <div className="flex-1 relative h-8 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, #00D9FF, #7B61FF)`,
                    boxShadow: '0 0 20px rgba(0,217,255,0.35)',
                  }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(g.clients / max) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/40">
                  {g.clients === 20 ? '20+ clients' : `${g.clients} clients`}
                </span>
              </div>
            </div>
            {g.founders && (
              <div className="ml-16 mt-1 text-[11px] uppercase tracking-[0.2em] text-white/25">{g.founders}</div>
            )}
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ─── SECTION: Sectors ─────────────────────────────────── */
const SECTORS = [
  { name: 'Cafe & Restaurants', pct: 30.5, color: '#fb923c' },
  { name: 'Real Estate', pct: 21.5, color: '#00D9FF' },
  { name: 'Jewellers', pct: 21.5, color: '#fcd34d' },
  { name: 'Clothing & Lifestyle', pct: 11.5, color: '#a78bfa' },
  { name: 'Health', pct: 11, color: '#4ade80' },
  { name: 'Other', pct: 4, color: '#94a3b8' },
]

function Sectors() {
  const total = SECTORS.reduce((a, s) => a + s.pct, 0)
  let cumulative = 0

  return (
    <section className="max-w-5xl mx-auto px-6 sm:px-10">
      <SectionLabel text="sectors" />
      <Reveal>
        <h2 className="font-display text-4xl sm:text-6xl font-bold lowercase leading-[1.05] mb-16 text-white">
          sectors we've <span className="text-gradient-warm">worked with</span>
        </h2>
      </Reveal>

      <div className="grid sm:grid-cols-2 gap-12 items-center">
        {/* donut chart */}
        <Reveal>
          <div className="relative w-64 h-64 mx-auto">
            <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
              {SECTORS.map((s, i) => {
                const r = 80
                const circumference = 2 * Math.PI * r
                const dashLen = (s.pct / total) * circumference
                const offset = (cumulative / total) * circumference
                cumulative += s.pct
                return (
                  <motion.circle
                    key={s.name}
                    cx="100" cy="100" r={r}
                    fill="none"
                    stroke={s.color}
                    strokeWidth="32"
                    strokeDasharray={`${dashLen} ${circumference - dashLen}`}
                    strokeDashoffset={-offset}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                  />
                )
              })}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-3xl font-bold text-white">6</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">sectors</span>
            </div>
          </div>
        </Reveal>

        {/* legend */}
        <div className="space-y-3">
          {SECTORS.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.07}>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.color }} />
                <span className="text-sm text-white/60 flex-1">{s.name}</span>
                <motion.span
                  className="font-display font-bold text-sm"
                  style={{ color: s.color }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.07 }}
                >
                  {s.pct}%
                </motion.span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── SECTION: Clients ─────────────────────────────────── */
const CLIENTS = [
  'Vrudheshwar pure veg',
  'Jija pure veg',
  'The veg kitchen',
  'The first coffee',
  'Darshan tourism',
  'Balaji snacks',
  'Glensteffani',
  'RR enterprises',
]

function Clients() {
  return (
    <section className="max-w-5xl mx-auto px-6 sm:px-10">
      <SectionLabel text="clients" />
      <Reveal>
        <h2 className="font-display text-4xl sm:text-6xl font-bold lowercase leading-[1.05] mb-16 text-white">
          reputed <span className="text-gradient-electric">clients</span>
        </h2>
      </Reveal>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {CLIENTS.map((c, i) => (
          <Reveal key={c} delay={i * 0.06}>
            <motion.div
              className="rounded-xl px-5 py-6 flex items-center justify-center text-center text-sm text-white/50 font-medium relative overflow-hidden group"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            >
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: 'radial-gradient(ellipse at center, rgba(0,217,255,0.07) 0%, transparent 70%)' }}
              />
              <span className="relative z-10">{c}</span>
            </motion.div>
          </Reveal>
        ))}
        {/* "and many more" */}
        <Reveal delay={CLIENTS.length * 0.06}>
          <div
            className="rounded-xl px-5 py-6 flex items-center justify-center text-center text-[11px] uppercase tracking-[0.2em] text-white/20 col-span-2 sm:col-span-4"
            style={{ border: '1px dashed rgba(255,255,255,0.08)' }}
          >
            & many more
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─── SECTION: Influencer Collab ───────────────────────── */
const COLLAB_STEPS = [
  { icon: '📡', label: 'Digital channels', desc: 'Identified and approached through social platforms and digital directories.' },
  { icon: '🤝', label: 'Networking', desc: 'Warm introductions via mutual connections in the creator economy.' },
  { icon: '💬', label: 'WhatsApp / SMS', desc: 'Direct outreach and structured follow-up sequences.' },
  { icon: '🎯', label: 'Personal meetings', desc: 'In-person or video calls to build authentic, lasting partnerships.' },
]

function InfluencerCollab() {
  return (
    <section className="max-w-5xl mx-auto px-6 sm:px-10">
      <SectionLabel text="influencers" />
      <Reveal>
        <h2 className="font-display text-4xl sm:text-6xl font-bold lowercase leading-[1.05] mb-6 text-white">
          influencer <span className="text-gradient-warm">collaboration</span>
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="text-white/40 text-sm sm:text-base leading-relaxed max-w-2xl mb-16">
          Collaborating with influencers adds credibility, reaches wider audiences, and generates organic engagement. Each collaboration is tailored to fit specific goals, audience, and brand identity.
        </p>
      </Reveal>
      <div className="grid sm:grid-cols-4 gap-5">
        {COLLAB_STEPS.map((step, i) => (
          <Reveal key={step.label} delay={i * 0.1}>
            <motion.div
              className="rounded-2xl p-6 text-center group relative overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            >
              <div className="text-3xl mb-4">{step.icon}</div>
              <h4 className="font-display text-sm font-bold text-white mb-2 lowercase">{step.label}</h4>
              <p className="text-xs text-white/35 leading-relaxed">{step.desc}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ─── SECTION: Contact ─────────────────────────────────── */
function ContactSection({ onNavigate }: { onNavigate?: (section: 'contact') => void }) {
  return (
    <section className="max-w-5xl mx-auto px-6 sm:px-10 pb-32">
      <SectionLabel text="contact" />
      <Reveal>
        <h2 className="font-display text-4xl sm:text-6xl font-bold lowercase leading-[1.05] mb-16 text-white">
          let's <span className="text-gradient-electric">connect</span>
        </h2>
      </Reveal>

      <div className="grid sm:grid-cols-3 gap-6 mb-12">
        {[
          { icon: '📞', label: 'phone', value: '+91 90490 15912', sub: '+919049015912', href: 'tel:+919049015912', subHref: 'tel:+919049015912', accent: '#00D9FF' },
          { icon: '✉️', label: 'email', value: 'teamdigitalpluto@gmail.com', sub: null, href: 'mailto:teamdigitalpluto@gmail.com', subHref: null, accent: '#7B61FF' },
          { icon: '📸', label: 'instagram', value: '@digital.pluto', sub: null, href: 'https://instagram.com/digital.pluto', subHref: null, accent: '#fb7185' },
        ].map((contact, i) => (
          <Reveal key={contact.label} delay={i * 0.1}>
            <motion.div
              className="block rounded-2xl p-7 relative overflow-hidden group"
              style={{
                background: `linear-gradient(145deg, ${contact.accent}12 0%, rgba(0,0,0,0) 60%)`,
                border: `1px solid ${contact.accent}25`,
              }}
              whileHover={{ scale: 1.02, y: -3 }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            >
              <div className="text-2xl mb-4 pointer-events-none">{contact.icon}</div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-white/30 mb-1 pointer-events-none">{contact.label}</div>
              <div className="font-medium text-white text-sm break-all">
                <a href={contact.href} target="_blank" rel="noopener noreferrer" className="before:absolute before:inset-0 outline-none" data-cursor-hover>
                  {contact.value}
                </a>
              </div>
              {contact.sub && (
                <div className="text-xs text-white/40 mt-1">
                  {contact.subHref ? (
                    <a href={contact.subHref} target="_blank" rel="noopener noreferrer" className="relative z-10 hover:text-white transition-colors outline-none inline-block py-1 -my-1" data-cursor-hover>
                      {contact.sub}
                    </a>
                  ) : (
                    <span className="relative z-10">{contact.sub}</span>
                  )}
                </div>
              )}
              <motion.div
                className="absolute bottom-4 right-4 text-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{ color: contact.accent }}
              >
                →
              </motion.div>
            </motion.div>
          </Reveal>
        ))}
      </div>

      {/* CTA */}
      <Reveal delay={0.3}>
        <div
          className="rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(0,217,255,0.08) 0%, rgba(123,97,255,0.08) 100%)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* animated bg */}
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(0,217,255,0.06) 0%, transparent 60%)' }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <p className="relative font-display text-3xl sm:text-4xl font-bold text-white lowercase mb-3">
            ready to launch?
          </p>
          <p className="relative text-white/40 text-sm sm:text-base mb-8 max-w-md mx-auto">
            Founded in 2019 by Avdhut Sutar &amp; Omkar Bhosale — we're always looking for our next great challenge.
          </p>
          <motion.button
            type="button"
            onClick={() => onNavigate?.('contact')}
            className="pacome-pill inline-flex"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            data-cursor-hover
          >
            start a project
            <span className="pacome-dot" />
          </motion.button>
        </div>
      </Reveal>
    </section>
  )
}

/* ─── SCROLL CUE ───────────────────────────────────────── */
export function ScrollCue() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.6 }}
    >
      <span className="text-[9px] uppercase tracking-[0.25em] text-white/25">scroll</span>
      <motion.div
        className="w-px h-10"
        style={{ background: 'linear-gradient(to bottom, rgba(0,217,255,0.5), transparent)' }}
        animate={{ scaleY: [0, 1, 0], originY: 0 }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  )
}

/* ─── Main export ──────────────────────────────────────── */
export default function CompanyProfile({ onNavigateAction }: { onNavigateAction?: (section: 'contact') => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div ref={containerRef} className="relative bg-black">
      {/* scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 h-px z-[9985]" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <motion.div
          className="h-full"
          style={{
            width: progressWidth,
            background: 'linear-gradient(90deg, #00D9FF, #7B61FF)',
            boxShadow: '0 0 8px rgba(0,217,255,0.8)',
          }}
        />
      </div>

      {/* top fade from hero */}
      <div
        className="pointer-events-none"
        style={{
          height: 120,
          background: 'linear-gradient(to bottom, #000 0%, transparent 100%)',
          marginTop: -1,
        }}
      />

      <div className="space-y-28 sm:space-y-36 pt-8">
        <HowWeWork />
        <Divider />
        <Services />
        <Divider />
        <Growth />
        <Divider />
        <Sectors />
        <Divider />
        <Clients />
        <Divider />
        <InfluencerCollab />
        <Divider />
        <ContactSection onNavigate={onNavigateAction} />
      </div>
    </div>
  )
}
