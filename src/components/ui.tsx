import { useEffect, useRef, useState } from 'react'
import type { ReactNode, MouseEvent } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { fadeUp, viewportOnce } from '../lib/motion'

/* ── Reveal: scroll-triggered fade-up wrapper ─────────────────────────── */
export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* ── SectionHeading ───────────────────────────────────────────────────── */
export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = 'left',
}: {
  eyebrow: string
  title: string
  sub?: string
  align?: 'left' | 'center'
}) {
  return (
    <Reveal className={align === 'center' ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl'}>
      <p className="mono-label flex items-center gap-3 justify-start data-[c=1]:justify-center" data-c={align === 'center' ? 1 : 0}>
        <span className={align === 'center' ? 'hidden' : 'inline-block h-px w-8 bg-cyan/60'} aria-hidden="true" />
        <span className="text-cyan">{eyebrow}</span>
      </p>
      <h2 className="display mt-4 text-4xl sm:text-5xl lg:text-6xl">{title}</h2>
      {sub && <p className="mt-5 text-lg leading-relaxed text-titanium">{sub}</p>}
    </Reveal>
  )
}

/* ── MagneticButton ───────────────────────────────────────────────────── */
export function MagneticButton({
  href,
  children,
  primary = false,
  className = '',
}: {
  href: string
  children: ReactNode
  primary?: boolean
  className?: string
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const reduce = useReducedMotion()

  function onMove(e: MouseEvent) {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    setPos({ x: (e.clientX - r.left - r.width / 2) * 0.18, y: (e.clientY - r.top - r.height / 2) * 0.28 })
  }

  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-body text-[15px] font-semibold transition-colors duration-200 select-none'
  const skin = primary
    ? 'bg-cyan text-[#04262e] hover:bg-[#53e0f5] shadow-[0_0_32px_rgba(34,211,238,0.28)]'
    : 'text-ink hairline hover:border-white/25 hover:bg-white/5'

  return (
    <motion.a
      ref={ref}
      href={href}
      className={`${base} ${skin} ${className}`}
      onMouseMove={onMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 220, damping: 18, mass: 0.5 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.a>
  )
}

/* ── Counter: eased count-up on first view, optional live drift ───────── */
export function Counter({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  drift = false,
  className = '',
}: {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  drift?: boolean
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(reduce ? value : 0)

  useEffect(() => {
    if (!inView) return
    if (reduce) { setDisplay(value); return }
    const t0 = performance.now()
    const dur = 1200
    let raf = 0
    const step = (t: number) => {
      const p = Math.min((t - t0) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(value * eased)
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, reduce])

  useEffect(() => {
    if (!drift || !inView || reduce) return
    const id = setInterval(() => {
      setDisplay((d) => d + Math.round(40 + Math.random() * 220))
    }, 3200)
    return () => clearInterval(id)
  }, [drift, inView, reduce])

  const text =
    prefix +
    display.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) +
    suffix

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {text}
    </span>
  )
}

/* ── StatusDot ────────────────────────────────────────────────────────── */
export function StatusDot({ color, className = '' }: { color: string; className?: string }) {
  return (
    <span className={`relative inline-flex h-2 w-2 ${className}`} aria-hidden="true">
      <span className="pulse absolute inline-flex h-full w-full rounded-full" style={{ background: color }} />
    </span>
  )
}

/* ── ProofPanel: real redacted screenshot as a rendered object ────────── */
export function ProofPanel({ src, alt, tag, tilt = 'r' }: { src: string; alt: string; tag: string; tilt?: 'l' | 'r' }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <motion.figure
        className="group relative m-0 cursor-zoom-in"
        initial={{ opacity: 0, y: 44, rotate: tilt === 'r' ? 2.2 : -2.2 }}
        whileInView={{ opacity: 1, y: 0, rotate: tilt === 'r' ? 1.2 : -1.2 }}
        whileHover={{ rotate: 0, y: -6 }}
        viewport={viewportOnce}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => setOpen(true)}
      >
        {/* glow bed */}
        <div className="absolute -inset-6 -z-10 rounded-3xl bg-[radial-gradient(closest-side,rgba(34,211,238,0.14),transparent_72%)] blur-2xl" aria-hidden="true" />
        <div className="glass overflow-hidden rounded-xl p-1.5 shadow-[0_30px_80px_rgba(0,0,0,0.6)] transition-colors duration-300 group-hover:border-cyan/40">
          <img src={src} alt={alt} loading="lazy" className="w-full rounded-lg" width={1440} height={900} />
        </div>
        {/* HMI corner brackets */}
        <span className="absolute -left-2 -top-2 h-5 w-5 border-l-2 border-t-2 border-cyan/80" aria-hidden="true" />
        <span className="absolute -bottom-2 -right-2 h-5 w-5 border-b-2 border-r-2 border-cyan/80" aria-hidden="true" />
        <figcaption className="absolute -top-3 left-5 rounded-sm border border-cyan/40 border-l-2 border-l-cyan bg-void/95 px-2.5 py-1 font-mono text-[9.5px] font-semibold tracking-[0.18em] text-cyan">
          {tag}
        </figcaption>
      </motion.figure>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={alt}
          >
            <motion.img
              src={src}
              alt={alt}
              className="max-h-full max-w-full rounded-lg hairline"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            />
            <p className="mono-label absolute bottom-6 left-1/2 -translate-x-1/2">DEMO DATA · SENSITIVE FIELDS REDACTED · ESC TO CLOSE</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
