import { motion } from 'framer-motion'

/* Filmed hero: bright Scandinavian interior, 600×600 tiles, clean joints.
   Light scrim + ink type; the bottom fades into the paper sections so the
   page reads as one surface. */

const STATS = [
  ['Published tariff', 'every price checkable, to the metre of joint'],
  ['5-year written warranty', 'any job size — most of the trade offers 2'],
  ['Walkable in 24 hours', 'showers after 72 · full cure ~7 days']
]

export default function Hero() {
  return (
    <section className="relative flex min-h-[92vh] w-full items-center overflow-hidden bg-paper">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={`${import.meta.env.BASE_URL}media/hero.mp4`}
        poster={`${import.meta.env.BASE_URL}media/hero-poster.jpg`}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
      {/* Scrim: readable type on the left, video breathing on the right,
          and a fade into the paper background below. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, rgba(247,245,241,0.94) 0%, rgba(247,245,241,0.72) 42%, rgba(247,245,241,0.18) 75%, rgba(247,245,241,0.05) 100%), linear-gradient(to top, rgba(247,245,241,1) 0%, rgba(247,245,241,0) 26%)'
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 pb-24 pt-36 md:px-12">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono text-[11px] uppercase tracking-ultra text-gold-deep"
        >
          CLEANGROUT — Singapore &amp; JB
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 max-w-3xl text-[clamp(2.3rem,6vw,4.4rem)] font-light leading-[1.04] tracking-tight text-ink-900"
        >
          The three millimetres
          <br />
          <span className="text-stone-400">everyone else hides.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 max-w-xl text-[15px] leading-relaxed text-stone-600"
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
            className="rounded-full bg-ink-900 px-7 py-3.5 text-[13px] font-medium text-white transition hover:bg-gold hover:text-ink-900"
          >
            The price, itemised →
          </a>
          <a
            href="#packages"
            className="rounded-full border border-stone-400/70 bg-white/40 px-7 py-3.5 text-[13px] font-medium text-ink-900 backdrop-blur transition hover:border-stone-600"
          >
            Fixed-price packages
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.45 }}
          className="mt-20 grid max-w-3xl gap-6 border-t border-ink-900/10 pt-8 sm:grid-cols-3"
        >
          {STATS.map(([big, small]) => (
            <div key={big}>
              <p className="text-[14px] font-medium text-ink-900">{big}</p>
              <p className="mt-1.5 text-[12px] leading-relaxed text-stone-500">{small}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
