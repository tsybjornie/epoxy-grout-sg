/* The signature move: arm the customer against the whole market, ourselves
   included. Converts a sales claim into a verifiable test (Spence — cheap
   for us to answer, expensive for anyone cutting corners). */

const QUESTIONS = [
  {
    n: '01',
    q: 'Which product exactly — brand and name?',
    a: 'Not just "epoxy". Real epoxy is two or three parts mixed on site against a clock — ours is Ardex, Sika or Mapei, receipt shown. If it comes ready-mixed from a tub, it is urethane, and it is not the same thing.'
  },
  {
    n: '02',
    q: 'How deep is the old grout removed — and will you photograph it?',
    a: 'At least two-thirds of the joint depth. Skimmed-over grout keys into the old cement and comes off in sheets within a year. You cannot see the difference once it is finished — which is exactly why we photograph every joint before it is filled.'
  },
  {
    n: '03',
    q: 'How long is the warranty?',
    a: 'Most of this trade says two years — and badly done grout usually fails between years one and three, right after the paper expires. Ours is five years, written, any job size.'
  }
]

export default function ThreeQuestions() {
  return (
    <section id="questions" className="relative mx-auto max-w-6xl px-6 py-24 md:px-12">
      <p className="font-mono text-[11px] uppercase tracking-ultra text-gold-deep">
        Before you book anyone
      </p>
      <h2 className="mt-6 max-w-2xl text-[clamp(1.8rem,3.8vw,2.9rem)] font-light leading-[1.05] tracking-tight text-ink-900">
        Three questions.
        <br />
        <span className="text-stone-400">Ask us them too.</span>
      </h2>
      <p className="mt-5 max-w-xl text-[14px] leading-relaxed text-stone-500">
        These save you more than any discount. Every contractor should answer
        all three without hesitating — including us.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {QUESTIONS.map((item) => (
          <div key={item.n} className="glass p-7">
            <p className="font-mono text-[11px] text-gold-deep">{item.n}</p>
            <h3 className="mt-3 text-[16px] font-semibold leading-snug text-ink-900">
              {item.q}
            </h3>
            <p className="mt-3 text-[13px] leading-relaxed text-stone-600">{item.a}</p>
          </div>
        ))}
      </div>

      <p className="mt-8 text-[13px] text-stone-500">
        That is the whole point — you are not asked to trust anyone. The
        answers do the work.
      </p>
    </section>
  )
}
