'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import WorksList from './WorksList'
import PacomeMenu from './PacomeMenu'
import ShowreelDisc from './ShowreelDisc'
import ContentPanel from './ContentPanel'
import CompanyProfile, { ScrollCue } from './CompanyProfile'
import WorkDetailPanel from './WorkDetailPanel'
import { PORTFOLIO } from '@/data/plutoContent'

import EntryGate from './EntryGate'
const PacomeOrb = dynamic(() => import('./PacomeOrb'), { ssr: false })
const SpiralWorks = dynamic(() => import('./SpiralWorks'), { ssr: false })

type ViewMode = 'spiral' | 'list'
type Panel = 'about' | 'contact' | null

export default function PacomeShell() {
  const [showGate, setShowGate] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>('spiral')
  const [menuOpen, setMenuOpen] = useState(false)
  const [panel, setPanel] = useState<Panel>(null)
  const [openProjectIndex, setOpenProjectIndex] = useState<number | null>(null)

  const handleNavigate = (section: 'about' | 'contact') => {
    setOpenProjectIndex(null)
    setPanel(section)
  }

  return (
    <div className="relative bg-black text-white overflow-x-hidden">
      <div className="pacome-grid fixed inset-0 pointer-events-none" />

      <AnimatePresence mode="wait">
        {showGate ? (
          <EntryGate key="gate" onEnter={() => setShowGate(false)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
        {/* ── fixed header ── */}
        <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-5 py-5 sm:px-8">
          <button type="button" className="opacity-90 hover:opacity-100 transition-opacity" aria-label="Pluto home">
            <PacomeOrb size="sm" />
          </button>

          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3 text-[11px] lowercase tracking-wide text-white/45">
            <button
              type="button"
              onClick={() => setViewMode('spiral')}
              className={`flex items-center gap-1.5 transition-colors ${viewMode === 'spiral' ? 'text-white' : 'hover:text-white/70'}`}
            >
              {viewMode === 'spiral' && <span className="h-1 w-1 rounded-full bg-white" />}
              spiral
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 transition-colors ${viewMode === 'list' ? 'text-white' : 'hover:text-white/70'}`}
            >
              {viewMode === 'list' && <span className="h-1 w-1 rounded-full bg-white" />}
              list
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="pacome-pill pacome-pill-sm"
          >
            menu
            <span className="pacome-dot" />
          </button>
        </header>

        {/* ── HERO SECTION — full viewport height ── */}
        <section className="relative h-screen overflow-hidden">
          <AnimatePresence mode="sync">
            {viewMode === 'spiral' ? (
              <motion.div
                key="spiral"
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <SpiralWorks onOpen={(i) => setOpenProjectIndex(i)} />
              </motion.div>
            ) : (
              <WorksList key="list" />
            )}
          </AnimatePresence>

          {/* scroll-down cue — only in spiral mode */}
          {viewMode === 'spiral' && <ScrollCue />}
        </section>

        {/* ── SCROLLABLE COMPANY PROFILE BELOW ── */}
        <CompanyProfile onNavigate={handleNavigate as any} />

        {/* showreel disc 
        <div className="fixed bottom-6 left-6 z-40 sm:bottom-8 sm:left-8">
          <ShowreelDisc />
        </div>
        */}
      </motion.div>
    )}
  </AnimatePresence>

      <PacomeMenu open={menuOpen} onClose={() => setMenuOpen(false)} onNavigate={handleNavigate} />
      <ContentPanel section={panel} onClose={() => setPanel(null)} />
      <WorkDetailPanel
        project={openProjectIndex !== null ? PORTFOLIO[openProjectIndex] : null}
        onClose={() => setOpenProjectIndex(null)}
      />
    </div>
  )
}
