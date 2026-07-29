import { useRef, useState, useCallback } from 'react'

/* Before/after drag slider — the single most convincing artefact this trade
   has. Real photographs, same bathroom, the joint is the only variable.
   The divider follows the pointer directly (no React state per pixel would
   be ideal, but two images and a line are cheap enough to re-render). */

const BASE = import.meta.env.BASE_URL

export default function BeforeAfter() {
  const boxRef = useRef(null)
  const [pct, setPct] = useState(50)
  const dragging = useRef(false)

  const move = useCallback((clientX) => {
    const r = boxRef.current.getBoundingClientRect()
    setPct(Math.min(96, Math.max(4, ((clientX - r.left) / r.width) * 100)))
  }, [])

  return (
    <section id="proof" className="relative mx-auto max-w-6xl px-6 py-24 md:px-12">
      <p className="font-mono text-[11px] uppercase tracking-ultra text-gold-deep">
        Same bathroom, same tiles
      </p>
      <h2 className="mt-6 max-w-2xl text-[clamp(1.8rem,3.8vw,2.9rem)] font-light leading-[1.05] tracking-tight text-ink-900">
        Drag the line.
        <br />
        <span className="text-stone-400">The joint is the only thing we changed.</span>
      </h2>

      <div
        ref={boxRef}
        className="glass !p-0 mt-10 relative mx-auto aspect-[16/9] max-h-[560px] w-full cursor-ew-resize touch-none select-none overflow-hidden !rounded-2xl"
        onPointerDown={(e) => { dragging.current = true; e.currentTarget.setPointerCapture(e.pointerId); move(e.clientX) }}
        onPointerMove={(e) => dragging.current && move(e.clientX)}
        onPointerUp={() => { dragging.current = false }}
      >
        {/* AFTER fills the frame; BEFORE sits on top, clipped to the left of
            the divider, so dragging right "wipes the mould away". */}
        <img
          src={`${BASE}work/ba-after.png`}
          alt="Bathroom floor after epoxy re-grouting — clean bright joints"
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
        <img
          src={`${BASE}work/ba-before.png`}
          alt="Same bathroom floor before — stained porous cement grout"
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
          style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
        />
        {/* Divider + handle */}
        <div className="absolute inset-y-0" style={{ left: `${pct}%` }}>
          <div className="absolute inset-y-0 -ml-px w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.4)]" />
          <div className="absolute top-1/2 -ml-5 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-ink-900/70 text-[13px] text-white backdrop-blur">
            ⇄
          </div>
        </div>
        <span className="absolute left-4 top-4 rounded-full bg-ink-900/60 px-3 py-1 font-mono text-[10px] uppercase tracking-wide2 text-white/80 backdrop-blur">
          Before — cement
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-ink-900/60 px-3 py-1 font-mono text-[10px] uppercase tracking-wide2 text-white/80 backdrop-blur">
          After — epoxy
        </span>
      </div>
    </section>
  )
}
