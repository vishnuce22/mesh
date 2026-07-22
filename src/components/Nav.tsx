import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll } from 'framer-motion'
import { CONTACT, NAV_LINKS } from '../lib/data'

export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <a href="#top" className={`flex items-center gap-2.5 ${className}`} aria-label="MESH home">
      <svg width="26" height="26" viewBox="0 0 64 64" aria-hidden="true">
        <rect width="64" height="64" rx="14" fill="#0B0E13" stroke="rgba(255,255,255,0.1)" />
        <path d="M18 44 L18 22 L32 34 L46 22 L46 44" stroke="#22D3EE" strokeWidth="3" fill="none" />
        <circle cx="18" cy="22" r="3.5" fill="#22D3EE" />
        <circle cx="46" cy="22" r="3.5" fill="#3B82F6" />
      </svg>
      <span className="font-display text-lg font-bold tracking-tight text-white">
        MESH
      </span>
    </a>
  )
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => scrollY.on('change', (v) => setScrolled(v > 24)), [scrollY])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-white/8 bg-void/78 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8" aria-label="Main">
        <Wordmark />

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="mono-label rounded px-3.5 py-2 text-[10.5px] transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <a
            href={CONTACT}
            className="ml-3 rounded-full bg-cyan px-5 py-2 text-[13px] font-semibold text-[#04262e] transition-colors hover:bg-[#53e0f5]"
          >
            Request Demo
          </a>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-md hairline md:hidden"
          aria-expanded={open}
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
        >
          <div className="space-y-1.5">
            <span className={`block h-px w-5 bg-white transition-transform ${open ? 'translate-y-[3.5px] rotate-45' : ''}`} />
            <span className={`block h-px w-5 bg-white transition-transform ${open ? '-translate-y-[3px] -rotate-45' : ''}`} />
          </div>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="border-b border-white/8 bg-void/95 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {NAV_LINKS.map((l) => (
                <a key={l.href} href={l.href} className="mono-label py-3" onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              ))}
              <a
                href={CONTACT}
                className="mt-2 rounded-full bg-cyan px-5 py-3 text-center text-[14px] font-semibold text-[#04262e]"
                onClick={() => setOpen(false)}
              >
                Request Demo
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
