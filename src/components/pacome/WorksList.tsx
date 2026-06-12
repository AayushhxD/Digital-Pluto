'use client'

import { useState } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { PORTFOLIO } from '@/data/plutoContent'
import PortfolioCard from './PortfolioCard'

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.025 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } },
}

function ProjectTile({ project, i }: { project: typeof PORTFOLIO[0]; i: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      variants={item}
      className="relative group cursor-pointer"
      style={{ aspectRatio: i % 5 === 0 ? '4/3' : '3/4' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor-hover
    >
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <PortfolioCard project={project} highlighted={hovered} className="w-full h-full" />

        {/* Hover overlay — slide up from bottom */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="absolute inset-x-0 bottom-0 p-5 z-20"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium"
                style={{
                  background: `${project.accent}22`,
                  border: `1px solid ${project.accent}55`,
                  color: project.accent,
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: project.accent }}
                />
                {project.result}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Number badge */}
        <div
          className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold opacity-40 group-hover:opacity-80 transition-opacity"
          style={{ background: 'rgba(0,0,0,0.5)', color: '#fff', backdropFilter: 'blur(4px)' }}
        >
          {String(i + 1).padStart(2, '0')}
        </div>
      </div>
    </motion.article>
  )
}

export default function WorksList() {
  return (
    <motion.div
      className="absolute inset-0 overflow-y-auto"
      style={{ scrollbarWidth: 'thin', scrollbarColor: '#7B61FF #000' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="px-5 pt-24 pb-16 sm:px-10 sm:pt-28 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-10 flex items-end justify-between"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-white/30 mb-1">selected work</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold lowercase text-white leading-tight">
              client work <span className="text-gradient-electric">·</span> {PORTFOLIO.length} projects
            </h2>
          </div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/20 hidden sm:block">
            2019 — present
          </div>
        </motion.div>

        {/* Masonry-ish grid */}
        <motion.div
          className="grid gap-3"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}
          variants={container}
          initial="hidden"
          animate="show"
        >
          {PORTFOLIO.map((project, i) => (
            <ProjectTile key={project.id} project={project} i={i} />
          ))}
        </motion.div>

        {/* Footer label */}
        <motion.p
          className="text-center text-[10px] uppercase tracking-[0.25em] text-white/15 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          strategy · creative · performance
        </motion.p>
      </div>
    </motion.div>
  )
}
