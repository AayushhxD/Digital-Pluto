'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { PLUTO_EMAIL, SOCIAL_LINKS } from '@/data/plutoContent'

interface PacomeMenuProps {
  open: boolean
  onClose: () => void
  onNavigate: (section: 'about' | 'contact') => void
}

const LINKS = [
  { id: 'about' as const, label: 'about' },
  { id: 'contact' as const, label: 'contact' },
]

const SOCIAL_ICONS: Record<string, string> = {
  ig: '◉',
  x: '𝕏',
  be: 'Bē',
  in: 'in',
}

export default function PacomeMenu({ open, onClose, onNavigate }: PacomeMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[9998] bg-black/25 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.aside
            className="fixed inset-y-0 right-0 z-[9999] w-full sm:w-[min(44vw,520px)] bg-white text-black flex flex-col shadow-[-24px_0_80px_rgba(0,0,0,0.35)]"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex items-center justify-end gap-3 px-8 pt-8 sm:px-10 sm:pt-10">
              <span className="text-xs lowercase text-black/40 tracking-wide">close</span>
              <button
                type="button"
                onClick={onClose}
                className="h-9 w-9 rounded-full bg-black text-white flex items-center justify-center text-sm hover:scale-105 transition-transform"
                aria-label="Close menu"
              >
                ×
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-center px-8 sm:px-10 -mt-8">
              {LINKS.map((link, i) => (
                <motion.button
                  key={link.id}
                  type="button"
                  onClick={() => { onNavigate(link.id); onClose() }}
                  className="text-left font-display text-[clamp(2.75rem,9vw,5rem)] font-bold lowercase text-black hover:text-black/45 transition-colors leading-[0.95] py-1"
                  initial={{ opacity: 0, x: 32 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>

            <div className="flex items-end justify-between px-8 pb-8 sm:px-10 sm:pb-10 gap-6">
              <a
                href={`mailto:${PLUTO_EMAIL}`}
                className="text-xs lowercase text-black/45 hover:text-black transition-colors"
              >
                {PLUTO_EMAIL}
              </a>
              <div className="flex gap-2">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    title={s.label}
                    className="h-8 w-8 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-medium hover:scale-105 transition-transform"
                  >
                    {SOCIAL_ICONS[s.icon] ?? s.label[0]}
                  </a>
                ))}
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
