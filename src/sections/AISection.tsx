import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { AI_TURNS } from '../lib/data'
import { Reveal, SectionHeading, StatusDot } from '../components/ui'

type Phase = 'type' | 'think' | 'stream' | 'hold'

export default function AISection() {
  const reduce = useReducedMotion()
  const [idx, setIdx] = useState(0)
  const [q, setQ] = useState(reduce ? AI_TURNS[0].prompt : '')
  const [a, setA] = useState(reduce ? AI_TURNS[0].answer : '')
  const [phase, setPhase] = useState<Phase>(reduce ? 'hold' : 'type')

  const turn = AI_TURNS[idx]

  useEffect(() => {
    if (reduce) {
      setQ(AI_TURNS[idx].prompt)
      setA(AI_TURNS[idx].answer)
      setPhase('hold')
      return
    }
    let dead = false
    const timers: number[] = []
    const later = (fn: () => void, ms: number) => timers.push(window.setTimeout(() => !dead && fn(), ms))

    setQ('')
    setA('')
    setPhase('type')
    const prompt = AI_TURNS[idx].prompt
    const answer = AI_TURNS[idx].answer
    let i = 0
    const typeQ = () => {
      if (dead) return
      if (i <= prompt.length) {
        setQ(prompt.slice(0, i))
        i++
        later(typeQ, 30)
      } else {
        setPhase('think')
        later(() => {
          setPhase('stream')
          let j = 0
          const stream = () => {
            if (dead) return
            if (j <= answer.length) {
              setA(answer.slice(0, j))
              j += 2
              later(stream, 16)
            } else {
              setA(answer)
              setPhase('hold')
              later(() => setIdx((x) => (x + 1) % AI_TURNS.length), 6200)
            }
          }
          stream()
        }, 1200)
      }
    }
    later(typeQ, 500)
    return () => {
      dead = true
      timers.forEach(clearTimeout)
    }
  }, [idx, reduce])

  return (
    <section id="ai" className="relative scroll-mt-16 py-24 sm:py-32">
      {/* focused glow behind the console */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(800px_500px_at_50%_45%,rgba(34,211,238,0.07),transparent_70%)]" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          align="center"
          eyebrow="MESH AI"
          title="Meet Your AI Production Engineer"
          sub="Ask the floor a question. Get an answer with reasoning — grounded in live production data, not last week’s export."
        />

        <Reveal className="mx-auto mt-14 max-w-3xl" delay={0.1}>
          <div className="glass overflow-hidden rounded-2xl shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
            {/* console header */}
            <div className="flex items-center justify-between border-b border-white/8 px-5 py-3.5">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
                </div>
                <span className="mono-label text-[10px]">MESH AI · PRODUCTION ENGINEER</span>
              </div>
              <span className="flex items-center gap-2 font-mono text-[9.5px] tracking-[0.16em] text-run">
                <StatusDot color="#34D399" /> CONNECTED
              </span>
            </div>

            {/* console body */}
            <div className="min-h-[19rem] px-5 py-6 sm:px-8 sm:min-h-[18rem]">
              <p className="font-mono text-[13px] leading-relaxed text-white sm:text-sm">
                <span className="mr-2 select-none text-cyan">▸</span>
                {q}
                {!reduce && phase === 'type' && <span className="ml-0.5 inline-block h-3.5 w-[7px] translate-y-[2px] bg-cyan/80" />}
              </p>

              {(phase === 'think' || phase === 'stream' || phase === 'hold') && (
                <p className={`mt-4 w-fit rounded px-2 py-1 font-mono text-[10.5px] tracking-[0.1em] text-titanium ${phase === 'think' ? 'shimmer' : ''}`}>
                  {phase === 'think' ? turn.thinking : `✓ ${turn.thinking.replace('…', '')}`}
                </p>
              )}

              {(phase === 'stream' || phase === 'hold') && (
                <p className="mt-4 border-l-2 border-cyan/60 pl-4 text-[14.5px] leading-relaxed text-alum sm:text-[15px]">
                  {a}
                  {!reduce && phase === 'stream' && <span className="ml-0.5 inline-block h-3.5 w-[7px] translate-y-[2px] bg-cyan/80" />}
                </p>
              )}

              {/* insight chart */}
              <div className="mt-7 flex h-16 items-end gap-1.5" aria-hidden="true">
                {turn.chart.map((v, i) => (
                  <motion.span
                    key={`${idx}-${i}`}
                    className="flex-1 rounded-t-sm bg-gradient-to-t from-electric/50 to-cyan/70"
                    initial={{ height: '6%' }}
                    animate={{ height: phase === 'hold' || phase === 'stream' ? `${Math.min(100, Math.max(v, 8))}%` : '6%' }}
                    transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* prompt chips — clickable */}
          <div className="mt-6 flex flex-wrap justify-center gap-2.5">
            {AI_TURNS.map((t, i) => (
              <button
                key={t.prompt}
                onClick={() => setIdx(i)}
                className={`rounded-full px-4 py-2 font-mono text-[11px] tracking-[0.06em] transition-all duration-200 ${
                  i === idx
                    ? 'border border-cyan/50 bg-cyan/10 text-cyan'
                    : 'hairline text-titanium hover:border-white/25 hover:text-alum'
                }`}
              >
                {t.prompt}
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
