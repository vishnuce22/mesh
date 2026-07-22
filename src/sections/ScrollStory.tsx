import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion'
import { STAGES } from '../lib/data'
import { SectionHeading } from '../components/ui'

export default function ScrollStory() {
  const tallRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({ target: tallRef, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const i = Math.min(Math.floor(v * STAGES.length), STAGES.length - 1)
    setActive(i)
  })

  const stage = STAGES[active]

  return (
    <section id="story" className="relative scroll-mt-16">
      <div className="mx-auto max-w-7xl px-5 pt-24 sm:px-8 sm:pt-32">
        <SectionHeading
          eyebrow="THE LIFE OF A JOB"
          title="From RFQ to shipped part — one thread."
          sub="Scroll through a job’s life. Every stage below is a screen in MESH, not a department’s inbox."
        />
      </div>

      {reduce ? (
        /* reduced motion: plain grid, no scroll scrubbing */
        <div className="mx-auto grid max-w-7xl gap-4 px-5 py-16 sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
          {STAGES.map((s) => (
            <div key={s.id} className="glass rounded-xl p-6">
              <p className="font-mono text-[11px] tracking-[0.18em] text-cyan">{s.index} · {s.meta}</p>
              <h3 className="display mt-3 text-2xl">{s.title}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-titanium">{s.copy}</p>
            </div>
          ))}
        </div>
      ) : (
        <div ref={tallRef} style={{ height: `${STAGES.length * 52}vh` }}>
          <div className="sticky top-0 flex h-screen items-center overflow-hidden">
            <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 sm:px-8 md:grid-cols-[0.85fr_1.35fr] md:gap-16">
              {/* stage rail */}
              <ol className="hidden md:block" aria-hidden="true">
                {STAGES.map((s, i) => (
                  <li key={s.id} className="relative py-2.5 pl-8">
                    <span
                      className={`absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 transition-colors duration-300 ${i === active ? 'bg-cyan' : 'bg-white/12'}`}
                    />
                    <span
                      className={`font-mono text-[12px] tracking-[0.16em] transition-colors duration-300 ${
                        i === active ? 'text-white' : i < active ? 'text-titanium' : 'text-titanium/60'
                      }`}
                    >
                      <span className={i === active ? 'text-cyan' : ''}>{s.index}</span>
                      {'  '}
                      {s.title.toUpperCase()}
                    </span>
                  </li>
                ))}
              </ol>

              {/* active scene */}
              <div className="relative min-h-[22rem]">
                {/* HMI brackets around the scene area */}
                <span className="absolute -left-3 -top-3 h-6 w-6 border-l-2 border-t-2 border-cyan/50" aria-hidden="true" />
                <span className="absolute -bottom-3 -right-3 h-6 w-6 border-b-2 border-r-2 border-cyan/50" aria-hidden="true" />

                <AnimatePresence mode="wait">
                  <motion.article
                    key={stage.id}
                    initial={{ opacity: 0, y: 42 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="glass relative overflow-hidden rounded-2xl p-8 sm:p-12"
                  >
                    <span className="display pointer-events-none absolute -right-4 -top-8 text-[9rem] font-bold text-white/[0.045] sm:text-[12rem]" aria-hidden="true">
                      {stage.index}
                    </span>
                    <p className="mono-label text-cyan">{stage.meta}</p>
                    <h3 className="display mt-4 text-4xl sm:text-5xl">{stage.title}</h3>
                    <p className="mt-5 max-w-md text-[16px] leading-relaxed text-titanium">{stage.copy}</p>

                    {/* pipeline strip: where this stage sits in the whole flow */}
                    <div className="mt-10 flex items-center gap-0" aria-hidden="true">
                      {STAGES.map((s, i) => (
                        <div key={s.id} className="flex flex-1 items-center last:flex-none">
                          <span
                            className={`h-2 w-2 shrink-0 rounded-full transition-all duration-300 ${
                              i === active ? 'scale-150 bg-cyan shadow-[0_0_10px_rgba(34,211,238,0.9)]' : i < active ? 'bg-cyan/50' : 'bg-white/12'
                            }`}
                          />
                          {i < STAGES.length - 1 && (
                            <span className={`h-px flex-1 transition-colors duration-300 ${i < active ? 'bg-cyan/40' : 'bg-white/8'}`} />
                          )}
                        </div>
                      ))}
                    </div>
                    <p className="mt-3 font-mono text-[9.5px] tracking-[0.18em] text-titanium/70">
                      STAGE {stage.index} / 0{STAGES.length}
                    </p>
                  </motion.article>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
