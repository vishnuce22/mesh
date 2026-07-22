import { motion } from 'framer-motion'
import { TRUST } from '../lib/data'
import { SectionHeading } from '../components/ui'
import { fadeUp, stagger, viewportOnce } from '../lib/motion'

export default function Trust() {
  return (
    <section className="py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading align="center" eyebrow="WHAT MESH STANDS FOR" title="Built for the connected factory." />
        <motion.ul
          className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {TRUST.map((t) => (
            <motion.li
              key={t}
              variants={fadeUp}
              className="group flex items-center gap-3 rounded-lg hairline bg-graphite/60 px-4 py-4 transition-colors duration-300 hover:border-cyan/35"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan/70 transition-transform duration-300 group-hover:scale-150" aria-hidden="true" />
              <span className="font-mono text-[10.5px] font-medium tracking-[0.12em] text-alum">{t.toUpperCase()}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
