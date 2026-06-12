'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { PLUTO_ABOUT, PLUTO_EMAIL } from '@/data/plutoContent'

interface ContentPanelProps {
  section: 'about' | 'contact' | null
  onClose: () => void
}

export default function ContentPanel({ section, onClose }: ContentPanelProps) {
  return (
    <AnimatePresence>
      {section && (
        <motion.div
          className="fixed inset-0 z-[9997] bg-black/95 backdrop-blur-md overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="min-h-full max-w-2xl mx-auto px-8 py-28 sm:py-36"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="mb-12 text-xs lowercase text-white/35 hover:text-white transition-colors"
            >
              ← back
            </button>

            {section === 'about' && (
              <>
                <h2 className="font-display text-4xl sm:text-5xl font-bold lowercase text-white mb-8">about pluto</h2>
                <div className="space-y-5 text-sm sm:text-base text-white/55 leading-relaxed whitespace-pre-line">
                  {PLUTO_ABOUT}
                </div>
              </>
            )}

            {section === 'contact' && (
              <>
                <h2 className="font-display text-4xl sm:text-5xl font-bold lowercase text-white mb-8">contact</h2>
                <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-8">
                  Start your next project with Pluto. We respond within 24 hours.
                </p>
                <a
                  href={`mailto:${PLUTO_EMAIL}`}
                  className="pacome-pill inline-flex"
                >
                  {PLUTO_EMAIL}
                  <span className="pacome-dot" />
                </a>
                <form
                  className="mt-12 space-y-4"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input className="pacome-input" placeholder="name" />
                  <input className="pacome-input" type="email" placeholder="email" />
                  <textarea className="pacome-input min-h-[120px] resize-none" placeholder="tell us about your mission" />
                  <button type="submit" className="pacome-pill">
                    send transmission
                    <span className="pacome-dot" />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
