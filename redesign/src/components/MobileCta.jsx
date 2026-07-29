/* The persistent thumb-reach action on phones — Fitts's law made literal.
   Most enquiries arrive from a phone; the one thing that must never scroll
   away is the WhatsApp door. Desktop never sees this. */

const WA = 'https://wa.me/6598004317?text=' +
  encodeURIComponent("Hi CLEANGROUT, I'd like a price for epoxy grouting.")

export default function MobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
      <a
        href={WA}
        target="_blank"
        rel="noopener noreferrer"
        className="glass-dark !rounded-full flex items-center justify-between gap-3 px-5 py-3.5"
      >
        <span className="text-[13px] font-medium text-white">
          Fixed price in minutes — WhatsApp us
        </span>
        <span className="shrink-0 rounded-full bg-[#25D366] px-4 py-2 text-[12px] font-semibold text-ink-900">
          +65 9800 4317
        </span>
      </a>
    </div>
  )
}
