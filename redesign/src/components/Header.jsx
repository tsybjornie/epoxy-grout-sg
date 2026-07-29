import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const NAV = [
  ['Quote', '#quote'],
  ['Packages', '#packages'],
  ['Work', '#work'],
  ['Good to know', '/guides.html']
]

export default function Header() {
  // Transparent over the hero, then white glass once you leave it.
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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid
          ? 'border-b border-white/60 bg-white/60 backdrop-blur-2xl'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:h-20 md:px-12">
        <a href="#top" className={`text-[13px] font-semibold tracking-wide2 ${solid ? 'text-ink-900' : 'text-white'}`}>
          CLEAN<span className={solid ? 'text-stone-400' : 'text-white/50'}>GROUT</span>
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {NAV.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className={`text-[13px] font-medium transition-colors ${
                solid ? 'text-stone-500 hover:text-ink-900' : 'text-white/70 hover:text-white'
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

        <a
          href="#quote"
          className={`rounded-full px-5 py-2 text-[12px] font-medium transition ${
            solid
              ? 'bg-ink-900 text-white hover:bg-gold hover:text-ink-900'
              : 'bg-white text-ink-900 hover:bg-gold'
          }`}
        >
          My price
        </a>
      </div>
    </motion.header>
  )
}
