import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { MagneticButton } from '../components/ui'
import { CONTACT } from '../lib/data'
import DashboardReveal from './DashboardReveal'

const HeroScene = lazy(() => import('../three/HeroScene'))

const EASE = [0.22, 1, 0.36, 1] as const

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { amount: 0.05 })
  const reduce = useReducedMotion()
  const [glReady, setGlReady] = useState(false)

  // mount the WebGL layer after first paint so text LCP wins
  useEffect(() => {
    if (reduce) return
    const idle = (window as any).requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 250))
    idle(() => setGlReady(true))
  }, [reduce])

  return (
    <section ref={ref} id="top" className="relative flex min-h-screen flex-col justify-start overflow-hidden pt-32 pb-16 sm:pt-36">
      {/* cinematic background: WebGL when allowed, blueprint wash always */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="blueprint absolute inset-0 opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_540px_at_70%_18%,rgba(34,211,238,0.10),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(700px_480px_at_20%_75%,rgba(59,130,246,0.08),transparent_65%)]" />
        {glReady && !reduce && (
          <Suspense fallback={null}>
            <div className="absolute inset-0">
              <HeroScene active={inView} />
            </div>
          </Suspense>
        )}
        {/* bottom fade into the page */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-void" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            className="mono-label inline-flex items-center gap-2.5 rounded-full hairline bg-void/60 px-4 py-2 backdrop-blur"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [...EASE] }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="pulse absolute h-full w-full rounded-full bg-cyan" />
            </span>
            <span className="text-alum">AI-POWERED MANUFACTURING EXECUTION SYSTEM</span>
          </motion.p>

          <motion.h1
            className="display mx-auto mt-7 text-[2.9rem] leading-[1.0] sm:text-7xl lg:text-[5.4rem]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.12, ease: [...EASE] }}
          >
            The Operating System for{' '}
            <span className="text-cyan">Modern Manufacturing</span>
          </motion.h1>

          <motion.p
            className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-titanium sm:text-lg"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.26, ease: [...EASE] }}
          >
            Real-time production visibility, AI-powered decision making, quality control,
            inventory, maintenance, and complete shop floor intelligence — all in one platform.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [...EASE] }}
          >
            <MagneticButton href={CONTACT} primary>
              Request Demo
            </MagneticButton>
            <MagneticButton href="#story">
              Explore Platform
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 3v10M8 13l-4-4M8 13l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </MagneticButton>
          </motion.div>
        </div>

        {/* cinematic dashboard reveal */}
        <DashboardReveal />

        {/* scroll cue */}
        {!reduce && (
          <motion.div
            className="pointer-events-none mx-auto mt-14 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 1 }}
            aria-hidden="true"
          >
            <span className="mono-label text-[9px]">SCROLL</span>
            <span className="relative block h-9 w-px overflow-hidden bg-white/10">
              <motion.span
                className="absolute left-0 top-0 h-3 w-px bg-cyan"
                animate={{ y: [0, 36] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeIn' }}
              />
            </span>
          </motion.div>
        )}
      </div>
    </section>
  )
}
