'use client'

import type { PortfolioProject } from '@/data/plutoContent'

function CardPattern({ pattern, accent }: { pattern: PortfolioProject['pattern']; accent: string }) {
  const opacity = 0.35

  if (pattern === 'waves') {
    return (
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 280" preserveAspectRatio="xMidYMid slice">
        <path d="M0 180 Q50 140 100 180 T200 180 V280 H0Z" fill={accent} opacity={opacity} />
        <path d="M0 220 Q60 180 120 220 T240 220 V280 H0Z" fill="#fff" opacity={0.08} />
        <circle cx="160" cy="60" r="40" fill={accent} opacity={0.2} />
      </svg>
    )
  }
  if (pattern === 'grid') {
    return (
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `linear-gradient(${accent}44 1px, transparent 1px), linear-gradient(90deg, ${accent}44 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
    )
  }
  if (pattern === 'rings') {
    return (
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 280">
        {[40, 70, 100, 130].map((r, i) => (
          <circle key={r} cx="100" cy="140" r={r} fill="none" stroke={accent} strokeWidth="1" opacity={opacity - i * 0.06} />
        ))}
      </svg>
    )
  }
  if (pattern === 'blocks') {
    return (
      <div className="absolute inset-0 flex flex-wrap gap-2 p-6 opacity-25">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="rounded-sm" style={{ width: 28 + (i % 3) * 12, height: 28 + (i % 2) * 16, background: accent }} />
        ))}
      </div>
    )
  }
  if (pattern === 'dots') {
    return (
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(${accent} 1.5px, transparent 1.5px)`,
          backgroundSize: '16px 16px',
        }}
      />
    )
  }
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 280">
      {[60, 100, 140, 180].map((y) => (
        <line key={y} x1="20" y1={y} x2="180" y2={y} stroke={accent} strokeWidth="1" opacity={opacity} />
      ))}
    </svg>
  )
}

interface PortfolioCardProps {
  project: PortfolioProject
  className?: string
  highlighted?: boolean
  compact?: boolean
}

export default function PortfolioCard({ project, className = '', highlighted = false, compact = false }: PortfolioCardProps) {
  return (
    <div
      className={`portfolio-card relative overflow-hidden select-none ${className}`}
      style={{
        background: project.gradient,
        borderRadius: compact ? 4 : 6,
        boxShadow: highlighted
          ? `0 0 0 2px ${project.accent}, 0 32px 80px rgba(0,0,0,0.5)`
          : '0 24px 64px rgba(0,0,0,0.45)',
      }}
    >
      <CardPattern pattern={project.pattern} accent={project.accent} />
      {project.videoUrl && (
        <video
          src={project.videoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ opacity: highlighted ? 1 : 0.6, transition: 'opacity 0.3s ease' }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent z-10 pointer-events-none" />

      {!compact && (
        <div className="absolute top-4 left-4 right-4">
          <div
            className="inline-block rounded-full px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] text-white/80"
            style={{ background: `${project.accent}33`, border: `1px solid ${project.accent}55` }}
          >
            {project.result}
          </div>
        </div>
      )}

      <div className={`absolute bottom-0 left-0 right-0 ${compact ? 'p-3' : 'p-4'}`}>
        <div className="text-[9px] uppercase tracking-[0.22em] text-white/45 mb-0.5">{project.category}</div>
        <div
          className={`font-display font-bold text-white lowercase leading-tight ${compact ? 'text-xs' : 'text-sm'}`}
        >
          {project.title}
        </div>
        {!compact && (
          <div className="text-[10px] text-white/35 mt-1 lowercase">{project.client}</div>
        )}
      </div>
    </div>
  )
}
