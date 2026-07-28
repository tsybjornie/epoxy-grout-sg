import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import ScrollJourney from './components/ScrollJourney.jsx'
import GalleryGrid from './components/GalleryGrid.jsx'
import Packages from './components/Packages.jsx'
import Calculator from './components/Calculator.jsx'

export default function Home() {
  return (
    <div id="top" className="min-h-screen bg-paper text-stone-800">
      <Header />
      <main>
        <Hero />
        <ScrollJourney />
        <Packages />
        <Calculator />
        <GalleryGrid />
      </main>

      <footer className="border-t border-paper-edge">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-[12px] text-stone-500 md:flex-row md:items-center md:justify-between md:px-12">
          <p>CLEANGROUT · Singapore &amp; Malaysia</p>
          <p className="font-mono">Prices exclude GST · tariff current as shown</p>
        </div>
      </footer>
    </div>
  )
}
