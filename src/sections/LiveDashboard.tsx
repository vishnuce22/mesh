import { motion } from 'framer-motion'
import { METRICS } from '../lib/data'
import { Counter, SectionHeading, StatusDot } from '../components/ui'
import { stagger, fadeUp, viewportOnce } from '../lib/motion'

const ACCENT: Record<string, string> = {
  cyan: '#22D3EE',
  electric: '#3B82F6',
  signal: '#FB923C',
  run: '#34D399',
}

export default function LiveDashboard() {
  return (
    <section id="dashboard" className="relative scroll-mt-16 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="LIVE FACTORY DASHBOARD"
            title="The floor, in numbers. Right now."
            sub="Simulated demo facility — every figure below animates the way the real dashboards do."
          />
          <p className="mono-label flex items-center gap-2 whitespace-nowrap pb-2">
            <StatusDot color="#34D399" /> STREAMING · DEMO DATA
          </p>
        </div>

        <motion.div
          className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl hairline bg-white/6 sm:grid-cols-2 lg:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {METRICS.map((m) => (
            <motion.div key={m.id} variants={fadeUp} className="group relative bg-graphite p-7 transition-colors duration-300 hover:bg-panel sm:p-8">
              <span
                className="absolute left-0 top-7 h-9 w-[2px] rounded-full sm:top-8"
                style={{ background: ACCENT[m.accent] }}
                aria-hidden="true"
              />
              <p className="mono-label text-[10px]">{m.label}</p>
              <p className="display mt-3 text-5xl sm:text-[3.4rem]">
                <Counter
                  value={m.value}
                  prefix={'prefix' in m ? (m as any).prefix : ''}
                  suffix={'suffix' in m ? (m as any).suffix : ''}
                  decimals={'decimals' in m ? (m as any).decimals : 0}
                  drift={'drift' in m ? (m as any).drift : false}
                />
              </p>
              <p className="mt-3 text-[13.5px] text-titanium">{m.sub}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
