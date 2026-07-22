import { MagneticButton, Reveal } from '../components/ui'
import { CONTACT } from '../lib/data'

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
      <div className="blueprint absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(700px_420px_at_50%_60%,rgba(34,211,238,0.10),transparent_70%)]" aria-hidden="true" />

      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <p className="mono-label text-cyan">MESH · MANUFACTURING EXECUTION SYSTEM</p>
          <h2 className="display mt-5 text-5xl sm:text-6xl lg:text-7xl">See MESH run.</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-titanium">
            Step into the command center of a next-generation smart factory —
            and see what your floor looks like with one source of truth.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
            <MagneticButton href={CONTACT} primary>
              Request Demo
            </MagneticButton>
            <MagneticButton href="#top">Back to top</MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
