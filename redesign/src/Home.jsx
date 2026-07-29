import { useEffect } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
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
        <Hero />
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
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with CLEANGROUT on WhatsApp"
              className="mt-3 inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-5 py-2.5 text-[13px] font-semibold text-white transition hover:bg-[#1EBE5A]"
            >
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
                <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.39a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.65-1.03-5.14-2.9-7.01A9.83 9.83 0 0 0 12.04 2Zm0 18.15a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.13-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.23-.73-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.6.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z" />
              </svg>
              Chat on WhatsApp
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
