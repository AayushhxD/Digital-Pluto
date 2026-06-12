'use client'

const footerLinks = {
  Services:  ['SEO & Search', 'Social Media', 'Performance Ads', 'Brand Identity', 'AI Automation', 'Content Studio'],
  Company:   ['About Us', 'Case Studies', 'Our Process', 'Blog', 'Careers'],
  Connect:   ['Twitter/X', 'LinkedIn', 'Instagram', 'Dribbble', 'Behance'],
}

const socials = [
  { label: 'X', icon: '𝕏' },
  { label: 'Li', icon: 'in' },
  { label: 'Ig', icon: '◉' },
  { label: 'Dr', icon: '⬡' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/8 overflow-hidden">
      {/* Top neon line */}
      <div className="neon-divider absolute top-0 inset-x-0" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-16"
        style={{ background: 'linear-gradient(to bottom, rgba(123,97,255,0.06), transparent)' }}
      />

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_repeat(3,1fr)]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div
                className="h-9 w-9 rounded-full"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, rgba(0,217,255,0.9), rgba(123,97,255,0.8) 60%, rgba(5,5,5,0.9))',
                  boxShadow: '0 0 20px rgba(0,217,255,0.3)',
                }}
              />
              <span
                className="text-xl font-extrabold tracking-[0.22em]"
                style={{
                  fontFamily: 'Syne, sans-serif',
                  background: 'linear-gradient(90deg, #fff, #00D9FF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                PLUTO
              </span>
            </div>

            <p className="text-sm text-white/35 leading-relaxed max-w-xs mb-6">
              A digital marketing agency built for the modern cosmos. We launch brands into orbit — with strategy, creative, and performance that compounds.
            </p>

            {/* Newsletter */}
            <div className="mb-6">
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-3">Orbit Updates</div>
              <form onSubmit={e => e.preventDefault()} className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 rounded-xl border border-white/10 bg-white/4 px-3 py-2 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-[#00D9FF]/40 transition-all"
                />
                <button
                  type="submit"
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-[#050505]"
                  style={{ background: 'linear-gradient(135deg, #00D9FF, #7B61FF)' }}
                >
                  →
                </button>
              </form>
            </div>

            {/* Socials */}
            <div className="flex gap-2.5">
              {socials.map(s => (
                <a
                  key={s.label}
                  href="#"
                  className="h-9 w-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-xs text-white/40 hover:text-white hover:border-white/20 hover:bg-white/10 transition-all duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <div className="text-[10px] uppercase tracking-[0.22em] text-white/30 mb-4">{section}</div>
              <ul className="space-y-2.5">
                {links.map(l => (
                  <li key={l}>
                    <a
                      href="#"
                      className="group flex items-center gap-1.5 text-sm text-white/35 hover:text-white/80 transition-colors duration-300"
                    >
                      <span className="h-px w-0 bg-[#00D9FF] transition-all duration-300 group-hover:w-3 inline-block" />
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/25">
          <div>© {new Date().getFullYear()} Pluto Digital. All rights reserved.</div>
          <div className="flex gap-5">
            {['Privacy', 'Terms', 'Cookies'].map(l => (
              <a key={l} href="#" className="hover:text-white/50 transition">{l}</a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
            All systems nominal
          </div>
        </div>
      </div>
    </footer>
  )
}
