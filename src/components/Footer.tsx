import { CONTACT, NAV_LINKS } from '../lib/data'
import { Wordmark } from './Nav'

export default function Footer() {
  return (
    <footer className="border-t border-white/8">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
          <div className="max-w-sm">
            <Wordmark />
            <p className="mt-4 text-[15px] leading-relaxed text-titanium">
              MESH is an AI-powered manufacturing execution system for CNC and precision
              manufacturing — one platform from RFQ to shipped part.
            </p>
          </div>
          <div className="flex gap-16">
            <div>
              <p className="mono-label mb-4 text-[10px]">Explore</p>
              <ul className="space-y-2.5">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-[14px] text-alum transition-colors hover:text-white">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mono-label mb-4 text-[10px]">Contact</p>
              <a href={CONTACT} className="text-[14px] text-alum transition-colors hover:text-white">
                Request a demo
              </a>
              <p className="mt-2.5 text-[14px] text-titanium">vishnuce22@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/8 pt-6 sm:flex-row sm:items-center">
          <p className="text-[13px] text-titanium">
            Designed &amp; built by{' '}
            <a href="mailto:vishnuce22@gmail.com" className="text-alum underline decoration-white/20 underline-offset-4 hover:text-white">
              Vishnu
            </a>
          </p>
          <p className="font-mono text-[11px] tracking-[0.14em] text-titanium/70">
            © {new Date().getFullYear()} MESH · ALL INTERFACE DATA ON THIS PAGE IS SIMULATED DEMO DATA
          </p>
        </div>
      </div>
    </footer>
  )
}
