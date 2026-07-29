/* What actually happens in your house — the anxiety this answers is "how
   long, how messy, who is in my home". Four steps, one day. */

const STEPS = [
  {
    n: '1',
    title: 'Rake out, to depth',
    body: 'Old grout removed to at least two-thirds of the joint — never skimmed over. Photographed before anything is filled, so you hold the evidence.'
  },
  {
    n: '2',
    title: 'Clean & dry',
    body: 'Joints vacuumed and wiped to bare, sound edges. Epoxy bonds to tile, not to dust — this step is why the warranty can be five years.'
  },
  {
    n: '3',
    title: 'Epoxy, mixed on site',
    body: 'Ardex, Sika or Mapei two-part epoxy, mixed against the clock in small batches and worked into the joints. Your chosen colour, batch numbers recorded.'
  },
  {
    n: '4',
    title: 'Cure & hand over',
    body: 'Surfaces cleaned, silicone lines renewed in wet areas, and the certificate issued — photos, batch numbers, warranty. Walk on it the next morning.'
  }
]

export default function ProcessStrip() {
  return (
    <section id="process" className="relative mx-auto max-w-6xl px-6 pb-24 md:px-12">
      <p className="font-mono text-[11px] uppercase tracking-ultra text-gold-deep">
        One day in your home
      </p>
      <h2 className="mt-6 max-w-2xl text-[clamp(1.8rem,3.8vw,2.9rem)] font-light leading-[1.05] tracking-tight text-ink-900">
        Four steps.
        <br />
        <span className="text-stone-400">Most homes: in by nine, out by six.</span>
      </h2>

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s) => (
          <div key={s.n} className="glass p-6">
            <p className="text-2xl font-light text-gold-deep">{s.n}</p>
            <h3 className="mt-2 text-[15px] font-semibold text-ink-900">{s.title}</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-stone-600">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
