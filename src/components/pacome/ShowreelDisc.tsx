'use client'

export default function ShowreelDisc() {
  return (
    <div className="showreel-disc group cursor-pointer" title="Pluto showcase">
      <div className="showreel-disc-inner">
        <div
          className="absolute inset-2 rounded-full"
          style={{
            background: 'conic-gradient(from 0deg, #ff6b9d, #7b61ff, #00d9ff, #34d399, #fbbf24, #ff6b9d)',
            filter: 'blur(8px)',
            opacity: 0.85,
          }}
        />
        <div className="absolute inset-3 rounded-full bg-black/85 backdrop-blur-sm flex items-center justify-center">
          <span className="font-display text-[9px] font-bold text-white/80 lowercase">pluto</span>
        </div>
      </div>
      <svg className="showreel-disc-text" viewBox="0 0 120 120">
        <defs>
          <path id="showreelCircle" d="M 60,60 m -42,0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0" />
        </defs>
        <text className="fill-white/60 text-[8px] lowercase tracking-[0.32em]">
          <textPath href="#showreelCircle" startOffset="0%">
            showcase • 2026 • showcase • 2026 • showcase • 2026 •
          </textPath>
        </text>
      </svg>
    </div>
  )
}
