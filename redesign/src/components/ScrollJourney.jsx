import { Suspense, useState, useRef, useEffect, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { SoftShadows } from '@react-three/drei'
import {
  EffectComposer, SSAO, Bloom, Vignette, Noise, DepthOfField
} from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import Journey from '../scene/Journey.jsx'
import { scrollState } from '../scene/scrollState.js'
import GroutControls from './GroutControls.jsx'

const STAGES = [
  {
    kicker: 'CLEANGROUT — Singapore & JB',
    title: 'The three millimetres everyone else hides.',
    body: 'Every block has them. This one is ours — scroll in.'
  },
  {
    kicker: 'Layer 01 — Living hall',
    title: 'Cream marble, checkered border, 1.5 mm seams.',
    body: 'The seams are the thinnest thing in the room — and the only part that ever fails.'
  },
  {
    kicker: 'Layer 02 — Kitchen',
    title: 'Where cement grout drinks the cooking.',
    body: 'Oil and soap live on these joints. Ours are non-porous — nothing ever soaks in.'
  },
  {
    kicker: 'Layer 03 — Bathroom',
    title: '100% waterproof. Nothing for mould to eat.',
    body: 'A cured thermoset with zero absorption. No black lines by year two.'
  },
  {
    kicker: 'Layer 04 — The seam, ×150',
    title: 'The whole argument, twenty millimetres up.',
    body: 'Cement at the near end. Liquid-set epoxy at the far. Any colour — the price is the same.'
  }
]

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v)
const smoothstep = (t) => t * t * (3 - 2 * t)

export default function ScrollJourney() {
  const sectionRef = useRef(null)
  const [stage, setStage] = useState(0)

  /* One scroll listener drives BOTH layers.

     The photo is mutated directly on the DOM node rather than through React
     state. This fires on every scroll frame, and re-rendering a tree that
     contains a WebGL canvas at 60 Hz is how a smooth page becomes a
     slideshow. React owns the stage label only. */
  const onScroll = useCallback(() => {
    const el = sectionRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const travel = el.offsetHeight - window.innerHeight
    scrollState.t = clamp01(-rect.top / (travel || 1))
  }, [])

  const onPointerMove = useCallback((e) => {
    scrollState.px = (e.clientX / window.innerWidth) * 2 - 1
    scrollState.py = (e.clientY / window.innerHeight) * 2 - 1
  }, [])

  useEffect(() => {
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [onScroll])

  return (
    /* The tall section is the scroll track. Everything visible lives in one
       sticky child, so the canvas pins while you scroll through it. */
    <section
      ref={sectionRef}
      onPointerMove={onPointerMove}
      className="relative h-[640vh] w-full bg-ink-900"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* ── Layer 0: WebGL. Underneath, revealed by the photo fading out. ── */}
        <div className="absolute inset-0 z-0">
          <Canvas
            shadows
            dpr={[1, 1.75]}
            /* near = 2 mm for the macro. Against a 60 m far that is a
               30,000:1 depth range, which shreds a 24-bit depth buffer —
               logarithmic depth is what makes it survivable. */
            camera={{ position: [-4, 2.6, -7.5], fov: 38, near: 0.002, far: 90 }}
            gl={{ antialias: true, logarithmicDepthBuffer: true }}
            onCreated={({ gl }) => {
              gl.toneMapping = THREE.ACESFilmicToneMapping
              gl.toneMappingExposure = 1.4
            }}
          >
            <color attach="background" args={['#080C14']} />
            <fog attach="fog" args={['#080C14', 20, 70]} />
            <SoftShadows size={26} samples={12} focus={0.7} />
            <Suspense fallback={null}>
              <Journey onStage={setStage} />
              <EffectComposer multisampling={4} enableNormalPass>
                <SSAO
                  intensity={20}
                  radius={0.09}
                  luminanceInfluence={0.5}
                  bias={0.006}
                  worldDistanceThreshold={40}
                  worldDistanceFalloff={8}
                  worldProximityThreshold={0.6}
                  worldProximityFalloff={0.2}
                />
                {/* DoF only on the macro — focusDistance is normalised
                    against near/far, so a value tuned for a 20 mm subject
                    throws the whole room out of focus. */}
                {stage === 4 && (
                  <DepthOfField focusDistance={0.0006} focalLength={0.008} bokehScale={3.2} height={480} />
                )}
                <Bloom intensity={0.35} luminanceThreshold={0.72} luminanceSmoothing={0.3} mipmapBlur />
                <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.12} />
                <Vignette eskil={false} offset={0.3} darkness={0.6} />
              </EffectComposer>
            </Suspense>
          </Canvas>
        </div>

        {/* ── Layer 2: type. Above both, so it survives the crossfade. ── */}
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center px-6 pb-32 md:px-16">
          <StageCopy stage={stage} />
        </div>

        {/* ── Layer 3: the material controls. Glass, bottom-right. ── */}
        <div className="pointer-events-none absolute bottom-24 right-6 z-30 md:right-16">
          <GroutControls active={stage >= 3} />
        </div>

        {/* Fixed chrome: progress rail. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 px-6 pb-7 md:px-16">
          <div className="flex items-center gap-3">
            {STAGES.map((s, i) => (
              <div
                key={s.kicker}
                className={`h-px flex-1 transition-colors duration-500 ${
                  i <= stage ? 'bg-gold' : 'bg-white/15'
                }`}
              />
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-wide2 text-haze-400">
            <span>{['The block', 'Living hall', 'Kitchen', 'Bathroom', '1.5 mm seam'][stage]}</span>
            <span>{stage < 4 ? 'Scroll' : 'End of path'}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* Split out so only this subtree re-renders when the stage changes — the
   Canvas beside it never does. */
function StageCopy({ stage }) {
  const s = STAGES[stage]
  if (!s) return null
  return (
    <div key={s.kicker} className="glass-dark max-w-md p-7 md:bg-transparent md:border-0 md:shadow-none md:backdrop-blur-0 md:p-0">
      <p className="font-mono text-[11px] uppercase tracking-ultra text-gold">
        {s.kicker}
      </p>
      <h2 className="mt-6 text-[clamp(1.7rem,3.4vw,2.7rem)] font-light leading-[1.08] tracking-tight text-white">
        {s.title}
      </h2>
      <p className="mt-5 text-[14px] leading-relaxed text-haze-300">{s.body}</p>
      {stage === 4 && (
        <a
          href="#quote"
          className="pointer-events-auto mt-8 inline-block rounded-full bg-gold px-7 py-3.5 text-[13px] font-medium text-ink-900 transition hover:bg-white"
        >
          The price, itemised →
        </a>
      )}
    </div>
  )
}
