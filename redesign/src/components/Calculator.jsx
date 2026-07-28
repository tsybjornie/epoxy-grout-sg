import { useMemo, useState } from 'react'

/* The Singapore package BOQ calculator.

   The formula is the SAME published tariff as cleangrout.sg — this page must
   never quote a different number than the main site:

     price = $150 mobilisation (waived above $900)
           + $10 × surface area (m²)
           + $4  × room perimeter (m)
           + rate × joint length (m)

     joint length = area × λ,  λ = (L + W) / (L × W) × 1000   (tile in mm)
     wall rate = floor rate × 1.30 · minimum job $380 · before GST */

const RATES = {
  new: { label: 'New tiles, joints still open', floor: 5.04, wall: 6.55 },
  recent: { label: 'Recent grout (BTO age)', floor: 8.51, wall: 11.06 },
  old: { label: 'Old hardened grout', floor: 11.34, wall: 14.74 }
}

const LAMBDA = { 600: 3.33, 300: 6.67 }

/* Typical Singapore layouts. Areas and perimeters are honest estimates of
   the common case — the itemised lines are editable by toggling, and the
   WhatsApp handoff is where exact sizes get confirmed. */
const LAYOUTS = {
  condo: {
    name: 'Condo (2-bed)',
    items: [
      { id: 'living', name: 'Living & dining floor', area: 18, perim: 17, tile: 600, surface: 'floor', on: true },
      { id: 'kitchen', name: 'Kitchen floor', area: 7, perim: 11, tile: 600, surface: 'floor', on: true },
      { id: 'ksplash', name: 'Kitchen backsplash', area: 3.5, perim: 8, tile: 300, surface: 'wall', on: true },
      { id: 'mbath-f', name: 'Master bath floor', area: 4, perim: 8, tile: 300, surface: 'floor', on: true },
      { id: 'mbath-w', name: 'Master bath walls', area: 11, perim: 13, tile: 300, surface: 'wall', on: true },
      { id: 'cbath-f', name: 'Common bath floor', area: 3.5, perim: 7.5, tile: 300, surface: 'floor', on: true },
      { id: 'cbath-w', name: 'Common bath walls', area: 10, perim: 12, tile: 300, surface: 'wall', on: false },
      { id: 'balcony', name: 'Balcony floor', area: 5, perim: 9, tile: 300, surface: 'floor', on: false }
    ]
  },
  hdb4: {
    name: 'HDB 4-Room',
    items: [
      { id: 'living', name: 'Living & dining floor', area: 21, perim: 18.5, tile: 600, surface: 'floor', on: true },
      { id: 'kitchen', name: 'Kitchen floor', area: 8, perim: 12, tile: 300, surface: 'floor', on: true },
      { id: 'ksplash', name: 'Kitchen backsplash', area: 4, perim: 9, tile: 300, surface: 'wall', on: true },
      { id: 'mbath-f', name: 'Master bath floor', area: 4, perim: 8, tile: 300, surface: 'floor', on: true },
      { id: 'mbath-w', name: 'Master bath walls', area: 12, perim: 14, tile: 300, surface: 'wall', on: true },
      { id: 'cbath-f', name: 'Common bath floor', area: 3.5, perim: 7.5, tile: 300, surface: 'floor', on: true },
      { id: 'cbath-w', name: 'Common bath walls', area: 11, perim: 13, tile: 300, surface: 'wall', on: false },
      { id: 'bedrooms', name: 'Bedrooms (3, floors)', area: 30, perim: 42, tile: 600, surface: 'floor', on: false }
    ]
  },
  hdb5: {
    name: 'HDB 5-Room',
    items: [
      { id: 'living', name: 'Living & dining floor', area: 25, perim: 20, tile: 600, surface: 'floor', on: true },
      { id: 'kitchen', name: 'Kitchen floor', area: 9, perim: 12.5, tile: 300, surface: 'floor', on: true },
      { id: 'ksplash', name: 'Kitchen backsplash', area: 4.5, perim: 9.5, tile: 300, surface: 'wall', on: true },
      { id: 'mbath-f', name: 'Master bath floor', area: 4, perim: 8, tile: 300, surface: 'floor', on: true },
      { id: 'mbath-w', name: 'Master bath walls', area: 12, perim: 14, tile: 300, surface: 'wall', on: true },
      { id: 'cbath-f', name: 'Common bath floor', area: 4, perim: 8, tile: 300, surface: 'floor', on: true },
      { id: 'cbath-w', name: 'Common bath walls', area: 11, perim: 13, tile: 300, surface: 'wall', on: false },
      { id: 'bedrooms', name: 'Bedrooms (3, floors)', area: 34, perim: 46, tile: 600, surface: 'floor', on: false }
    ]
  }
}

const MOBILISATION = 150
const MOB_WAIVE_ABOVE = 900
const AREA_RATE = 10
const PERIM_RATE = 4
const MIN_JOB = 380
const WHATSAPP = '6598004317'

const sgd = (n) =>
  n.toLocaleString('en-SG', { style: 'currency', currency: 'SGD', maximumFractionDigits: 0 })

function priceItem(it, condition) {
  const joint = it.area * LAMBDA[it.tile]
  const rate = RATES[condition][it.surface]
  return {
    joint,
    surfaceCost: it.area * AREA_RATE,
    perimCost: it.perim * PERIM_RATE,
    jointCost: joint * rate
  }
}

export default function Calculator() {
  const [layoutKey, setLayoutKey] = useState('hdb4')
  const [condition, setCondition] = useState('recent')
  // Which line items are on, per layout, so switching layouts keeps choices.
  const [enabled, setEnabled] = useState(() => {
    const init = {}
    for (const [k, l] of Object.entries(LAYOUTS)) {
      init[k] = Object.fromEntries(l.items.map((i) => [i.id, i.on]))
    }
    return init
  })

  const layout = LAYOUTS[layoutKey]
  const rows = useMemo(() => {
    return layout.items
      .filter((it) => enabled[layoutKey][it.id])
      .map((it) => {
        const p = priceItem(it, condition)
        return { ...it, ...p, total: p.surfaceCost + p.perimCost + p.jointCost }
      })
  }, [layout, layoutKey, condition, enabled])

  const sub = rows.reduce((s, r) => s + r.total, 0)
  const mob = sub === 0 || sub > MOB_WAIVE_ABOVE ? 0 : MOBILISATION
  const raw = sub + mob
  const grand = sub === 0 ? 0 : Math.max(raw, MIN_JOB)
  const totalJoint = rows.reduce((s, r) => s + r.joint, 0)

  const waMessage = useMemo(() => {
    const lines = [
      `Hi CLEANGROUT, quote request — ${layout.name}, ${RATES[condition].label.toLowerCase()}.`,
      '',
      ...rows.map((r) => `• ${r.name}: ${r.area} m², ~${r.joint.toFixed(0)} m joint — ${sgd(r.total)}`),
      '',
      mob ? `Mobilisation: ${sgd(mob)}` : 'Mobilisation: waived (job above $900)',
      `Estimated total: ${sgd(grand)} (before GST)`,
      '',
      'From the 3D visualiser — please confirm with exact sizes.'
    ]
    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines.join('\n'))}`
  }, [rows, layout, condition, mob, grand])

  return (
    <section id="quote" className="relative mx-auto max-w-6xl px-6 py-24 md:px-12">
      <p className="font-mono text-[11px] uppercase tracking-ultra text-gold-deep">
        Singapore package calculator
      </p>
      <h2 className="mt-6 max-w-2xl text-[clamp(1.8rem,3.8vw,2.9rem)] font-light leading-[1.05] tracking-tight text-ink-900">
        The same published tariff.
        <br />
        <span className="text-stone-400">Itemised for your layout.</span>
      </h2>
      <p className="mt-5 max-w-xl text-[14px] leading-relaxed text-stone-500">
        Every line is metres of joint at the published rate — the same
        arithmetic as the main site, to the dollar.
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* ── Left: configuration ── */}
        <div className="glass p-6">
          <div className="flex flex-wrap gap-2">
            {Object.entries(LAYOUTS).map(([k, l]) => (
              <button
                key={k}
                onClick={() => setLayoutKey(k)}
                aria-pressed={layoutKey === k}
                className={`rounded-full px-5 py-2.5 text-[13px] font-medium transition ${
                  layoutKey === k
                    ? 'bg-ink-900 text-white'
                    : 'border border-stone-300 text-stone-600 hover:border-stone-500'
                }`}
              >
                {l.name}
              </button>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {Object.entries(RATES).map(([k, r]) => (
              <button
                key={k}
                onClick={() => setCondition(k)}
                aria-pressed={condition === k}
                className={`rounded-full px-4 py-2 text-[12px] transition ${
                  condition === k
                    ? 'bg-gold text-ink-900'
                    : 'border border-stone-300 text-stone-500 hover:border-stone-500'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          <div className="mt-6 divide-y divide-stone-200/80">
            {layout.items.map((it) => {
              const on = enabled[layoutKey][it.id]
              const p = priceItem(it, condition)
              const total = p.surfaceCost + p.perimCost + p.jointCost
              return (
                <label
                  key={it.id}
                  className="flex cursor-pointer items-center gap-4 py-3.5"
                >
                  <input
                    type="checkbox"
                    checked={on}
                    onChange={() =>
                      setEnabled((prev) => ({
                        ...prev,
                        [layoutKey]: { ...prev[layoutKey], [it.id]: !on }
                      }))
                    }
                    className="h-4 w-4 accent-[#D4AF37]"
                  />
                  <span className="flex-1">
                    <span className={`block text-[14px] ${on ? 'text-ink-900' : 'text-stone-400'}`}>
                      {it.name}
                    </span>
                    <span className="block font-mono text-[10px] uppercase tracking-wide2 text-stone-400">
                      {it.area} m² · {it.tile} mm tile · ~{p.joint.toFixed(0)} m joint
                    </span>
                  </span>
                  <span className={`font-mono text-[13px] ${on ? 'text-ink-900' : 'text-stone-400/70 line-through'}`}>
                    {sgd(total)}
                  </span>
                </label>
              )
            })}
          </div>
        </div>

        {/* ── Right: the BOQ ── */}
        <div className="glass !bg-white/75 flex flex-col p-6">
          <p className="font-mono text-[10px] uppercase tracking-wide2 text-stone-500">
            Bill of quantities
          </p>
          <dl className="mt-4 space-y-2.5 text-[13px]">
            <div className="flex justify-between text-stone-600">
              <dt>Joint length, total</dt>
              <dd className="font-mono">{totalJoint.toFixed(0)} m</dd>
            </div>
            <div className="flex justify-between text-stone-600">
              <dt>Areas selected</dt>
              <dd className="font-mono">{rows.length}</dd>
            </div>
            <div className="flex justify-between text-stone-600">
              <dt>Work subtotal</dt>
              <dd className="font-mono">{sgd(sub)}</dd>
            </div>
            <div className="flex justify-between text-stone-600">
              <dt>Mobilisation</dt>
              <dd className="font-mono">
                {sub === 0 ? '—' : mob ? sgd(mob) : 'waived'}
              </dd>
            </div>
            {grand > raw && (
              <div className="flex justify-between text-stone-600">
                <dt>Minimum job</dt>
                <dd className="font-mono">{sgd(MIN_JOB)}</dd>
              </div>
            )}
          </dl>

          <div className="mt-6 border-t border-stone-200 pt-5">
            <p className="font-mono text-[10px] uppercase tracking-wide2 text-stone-500">
              Estimated total, before GST
            </p>
            <p className="mt-1 text-4xl font-light text-ink-900">
              {sgd(grand)}
            </p>
          </div>

          <a
            href={waMessage}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-auto block rounded-full pt-3.5 pb-3.5 text-center text-[14px] font-medium transition ${
              rows.length
                ? 'bg-[#25D366] text-ink-900 hover:brightness-110'
                : 'pointer-events-none bg-stone-200 text-stone-400'
            }`}
            style={{ marginTop: '1.75rem' }}
          >
            Send to WhatsApp →
          </a>
          <p className="mt-3 text-center text-[10px] leading-snug text-stone-500">
            The itemised list, prefilled. Final price from exact sizes —
            never higher without asking.
          </p>
        </div>
      </div>
    </section>
  )
}
