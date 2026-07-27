import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const NAV = [
  ['Instant quote', '#quote'],
  ['Price list', '#tariff'],
  ['Work', '#work'],
  ['Warranty', '#warranty']
]

export default function Header() {
  // Transparent over the hero, then a blurred bar once you leave it — the
  // header should never compete with the render behind it.
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
        solid ? 'border-b border-white/10 bg-ink-900/80 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:h-20 md:px-12">
        <a href="#top" className="text-[13px] font-medium tracking-wide2 text-white">
          CLEAN<span className="text-haze-400">GROUT</span>
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {NAV.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-[13px] text-haze-300 transition-colors hover:text-white"
            >
              {label}
            </a>
          ))}
        </nav>

        <a
          href="#quote"
          className="rounded-full border border-white/15 px-5 py-2 text-[12px] font-medium text-white transition hover:border-white/40 hover:bg-white hover:text-ink-900"
        >
          Get my price
        </a>
      </div>
    </motion.header>
  )
}
