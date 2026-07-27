import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import ScrollJourney from './components/ScrollJourney.jsx'
import GalleryGrid from './components/GalleryGrid.jsx'

export default function Home() {
  return (
    <div id="top" className="min-h-screen bg-ink-900 text-haze-200">
      <Header />
      <main>
        <Hero />
        <ScrollJourney />
        <GalleryGrid />
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-[12px] text-haze-400 md:flex-row md:items-center md:justify-between md:px-12">
          <p>CLEANGROUT · Singapore &amp; Johor Bahru</p>
          <p className="font-mono">Prices exclude GST · tariff current as shown</p>
        </div>
      </footer>
    </div>
  )
}
