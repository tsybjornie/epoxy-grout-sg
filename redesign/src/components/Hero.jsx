import { motion } from 'framer-motion'

/* Interim hero while the filmed journey is in production: pure type on
   ink, no 3D. The dark ground keeps the header pill's frosted-dark state
   working exactly as it did over the canvas. */

const STATS = [
  ['Published tariff', 'every price checkable, to the metre of joint'],
  ['5-year written warranty', 'any job size — most of the trade offers 2'],
  ['Walkable in 24 hours', 'showers after 72 · full cure ~7 days']
]

export default function Hero() {
  return (
    <section className="relative flex min-h-[92vh] w-full items-center bg-ink-900">
      {/* Soft warm glow, bottom-left — keeps the slab from feeling flat. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 18% 88%, rgba(212,175,55,0.13), transparent 60%)'
        }}
      />
      <div className="relative mx-auto w-full max-w-6xl px-6 pb-24 pt-36 md:px-12">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono text-[11px] uppercase tracking-ultra text-gold"
        >
          CLEANGROUT — Singapore &amp; JB
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 max-w-3xl text-[clamp(2.3rem,6vw,4.4rem)] font-light leading-[1.04] tracking-tight text-white"
        >
          The three millimetres
          <br />
          <span className="text-white/50">everyone else hides.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 max-w-xl text-[15px] leading-relaxed text-haze-300"
        >
          Epoxy grout specialists. Every price published, every joint
          photographed, five-year written warranty — priced by the metre of
          joint, so you can check the math yourself.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#quote"
            className="rounded-full bg-gold px-7 py-3.5 text-[13px] font-medium text-ink-900 transition hover:bg-white"
          >
            The price, itemised →
          </a>
          <a
            href="#packages"
            className="rounded-full border border-white/25 px-7 py-3.5 text-[13px] font-medium text-white transition hover:border-white/60"
          >
            Fixed-price packages
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.45 }}
          className="mt-20 grid max-w-3xl gap-6 border-t border-white/10 pt-8 sm:grid-cols-3"
        >
          {STATS.map(([big, small]) => (
            <div key={big}>
              <p className="text-[14px] font-medium text-white">{big}</p>
              <p className="mt-1.5 text-[12px] leading-relaxed text-haze-400">{small}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
