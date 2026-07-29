import { motion } from 'framer-motion'

/* Real scopes, priced off the published tariff. Nothing invented — if a job
   is not one we have actually done, it does not belong on this page. Swap the
   `tone` values for photographs when you have them; the layout is identical. */
const PROJECTS = [
  {
    id: '01',
    title: 'Bathroom re-grout, full depth',
    scope: '4-Room HDB · floor + shower walls',
    detail: '300×300 · old cement raked to depth',
    price: '$1,074',
    tone: 'from-[#2A2118] to-[#0E0C0A]'
  },
  {
    id: '02',
    title: 'New BTO, first grout',
    scope: 'Whole flat · joints still open, no removal',
    detail: '600×600 floors · 1200×600 wet areas',
    price: '$2,738',
    tone: 'from-[#1A2028] to-[#0A0C0E]'
  },
  {
    id: '03',
    title: 'Kitchen floor & backsplash',
    scope: 'Condo · grease-zone epoxy',
    detail: '600×600 · grease and stain exposure',
    price: '$721',
    tone: 'from-[#221C22] to-[#0C0A0C]'
  },
  {
    id: '04',
    title: 'Two bathrooms, one visit',
    scope: '5-Room HDB · floors + wet zones',
    detail: '300×300 · 15-year-old joints',
    price: '$1,977',
    tone: 'from-[#1C2220] to-[#0A0D0C]'
  }
]

const card = {
  hidden: { opacity: 0, y: 40 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }
  })
}

export default function GalleryGrid() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-28 md:px-12 md:py-40">
      <div className="mb-14 flex items-end justify-between gap-8">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-ultra text-stone-500">
            Selected work
          </p>
          <h2 className="mt-5 max-w-xl text-[clamp(1.8rem,3.6vw,2.9rem)] font-light leading-tight tracking-tight text-ink-900">
            Every job priced from the same published tariff.
          </h2>
        </div>
        <p className="hidden max-w-[15rem] text-[13px] leading-relaxed text-stone-500 md:block">
          The figure on each project is the calculator's number for that scope.
          Not a range. Not a starting price.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <motion.a
            key={p.id}
            href="#quote"
            custom={i}
            variants={card}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="group relative block overflow-hidden rounded-2xl border border-white/70 bg-white/60 shadow-[0_18px_50px_rgba(30,25,15,0.07)] backdrop-blur-2xl"
          >
            {/* Media well. Scale the inner layer, never the card, so the
                border and radius stay crisp through the zoom. */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${p.tone}`}
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Placeholder joint lattice — replace with a photo. */}
                <div
                  className="absolute inset-0 opacity-[0.13]"
                  style={{
                    backgroundImage:
                      'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                    backgroundSize: '58px 58px'
                  }}
                />
              </motion.div>

              <span className="absolute left-5 top-5 font-mono text-[11px] text-white/60">
                {p.id}
              </span>
              <span className="absolute right-5 top-5 rounded-full bg-ink-900/70 px-3 py-1 font-mono text-[11px] text-white backdrop-blur">
                {p.price}
              </span>
            </div>

            <div className="flex items-end justify-between gap-6 p-6">
              <div>
                <h3 className="text-[15px] font-semibold text-ink-900">{p.title}</h3>
                <p className="mt-1.5 text-[13px] text-stone-500">{p.scope}</p>
                <p className="mt-0.5 font-mono text-[11px] text-stone-400">{p.detail}</p>
              </div>
              <span className="shrink-0 text-stone-400 transition-all duration-500 group-hover:translate-x-1 group-hover:text-ink-900">
                →
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
