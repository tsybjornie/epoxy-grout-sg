import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const NAV = [
  ['Quote', '#quote'],
  ['Packages', '#packages'],
  ['Work', '#work'],
  ['Good to know', '/guides.html']
]

export default function Header() {
  // Frosted-dark over the hero, frosted-white once you leave it.
  const [solid, setSolid] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-4 md:top-5"
    >
      {/* One small pill, not a full-width bar. Glass both ways: dark glass
          over the hero, white glass over the paper sections. */}
      <div
        className={`pointer-events-auto flex items-center gap-4 rounded-full border px-4 py-2 shadow-[0_8px_30px_rgba(20,18,12,0.12)] backdrop-blur-2xl transition-colors duration-500 md:gap-6 md:px-5 ${
          solid
            ? 'border-white/70 bg-white/65'
            : 'border-white/15 bg-white/10'
        }`}
      >
        <a
          href="#top"
          className={`text-[12px] font-semibold tracking-wide2 ${solid ? 'text-ink-900' : 'text-white'}`}
        >
          CLEAN<span className={solid ? 'text-stone-400' : 'text-white/50'}>GROUT</span>
        </a>

        <nav className="hidden items-center gap-5 md:flex">
          {NAV.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className={`text-[12px] font-medium transition-colors ${
                solid ? 'text-stone-500 hover:text-ink-900' : 'text-white/70 hover:text-white'
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

        <a
          href="#quote"
          className={`rounded-full px-4 py-1.5 text-[11px] font-medium transition ${
            solid
              ? 'bg-ink-900 text-white hover:bg-gold hover:text-ink-900'
              : 'bg-white/90 text-ink-900 hover:bg-gold'
          }`}
        >
          My price
        </a>
      </div>
    </motion.header>
  )
}
