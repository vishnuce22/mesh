import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { StatusDot } from '../components/ui'

const JOBS = [
  { id: 'J-2214', m: 'M-07', pct: 64 },
  { id: 'J-2231', m: 'M-12', pct: 38 },
  { id: 'J-2189', m: 'M-03', pct: 91 },
  { id: 'J-2240', m: 'M-19', pct: 12 },
]

const CHIP_STATES = [
  { k: 'RUN', c: '#34D399' },
  { k: 'SETUP', c: '#3B82F6' },
  { k: 'INSPECT', c: '#22D3EE' },
] as const

const FLEET: Array<keyof typeof DOT> = ['run', 'run', 'setup', 'run', 'maint', 'run', 'run', 'inspect', 'run', 'setup', 'run', 'run']
const DOT = { run: '#34D399', setup: '#3B82F6', inspect: '#22D3EE', maint: '#FB923C' }

const AI_LINES = [
  { q: 'Which jobs are running behind?', a: 'J-2214 op 40 is 3.2h behind — re-sequencing M-07 recovers it.' },
  { q: 'Why did Machine 12 stop?', a: 'Tool-wear alarm on T7 at 09:41. Replacement queued.' },
]

function panelIn(delay: number) {
  return {
    initial: { opacity: 0, y: 64, rotateX: 12 },
    animate: { opacity: 1, y: 0, rotateX: 0 },
    transition: { delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  }
}

export default function DashboardReveal() {
  const reduce = useReducedMotion()
  const [chipIdx, setChipIdx] = useState(0)
  const [aiIdx, setAiIdx] = useState(0)
  const [typed, setTyped] = useState(reduce ? AI_LINES[0].q : '')
  const [showA, setShowA] = useState(!!reduce)

  // cycle one status chip so the board feels alive
  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => setChipIdx((i) => (i + 1) % CHIP_STATES.length), 3400)
    return () => clearInterval(id)
  }, [reduce])

  // typewriter for the AI panel
  useEffect(() => {
    if (reduce) return
    let i = 0
    let cancelled = false
    setTyped('')
    setShowA(false)
    const q = AI_LINES[aiIdx].q
    const type = () => {
      if (cancelled) return
      if (i <= q.length) {
        setTyped(q.slice(0, i))
        i++
        setTimeout(type, 34)
      } else {
        setTimeout(() => !cancelled && setShowA(true), 420)
        setTimeout(() => !cancelled && setAiIdx((x) => (x + 1) % AI_LINES.length), 7800)
      }
    }
    const t0 = setTimeout(type, 900)
    return () => {
      cancelled = true
      clearTimeout(t0)
    }
  }, [aiIdx, reduce])

  return (
    <div className="relative mx-auto mt-14 w-full max-w-5xl px-2 sm:mt-20 sm:px-0" style={{ perspective: 1400 }}>
      {/* glow bed under the cluster */}
      <div className="absolute inset-x-8 top-8 -bottom-6 -z-10 rounded-[40px] bg-[radial-gradient(closest-side,rgba(34,211,238,0.10),transparent_75%)] blur-3xl" aria-hidden="true" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_1.7fr_1fr] md:items-start" style={{ transformStyle: 'preserve-3d' }}>
        {/* fleet status */}
        <motion.div {...panelIn(0.85)} className={`glass rounded-xl p-4 ${reduce ? '' : 'idle-float-slow'} order-2 md:order-1 md:mt-14`}>
          <div className="flex items-center justify-between">
            <span className="mono-label text-[9.5px]">FLEET STATUS</span>
            <StatusDot color="#34D399" />
          </div>
          <div className="mt-3.5 grid grid-cols-6 gap-1.5">
            {FLEET.map((k, i) => (
              <span
                key={i}
                className={`h-6 rounded-[3px] border border-white/6 ${!reduce && (k === 'run' || k === 'maint') ? 'pulse' : ''}`}
                style={{ background: `${DOT[k]}22`, boxShadow: `inset 0 0 0 1px ${DOT[k]}55`, animationDelay: `${i * 0.35}s` }}
              />
            ))}
          </div>
          <p className="mt-3 font-mono text-[9.5px] tracking-[0.14em] text-titanium">27 RUN · 4 SETUP · 3 MAINT</p>
        </motion.div>

        {/* production schedule — the main panel */}
        <motion.div {...panelIn(0.55)} className={`glass rounded-xl p-5 shadow-[0_36px_90px_rgba(0,0,0,0.55)] ${reduce ? '' : 'idle-float'} order-1 md:order-2`}>
          <div className="flex items-center justify-between border-b border-white/8 pb-3">
            <span className="mono-label text-[10px] text-cyan">PRODUCTION SCHEDULE</span>
            <span className="flex items-center gap-2 font-mono text-[9.5px] tracking-[0.16em] text-run">
              <StatusDot color="#34D399" /> LIVE
            </span>
          </div>
          <ul className="mt-2 divide-y divide-white/5">
            {JOBS.map((j, i) => {
              const chip = i === 1 ? CHIP_STATES[chipIdx] : CHIP_STATES[0]
              return (
                <li key={j.id} className="flex items-center gap-3 py-2.5">
                  <span className="font-mono text-[11px] font-medium text-alum">{j.id}</span>
                  <span className="font-mono text-[10px] text-titanium">{j.m}</span>
                  <span className="ml-auto h-1 w-20 overflow-hidden rounded-full bg-white/6 sm:w-28">
                    <motion.span
                      className="block h-full rounded-full"
                      style={{ background: chip.c }}
                      initial={{ width: 0 }}
                      animate={{ width: `${j.pct}%` }}
                      transition={{ delay: 1.3 + i * 0.15, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </span>
                  <span
                    className="w-[4.6rem] rounded-sm border px-1.5 py-0.5 text-center font-mono text-[9px] font-semibold tracking-[0.14em]"
                    style={{ color: chip.c, borderColor: `${chip.c}44`, background: `${chip.c}11` }}
                  >
                    {chip.k}
                  </span>
                </li>
              )
            })}
          </ul>
        </motion.div>

        {/* AI assistant */}
        <motion.div {...panelIn(1.1)} className={`glass rounded-xl p-4 ${reduce ? '' : 'idle-float-slow'} order-3 md:mt-8`}>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan pulse" />
            <span className="mono-label text-[9.5px] text-cyan">MESH AI</span>
          </div>
          <p className="mt-3 min-h-[2.4em] font-mono text-[11px] leading-relaxed text-alum">
            {typed}
            {!reduce && <span className="ml-0.5 inline-block h-3 w-[6px] translate-y-[2px] bg-cyan/80" />}
          </p>
          <motion.p
            className="mt-2 border-l-2 border-cyan/50 pl-2.5 text-[11px] leading-relaxed text-titanium"
            animate={{ opacity: showA ? 1 : 0, y: showA ? 0 : 6 }}
            transition={{ duration: 0.4 }}
          >
            {AI_LINES[aiIdx].a}
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}
