import { useEffect } from 'react'
import Header from './components/Header.jsx'
import ScrollJourney from './components/ScrollJourney.jsx'
import Packages from './components/Packages.jsx'
import Calculator from './components/Calculator.jsx'
import ProcessStrip from './components/ProcessStrip.jsx'
import ThreeQuestions from './components/ThreeQuestions.jsx'
import GalleryGrid from './components/GalleryGrid.jsx'
import MobileCta from './components/MobileCta.jsx'

const WA = 'https://wa.me/6598004317'

export default function Home() {
  /* One delegated listener tracks every WhatsApp click as a conversion
     event (Vercel Web Analytics — enable it once in the Vercel dashboard;
     until then window.va is undefined and this is a no-op). */
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest?.('a[href*="wa.me"]')
      if (a) window.va?.('event', { name: 'whatsapp_click' })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <div id="top" className="min-h-screen bg-paper text-stone-800">
      <Header />
      <main>
        <ScrollJourney />
        <Packages />
        <Calculator />
        <ProcessStrip />
        <ThreeQuestions />
        <GalleryGrid />
      </main>

      <footer className="border-t border-paper-edge pb-24 md:pb-0">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3 md:px-12">
          <div>
            <p className="text-[13px] font-semibold tracking-wide2 text-ink-900">
              CLEAN<span className="text-stone-400">GROUT</span>
            </p>
            <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-stone-500">
              Epoxy grout specialists. Every price published, every joint
              photographed, five-year written warranty.
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wide2 text-stone-400">
              Contact
            </p>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="mt-3 block text-[15px] font-medium text-ink-900 hover:text-gold-deep">
              WhatsApp +65 9800 4317
            </a>
            <p className="mt-2 text-[13px] leading-relaxed text-stone-500">
              Island-wide Singapore
              <br />
              Johor Bahru, Malaysia — also can, quoted before we cross
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wide2 text-stone-400">
              The paperwork
            </p>
            <ul className="mt-3 space-y-2 text-[13px]">
              {[
                ['5-year warranty terms', 'https://cleangrout.sg/warranty.html'],
                ['Full published tariff', 'https://cleangrout.sg/tariff.html#tariff'],
                ['FAQ', 'https://cleangrout.sg/faq.html'],
                ['Guide: epoxy vs cement grout', 'https://cleangrout.sg/blog/epoxy-vs-cement-grout.html'],
                ['Guide: best grout for HDB bathrooms', 'https://cleangrout.sg/blog/best-grout-for-hdb-bathroom.html'],
                ['Guide: maintaining epoxy grout', 'https://cleangrout.sg/blog/how-to-maintain-epoxy-grout.html'],
                ['Terms & conditions', 'https://cleangrout.sg/terms.html'],
                ['Privacy', 'https://cleangrout.sg/privacy.html']
              ].map(([label, href]) => (
                <li key={href}>
                  <a href={href} className="text-stone-500 transition hover:text-ink-900">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-paper-edge">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 font-mono text-[11px] text-stone-400 md:flex-row md:items-center md:justify-between md:px-12">
            <p>CLEANGROUT · Singapore &amp; Johor Bahru</p>
            <p>Prices exclude GST · tariff current as shown</p>
          </div>
        </div>
      </footer>

      <MobileCta />
    </div>
  )
}
