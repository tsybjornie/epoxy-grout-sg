/* The persuasion layer the 3D page was missing, ported from the main site's
   strategy doc (STRATEGY.md §6). Each element is one named mechanism:

   - Anchor strip: the $3,500 re-tile is shown FIRST, so every price after it
     is evaluated against the alternative being avoided (anchoring), and the
     comparison is stated per year of service (EAC), not sticker price.
   - Package grid: three real tiers, target in the centre (centre-stage),
     dominated-option structure intact (decoy), gold on exactly one action
     per screen (Von Restorff).
   - Loss framing throughout: stopping a failure, not buying an upgrade. */

const WA = 'https://wa.me/6598004317?text='

const ANCHORS = [
  {
    label: 'Hack out & re-tile one bathroom',
    big: '$3,500',
    sub: 'the quote this page exists to save you from',
    strike: true
  },
  {
    label: 'Cement grout, re-done as it fails',
    big: '$110 / yr',
    sub: '$300 every 3 years, forever'
  },
  {
    label: 'Epoxy once, 15-year material life',
    big: '$47 / yr',
    sub: '$488 once · 5-yr written warranty',
    gold: true
  }
]

const TIERS = [
  {
    name: 'Kitchen',
    price: '$588',
    scope: 'up to 95 sqft · 300×300 tile or smaller',
    who: 'Kitchen floor and backsplash — the grease-and-stain area.',
    points: [
      'Old grout removed to depth, not skimmed over',
      'Chemical- and grease-resistant epoxy',
      'Heat resistant behind the hob',
      'Done in one day'
    ],
    wa: WA + encodeURIComponent("Hi, I'd like the Kitchen package ($588).")
  },
  {
    name: 'Whole Home',
    tag: 'Most people take this',
    price: '$1,488',
    scope: 'up to 180 sqft · kitchen + two bathrooms',
    who: 'Floors and wet areas across the standard 4-room job.',
    points: [
      'Everything in both other packages',
      'Colour matched across all three areas',
      'Wet-area silicone replaced, fungicide-treated sanitary grade',
      'Full tile clean on completion'
    ],
    featured: true,
    wa: WA + encodeURIComponent("Hi, I'd like the Whole Home package ($1,488).")
  },
  {
    name: 'Single Bathroom',
    price: '$488',
    scope: 'up to 50 sqft · 300×300 tile or smaller',
    who: 'One toilet — floor and the shower area.',
    points: [
      'Old grout removed to depth, not skimmed over',
      'Ardex / Sika / Mapei two-part epoxy',
      'Your choice of grout colour',
      'Done in one day'
    ],
    wa: WA + encodeURIComponent("Hi, I'd like the Single Bathroom package ($488).")
  }
]

export default function Packages() {
  return (
    <section id="packages" className="relative mx-auto max-w-6xl px-6 pt-24 md:px-12">
      {/* ── The anchor: what NOT doing this costs, per year of service ── */}
      <p className="font-mono text-[11px] uppercase tracking-ultra text-gold">
        The number that matters is per year
      </p>
      <h2 className="mt-6 max-w-2xl text-[clamp(1.8rem,3.8vw,2.9rem)] font-light leading-[1.05] tracking-tight text-white">
        You are not buying grout.
        <br />
        <span className="text-haze-400">You are cancelling a $3,500 problem.</span>
      </h2>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {ANCHORS.map((a) => (
          <div
            key={a.label}
            className={`glass p-6 ${a.gold ? 'border-gold/40' : ''}`}
          >
            <p className="font-mono text-[10px] uppercase tracking-wide2 text-haze-400">
              {a.label}
            </p>
            <p
              className={`mt-3 text-3xl font-light ${
                a.strike
                  ? 'text-haze-400 line-through decoration-haze-400/60'
                  : a.gold
                    ? 'text-gold'
                    : 'text-white'
              }`}
            >
              {a.big}
            </p>
            <p className="mt-1.5 text-[12px] text-haze-300">{a.sub}</p>
          </div>
        ))}
      </div>

      {/* ── The packages: fixed scopes, fixed prices, target centre ── */}
      <div className="mt-16 grid gap-5 lg:grid-cols-3">
        {TIERS.map((t) => (
          <div
            key={t.name}
            className={`flex flex-col p-7 ${
              t.featured
                ? 'glass-strong border-gold/50 lg:-my-3 lg:py-10'
                : 'glass'
            }`}
          >
            {t.tag && (
              <p className="mb-3 inline-block self-start rounded-full bg-gold/15 px-3 py-1 font-mono text-[9px] uppercase tracking-wide2 text-gold">
                {t.tag}
              </p>
            )}
            <h3 className="text-xl font-light text-white">{t.name}</h3>
            <p className="mt-1 text-[13px] text-haze-300">{t.who}</p>
            <p className="mt-5 text-4xl font-light text-white">{t.price}</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-wide2 text-haze-400">
              {t.scope}
            </p>
            <ul className="mt-5 space-y-2 text-[13px] text-haze-200">
              {t.points.map((p) => (
                <li key={p} className="flex gap-2.5">
                  <span className={t.featured ? 'text-gold' : 'text-haze-400'}>—</span>
                  <span>{p}</span>
                </li>
              ))}
              <li className="flex gap-2.5">
                <span className={t.featured ? 'text-gold' : 'text-haze-400'}>—</span>
                <span>5-year written warranty</span>
              </li>
            </ul>
            <a
              href={t.wa}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-7 block rounded-full py-3.5 text-center text-[13px] font-medium transition ${
                t.featured
                  ? 'bg-gold text-ink-900 hover:bg-white'
                  : 'border border-white/15 text-white hover:border-white/40'
              }`}
            >
              Book this →
            </a>
          </div>
        ))}
      </div>

      <p className="mt-8 text-[12px] leading-relaxed text-haze-400">
        Packages are priced for 300×300 tile and smaller. On larger tiles there
        is less joint to do — the calculator below usually comes out cheaper,
        and you should use it. Newly laid tiles that have never been grouted
        cost roughly half: there is no removal stage.
      </p>
    </section>
  )
}
