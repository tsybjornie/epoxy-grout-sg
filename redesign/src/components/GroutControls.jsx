import { useSyncExternalStore, useCallback } from 'react'
import { groutStore, SWATCHES } from '../state/groutStore.js'

/* The material panel: four grout swatches and the epoxy/cement toggle.

   Clicks write straight into groutStore; the 3D scene notices inside
   useFrame and glides its materials over. The only React state here is a
   mirror for highlighting the active chip, via useSyncExternalStore so the
   subscription is torn down correctly. */

function useGrout() {
  const subscribe = useCallback((fn) => groutStore.subscribe(fn), [])
  const swatch = useSyncExternalStore(subscribe, () => groutStore.swatch)
  const material = useSyncExternalStore(subscribe, () => groutStore.material)
  return { swatch, material }
}

export default function GroutControls({ active, visible = true }) {
  const { swatch, material } = useGrout()

  /* Three states: hidden on the exterior opening (nothing to recolour yet),
     dimmed while grout is on screen but not the subject, full once the
     bathroom/macro stages make the joints the story. */
  return (
    <div
      className={`glass-strong pointer-events-auto w-[228px] p-4 transition-all duration-700 ${
        !visible
          ? 'pointer-events-none translate-y-6 opacity-0'
          : active
            ? 'translate-y-0 opacity-100'
            : 'translate-y-4 opacity-40'
      }`}
    >
      <p className="font-mono text-[9px] uppercase tracking-wide2 text-haze-400">
        Grout colour — live
      </p>
      <div className="mt-3 grid grid-cols-4 gap-2">
        {SWATCHES.map((s) => (
          <button
            key={s.key}
            title={s.name}
            aria-label={`Grout colour: ${s.name}`}
            aria-pressed={swatch.key === s.key}
            onClick={() => groutStore.setSwatch(s.key)}
            className={`h-9 rounded-lg border transition ${
              swatch.key === s.key
                ? 'scale-105 border-gold shadow-[0_0_14px_rgba(212,175,55,0.35)]'
                : 'border-white/15 hover:border-white/40'
            }`}
            style={{ background: s.hex }}
          />
        ))}
      </div>
      <p className="mt-2 h-4 text-[10px] text-haze-300">{swatch.name}</p>

      <p className="mt-3 font-mono text-[9px] uppercase tracking-wide2 text-haze-400">
        Material
      </p>
      <div className="mt-2 flex rounded-full border border-white/10 bg-ink-900/60 p-1">
        {['epoxy', 'cement'].map((m) => (
          <button
            key={m}
            onClick={() => groutStore.setMaterial(m)}
            aria-pressed={material === m}
            className={`flex-1 rounded-full px-3 py-1.5 text-[11px] font-medium capitalize transition ${
              material === m
                ? m === 'epoxy'
                  ? 'bg-gold text-ink-900'
                  : 'bg-haze-400/80 text-ink-900'
                : 'text-haze-300 hover:text-white'
            }`}
          >
            {m}
          </button>
        ))}
      </div>
      <p className="mt-2 text-[10px] leading-snug text-haze-400">
        {material === 'epoxy'
          ? '100% solids, non-porous, high-sheen.'
          : 'Porous cement — what you have now.'}
      </p>
    </div>
  )
}
