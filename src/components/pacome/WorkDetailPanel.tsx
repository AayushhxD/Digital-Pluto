'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { PortfolioProject } from '@/data/plutoContent'
import PortfolioCard from './PortfolioCard'

interface WorkDetailPanelProps {
  project: PortfolioProject | null
  onClose: () => void
}

/* ── Metric card ─────────────────────────────────── */
function MetricCard({
  label,
  value,
  accent,
  index,
}: {
  label: string
  value: string
  accent: string
  index: number
}) {
  return (
    <motion.div
      className="rounded-xl p-4 flex flex-col gap-1.5 relative overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.035)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* accent glow spot */}
      <div
        className="absolute -top-6 -left-4 w-14 h-14 rounded-full blur-xl pointer-events-none"
        style={{ background: accent, opacity: 0.15 }}
      />
      <div
        className="text-2xl sm:text-[1.6rem] font-bold font-display leading-none tabular-nums"
        style={{ color: accent }}
      >
        {value}
      </div>
      <div className="text-[10px] uppercase tracking-[0.18em] text-white/35">{label}</div>
    </motion.div>
  )
}

export default function WorkDetailPanel({ project, onClose }: WorkDetailPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  /* Close on Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  /* Lock body scroll */
  useEffect(() => {
    if (project) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [project])

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop — z-[10000] sits above PacomeMenu (z-9999) */}
          <motion.div
            key="wd-backdrop"
            className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          {/* Panel — z-[10001] */}
          <motion.div
            key="wd-panel"
            ref={panelRef}
            className="fixed top-0 right-0 bottom-0 z-[10001] w-full sm:w-[500px] overflow-y-auto"
            style={{
              background: 'linear-gradient(165deg, #111114 0%, #0a0a0b 100%)',
              borderLeft: '1px solid rgba(255,255,255,0.06)',
            }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 36, mass: 0.75 }}
          >
            {/* Accent top strip */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
              style={{ background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)` }}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.22, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />

            <div className="px-7 pt-8 pb-20 sm:px-9">
              {/* Close */}
              <motion.button
                type="button"
                onClick={onClose}
                className="flex items-center gap-2 text-[11px] lowercase tracking-widest text-white/30 hover:text-white/80 transition-colors mb-10"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12, duration: 0.28 }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path d="M8 2L4 6l4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                close
              </motion.button>

              {/* Header: mini card + title */}
              <div className="flex items-start gap-5 mb-7">
                <motion.div
                  className="shrink-0 rounded-xl overflow-hidden shadow-2xl"
                  style={{ width: 68, height: 90 }}
                  initial={{ opacity: 0, scale: 0.85, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.16, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                >
                  <PortfolioCard project={project} className="w-full h-full" compact />
                </motion.div>

                <div className="flex-1 min-w-0 pt-1">
                  <motion.div
                    className="text-[10px] uppercase tracking-[0.24em] mb-2"
                    style={{ color: project.accent }}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.18, duration: 0.28 }}
                  >
                    {project.category}
                    {project.year && (
                      <span className="ml-3 text-white/25 normal-case tracking-normal">
                        · {project.year}
                      </span>
                    )}
                  </motion.div>
                  <motion.h2
                    className="font-display text-2xl sm:text-[1.7rem] font-bold lowercase text-white leading-[1.1]"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.21, duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {project.title}
                  </motion.h2>
                  <motion.div
                    className="text-[11px] text-white/28 mt-1.5 lowercase"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.28, duration: 0.28 }}
                  >
                    {project.client}
                  </motion.div>
                </div>
              </div>

              {/* Result pill */}
              <motion.div
                className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] uppercase tracking-[0.18em] mb-8"
                style={{
                  background: `${project.accent}15`,
                  border: `1px solid ${project.accent}35`,
                  color: project.accent,
                }}
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25, duration: 0.3 }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: project.accent }}
                />
                {project.result}
              </motion.div>

              {/* Description */}
              {project.description && (
                <motion.p
                  className="text-[13px] sm:text-sm text-white/50 leading-[1.8] mb-8"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {project.description}
                </motion.p>
              )}

              {/* Divider */}
              <motion.div
                className="w-full h-px mb-8"
                style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.08), transparent)' }}
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.28, duration: 0.5 }}
              />

              {/* Metrics */}
              {project.metrics && project.metrics.length > 0 && (
                <div className="mb-9">
                  <motion.div
                    className="text-[10px] uppercase tracking-[0.2em] text-white/22 mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    results
                  </motion.div>
                  <div className="grid grid-cols-2 gap-2.5">
                    {project.metrics.map((m, i) => (
                      <MetricCard
                        key={m.label}
                        label={m.label}
                        value={m.value}
                        accent={project.accent}
                        index={i}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <div>
                  <motion.div
                    className="text-[10px] uppercase tracking-[0.2em] text-white/22 mb-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    services delivered
                  </motion.div>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <motion.span
                        key={tag}
                        className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-white/45"
                        style={{
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.09)',
                        }}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.52 + i * 0.05, duration: 0.28 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
