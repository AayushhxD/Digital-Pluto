const ITEMS = [
  '🚀 Digital Marketing', '✨ Brand Identity', '📈 Performance Ads',
  '🔍 SEO Mastery', '🌌 Social Media', '💎 Web Design',
  '📡 Content Strategy', '⭐ Email Marketing', '🎯 CRO', '🤝 Growth Consulting',
  '🤖 AI Automation', '📊 Analytics & BI',
]

export default function MarqueeBand() {
  // Double for seamless loop
  const doubled = [...ITEMS, ...ITEMS]

  return (
    <div className="relative overflow-hidden border-y border-white/8 py-5">
      {/* Gradient fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#050505] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#050505] to-transparent z-10" />

      <div className="flex whitespace-nowrap">
        <div className="flex shrink-0 items-center gap-0 marquee-track">
          {doubled.map((item, i) => (
            <div key={i} className="flex items-center">
              <span className="px-6 text-sm font-medium text-white/40 hover:text-white/70 transition-colors cursor-default">
                {item}
              </span>
              <span
                className="h-1 w-1 rounded-full flex-shrink-0"
                style={{
                  background: i % 3 === 0
                    ? 'rgba(0,217,255,0.7)'
                    : i % 3 === 1
                      ? 'rgba(123,97,255,0.7)'
                      : 'rgba(255,255,255,0.3)',
                  boxShadow: i % 3 === 0
                    ? '0 0 6px rgba(0,217,255,0.8)'
                    : i % 3 === 1
                      ? '0 0 6px rgba(123,97,255,0.8)'
                      : 'none',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
