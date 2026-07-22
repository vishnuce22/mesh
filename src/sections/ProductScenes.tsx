import { motion } from 'framer-motion'
import { PROOF_STRIP, SCENES } from '../lib/data'
import { ProofPanel, Reveal, SectionHeading } from '../components/ui'
import { viewportOnce } from '../lib/motion'

/* ── recreated vignettes for scenes without a screenshot ─────────────── */

function MaintenanceVignette() {
  const rows = [
    { m: 'M-04', health: 92, pm: 'PM IN 21 D', c: '#34D399' },
    { m: 'M-12', health: 41, pm: 'TOOL T7 · REPLACE', c: '#FB923C', pulse: true },
    { m: 'M-17', health: 78, pm: 'PM IN 9 D', c: '#34D399' },
    { m: 'M-23', health: 64, pm: 'PM SCHEDULED FRI', c: '#3B82F6' },
  ]
  return (
    <div className="glass rounded-xl p-6 sm:p-7">
      <p className="mono-label flex items-center justify-between text-[10px]">
        MACHINE HEALTH <span className="text-titanium/60">DEMO DATA</span>
      </p>
      <ul className="mt-5 space-y-4">
        {rows.map((r, i) => (
          <li key={r.m} className="flex items-center gap-4">
            <span className="w-11 font-mono text-[11.5px] text-alum">{r.m}</span>
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/6">
              <motion.span
                className="block h-full rounded-full"
                style={{ background: r.c }}
                initial={{ width: 0 }}
                whileInView={{ width: `${r.health}%` }}
                viewport={viewportOnce}
                transition={{ duration: 1, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              />
            </span>
            <span className={`w-36 text-right font-mono text-[9px] tracking-[0.12em] ${r.pulse ? 'pulse text-signal' : 'text-titanium'}`}>
              {r.pm}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-6 border-t border-white/8 pt-4">
        <p className="font-mono text-[10px] tracking-[0.14em] text-titanium">
          NEXT 7 DAYS · <span className="text-alum">3 PM WINDOWS</span> · <span className="text-signal">1 TOOL ALERT</span>
        </p>
      </div>
    </div>
  )
}

function AnalyticsVignette() {
  const COLS = 16
  const ROWS = 6
  const cells = Array.from({ length: ROWS * COLS }, (_, i) => {
    const r = Math.sin(i * 12.9898) * 43758.5453
    return r - Math.floor(r)
  })
  return (
    <div className="glass rounded-xl p-6 sm:p-7">
      <p className="mono-label flex items-center justify-between text-[10px]">
        UTILIZATION HEAT MAP <span className="text-titanium/60">MACHINE × HOUR</span>
      </p>
      <div className="mt-5 grid gap-1" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }} aria-hidden="true">
        {cells.map((v, i) => (
          <motion.span
            key={i}
            className="aspect-square rounded-[2px]"
            style={{ background: `rgba(34, 211, 238, ${0.06 + v * 0.5})` }}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.35, delay: (i % COLS) * 0.03 + Math.floor(i / COLS) * 0.02 }}
          />
        ))}
      </div>
      <div className="mt-5 flex items-end justify-between border-t border-white/8 pt-4">
        <p className="font-mono text-[10px] tracking-[0.14em] text-titanium">
          BOTTLENECK · <span className="text-cyan">M-07 SATURDAY 10:00–14:00</span>
        </p>
        <p className="font-mono text-[10px] text-titanium/60">OEE 89%</p>
      </div>
    </div>
  )
}

/* ── section ─────────────────────────────────────────────────────────── */

export default function ProductScenes() {
  return (
    <section id="platform" className="relative scroll-mt-16 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="THE PLATFORM"
          title="Software people want to touch."
          sub="Five systems that usually live in five tools — one platform, one login, one truth. Panels marked “real product UI” are actual screens, demo data redacted."
        />

        <div className="mt-8 space-y-24 sm:mt-16 sm:space-y-32">
          {SCENES.map((s, i) => {
            const flip = i % 2 === 1
            return (
              <div key={s.id} className={`grid items-center gap-10 lg:grid-cols-[1fr_1.25fr] lg:gap-16 ${flip ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                <Reveal>
                  <p className="font-mono text-[11px] tracking-[0.2em] text-cyan">
                    {s.index} <span className="mx-2 text-white/20">/</span> {s.eyebrow}
                  </p>
                  <h3 className="display mt-4 text-3xl sm:text-4xl lg:text-[2.7rem]">{s.title}</h3>
                  <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-titanium">{s.copy}</p>
                  <ul className="mt-7 space-y-3">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-[14.5px] text-alum">
                        <svg className="mt-1 shrink-0" width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <path d="M3 8.5 6.5 12 13 4.5" stroke="#22D3EE" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {p}
                      </li>
                    ))}
                  </ul>
                </Reveal>

                <div>
                  {s.shot ? (
                    <ProofPanel src={s.shot.src} alt={s.shot.alt} tag={s.shot.tag} tilt={flip ? 'l' : 'r'} />
                  ) : (
                    <Reveal delay={0.1}>{s.vignette === 'maintenance' ? <MaintenanceVignette /> : <AnalyticsVignette />}</Reveal>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* proof strip: two more real screens */}
        <div className="mt-28">
          <Reveal>
            <p className="mono-label mb-8 text-center">MORE OF THE REAL PRODUCT · DEMO DATA, SENSITIVE FIELDS REDACTED</p>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-2 md:gap-10">
            {PROOF_STRIP.map((p, i) => (
              <ProofPanel key={p.tag} src={p.src} alt={p.alt} tag={p.tag} tilt={i === 0 ? 'l' : 'r'} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
