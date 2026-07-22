import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import { LANES, LANE_EVENTS, SEG_COLORS } from '../lib/data'
import type { Seg } from '../lib/data'
import { SectionHeading } from '../components/ui'

const TIMES = ['06:00', '10:00', '14:00', '18:00', '22:00']

function SegBar({ seg, p }: { seg: Seg; p: MotionValue<number> }) {
  const width = useTransform(p, (v) => {
    const fill = Math.max(0, Math.min(1, (v - seg.s) / (seg.e - seg.s)))
    return `${fill * 100}%`
  })
  return (
    <div
      className="absolute top-1/2 h-3 -translate-y-1/2 overflow-hidden rounded-[3px]"
      style={{ left: `${seg.s * 100}%`, width: `${(seg.e - seg.s) * 100}%` }}
    >
      <motion.div
        className="h-full rounded-[3px]"
        style={{ width, background: SEG_COLORS[seg.k], opacity: seg.k === 'idle' ? 1 : 0.85 }}
      />
    </div>
  )
}

function EventMarker({ t, lane, label, p }: { t: number; lane: number; label: string; p: MotionValue<number> }) {
  const opacity = useTransform(p, [t - 0.02, t + 0.01], [0, 1])
  const y = useTransform(p, [t - 0.02, t + 0.01], [8, 0])
  return (
    <motion.div
      className="pointer-events-none absolute z-10 -translate-x-1/2"
      style={{ left: `${t * 100}%`, top: `${lane * 16.66 + 1}%`, opacity, y }}
    >
      <span className="whitespace-nowrap rounded-sm border border-cyan/40 bg-void/95 px-1.5 py-0.5 font-mono text-[8.5px] font-semibold tracking-[0.14em] text-cyan">
        {label}
      </span>
    </motion.div>
  )
}

const LEGEND = [
  { k: 'RUN', c: SEG_COLORS.run },
  { k: 'SETUP', c: SEG_COLORS.setup },
  { k: 'INSPECT', c: SEG_COLORS.inspect },
  { k: 'MAINTENANCE', c: SEG_COLORS.maint },
]

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const raw = useSpring(scrollYProgress, { stiffness: 100, damping: 26, mass: 0.4 })
  // reduced motion: everything fully drawn
  const p = useTransform(raw, (v) => (reduce ? 1 : v))
  const markerLeft = useTransform(p, (v) => `${v * 100}%`)
  const clock = useTransform(p, (v) => {
    const mins = 6 * 60 + v * 16 * 60
    const h = Math.floor(mins / 60)
    const m = Math.floor(mins % 60)
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
  })

  const board = (
    <div className="glass relative overflow-hidden rounded-2xl p-6 sm:p-9">
      {/* header */}
      <div className="flex items-center justify-between">
        <p className="mono-label text-[10px]">FLOOR TIMELINE · SIX OF THE FLEET</p>
        <motion.p className="font-mono text-[13px] font-semibold tabular-nums text-cyan">{clock}</motion.p>
      </div>

      {/* time ruler */}
      <div className="relative mt-6 flex justify-between border-b border-white/8 pb-2" aria-hidden="true">
        {TIMES.map((t) => (
          <span key={t} className="font-mono text-[9.5px] tracking-[0.1em] text-titanium/70">
            {t}
          </span>
        ))}
      </div>

      {/* lanes */}
      <div className="relative mt-4" aria-hidden="true">
        <div className="space-y-0">
          {LANES.map((lane) => (
            <div key={lane.id} className="relative flex h-11 items-center">
              <span className="w-12 shrink-0 font-mono text-[10.5px] text-titanium">{lane.id}</span>
              <div className="relative h-full flex-1">
                {lane.segs.map((seg, i) => (
                  <SegBar key={i} seg={seg} p={p} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* event pop-ins over the lane area */}
        <div className="absolute inset-y-0 left-12 right-0">
          {LANE_EVENTS.map((e) => (
            <EventMarker key={e.label} t={e.t} lane={e.lane} label={e.label} p={p} />
          ))}
          {/* now marker */}
          {!reduce && (
            <motion.div className="absolute inset-y-0 w-px bg-cyan/70 shadow-[0_0_12px_rgba(34,211,238,0.8)]" style={{ left: markerLeft }} />
          )}
        </div>
      </div>

      {/* legend */}
      <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/8 pt-5">
        {LEGEND.map((l) => (
          <span key={l.k} className="flex items-center gap-2 font-mono text-[9.5px] tracking-[0.16em] text-titanium">
            <span className="h-2 w-2 rounded-[2px]" style={{ background: l.c }} aria-hidden="true" />
            {l.k}
          </span>
        ))}
        <span className="ml-auto font-mono text-[9.5px] tracking-[0.16em] text-titanium/60">DEMO DATA · SCROLL DRIVES THE CLOCK</span>
      </div>
    </div>
  )

  if (reduce) {
    return (
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading eyebrow="ONE DAY ON THE FLOOR" title="Scroll, and the shift unfolds." sub="A production day, replayed: setups, cycles, inspections, a tool alarm, a shipment." />
          <div className="mt-12">{board}</div>
        </div>
      </section>
    )
  }

  return (
    <section>
      <div ref={ref} style={{ height: '280vh' }}>
        <div className="sticky top-0 flex h-screen items-center">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
            <SectionHeading
              eyebrow="ONE DAY ON THE FLOOR"
              title="Scroll, and the shift unfolds."
              sub="A production day, replayed: setups, cycles, inspections, a tool alarm, a shipment."
            />
            <div className="mt-10">{board}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
