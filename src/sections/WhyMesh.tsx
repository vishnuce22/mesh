import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { AFTER, BEFORE } from '../lib/data'
import { SectionHeading } from '../components/ui'

function List({ items, kind }: { items: string[]; kind: 'before' | 'after' }) {
  return (
    <ul className="mt-8 space-y-4">
      {items.map((it) => (
        <li key={it} className={`flex items-start gap-3.5 text-[15.5px] leading-relaxed ${kind === 'before' ? 'text-titanium/80' : 'text-alum'}`}>
          {kind === 'before' ? (
            <svg className="mt-1.5 shrink-0" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
              <path d="M2 2l8 8M10 2l-8 8" stroke="#6B7280" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          ) : (
            <svg className="mt-1.5 shrink-0" width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8.5 6.5 12 13 4.5" stroke="#22D3EE" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          {it}
        </li>
      ))}
    </ul>
  )
}

export default function WhyMesh() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 26 })
  const clip = useTransform(p, (v) => `inset(0 ${(1 - v) * 100}% 0 0)`)
  const dividerLeft = useTransform(p, (v) => `${v * 100}%`)

  if (reduce) {
    return (
      <section id="why" className="scroll-mt-16 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading eyebrow="WHY MESH" title="Not features. Transformation." />
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="glass rounded-2xl p-8">
              <p className="mono-label">BEFORE MESH</p>
              <List items={BEFORE} kind="before" />
            </div>
            <div className="glass rounded-2xl border-cyan/25 p-8">
              <p className="mono-label text-cyan">AFTER MESH</p>
              <List items={AFTER} kind="after" />
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="why" className="scroll-mt-16">
      <div ref={ref} style={{ height: '240vh' }}>
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
            <SectionHeading
              align="center"
              eyebrow="WHY MESH"
              title="Not features. Transformation."
              sub="Keep scrolling — watch the old shop become the connected one."
            />

            <div className="relative mx-auto mt-12 max-w-3xl">
              {/* BEFORE layer */}
              <div className="glass rounded-2xl p-8 sm:p-12">
                <p className="mono-label">BEFORE MESH</p>
                <List items={BEFORE} kind="before" />
              </div>

              {/* AFTER layer sweeps across */}
              <motion.div
                className="absolute inset-0 overflow-hidden rounded-2xl border border-cyan/25 bg-[#0a1116]/95 p-8 backdrop-blur-xl sm:p-12"
                style={{ clipPath: clip }}
              >
                <p className="mono-label text-cyan">AFTER MESH</p>
                <List items={AFTER} kind="after" />
              </motion.div>

              {/* sweep divider */}
              <motion.div
                className="pointer-events-none absolute inset-y-0 w-px bg-cyan shadow-[0_0_18px_rgba(34,211,238,0.9)]"
                style={{ left: dividerLeft }}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
