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
import { PHOTO_HOLD, PHOTO_OUT } from '../scene/keyframes.js'
import GroutControls from './GroutControls.jsx'

/* Put your photograph at public/real-hdb-block-dusk.jpg.

   Shoot it yourself rather than pulling one off a stock site — a real block
   is a building someone owns, and a photograph of it is someone's copyright.
   Yours costs nothing, and a block you have actually worked in is a better
   picture anyway. Landscape, from across the carpark around 7pm, units lit. */
const PHOTO_SRC = '/real-hdb-block-dusk.jpg'

const STAGES = [
  {
    kicker: 'Layer 01 — Living hall',
    title: 'Cream marble, checkered border, 1.5 mm seams.',
    body: 'Porcelain the colour of warm stone, laid with a terracotta-and-cream runner at the threshold. The seams are the thinnest thing in the room — and the only part that will ever fail.'
  },
  {
    kicker: 'Layer 02 — Kitchen',
    title: 'Where cement grout drinks the cooking.',
    body: 'Burl wood below, glazed zellige above, soapstone between. Oil, turmeric and soap hit these joints daily. Epoxy is non-porous — it wipes clean because nothing ever soaked in.'
  },
  {
    kicker: 'Layer 03 — Bathroom',
    title: '100% waterproof. Nothing for mould to eat.',
    body: 'Terracotta underfoot, zellige to the ceiling, a backlit mirror in bronze. Epoxy grout is a cured thermoset — zero absorption, no feeding ground, no black lines by year two.'
  },
  {
    kicker: 'Layer 04 — The seam, ×150',
    title: 'This is the whole argument, twenty millimetres up.',
    body: 'One 1.5 mm joint. The near end is the cement you have: porous, matte, dead. The far end is liquid-set epoxy: 100% solids, light sliding off it. Pick its colour — the price is the same.'
  }
]

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v)
const smoothstep = (t) => t * t * (3 - 2 * t)

export default function ScrollJourney() {
  const sectionRef = useRef(null)
  const photoRef = useRef(null)
  const [stage, setStage] = useState(0)
  const [photoOk, setPhotoOk] = useState(true)

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
    const t = clamp01(-rect.top / (travel || 1))
    scrollState.t = t

    const img = photoRef.current
    if (img) {
      const out = smoothstep(clamp01((t - PHOTO_HOLD) / (PHOTO_OUT - PHOTO_HOLD)))
      img.style.opacity = String(1 - out)
      img.style.transform = `scale(${1 + out * 0.14})`
      img.style.visibility = out >= 0.999 ? 'hidden' : 'visible'
    }
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
      className="relative h-[560vh] w-full bg-ink-900"
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
            camera={{ position: [-7, 1.5, 4.6], fov: 38, near: 0.002, far: 60 }}
            gl={{ antialias: true, logarithmicDepthBuffer: true }}
            onCreated={({ gl }) => {
              gl.toneMapping = THREE.ACESFilmicToneMapping
              gl.toneMappingExposure = 1.4
            }}
          >
            <color attach="background" args={['#080C14']} />
            <fog attach="fog" args={['#080C14', 14, 34]} />
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
                {stage === 3 && (
                  <DepthOfField focusDistance={0.0006} focalLength={0.008} bokehScale={3.2} height={480} />
                )}
                <Bloom intensity={0.35} luminanceThreshold={0.72} luminanceSmoothing={0.3} mipmapBlur />
                <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.12} />
                <Vignette eskil={false} offset={0.3} darkness={0.6} />
              </EffectComposer>
            </Suspense>
          </Canvas>
        </div>

        {/* ── Layer 1: the photograph. Fades and scales out over the WebGL. ── */}
        <div
          ref={photoRef}
          className="pointer-events-none absolute inset-0 z-10 will-change-[opacity,transform]"
          style={{ transformOrigin: 'center 55%' }}
        >
          {photoOk ? (
            <img
              src={PHOTO_SRC}
              alt="Singapore residential block at dusk"
              className="h-full w-full object-cover"
              onError={() => setPhotoOk(false)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(180deg,#141B2B_0%,#0C1220_55%,#080C14_100%)]">
              <p className="max-w-sm px-8 text-center font-mono text-[11px] uppercase leading-relaxed tracking-wide2 text-haze-400">
                Add your photograph at
                <br />
                <span className="text-gold">public{PHOTO_SRC}</span>
                <br />
                <span className="normal-case tracking-normal">
                  Landscape, a block at dusk with the units lit.
                </span>
              </p>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-ink-900/85 via-ink-900/45 to-transparent" />
          <div className="absolute inset-0 bg-ink-900/25" />
        </div>

        {/* ── Layer 2: type. Above both, so it survives the crossfade. ── */}
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center px-6 pb-32 md:px-16">
          <StageCopy stage={stage} />
        </div>

        {/* ── Layer 3: the material controls. Glass, bottom-right. ── */}
        <div className="pointer-events-none absolute bottom-24 right-6 z-30 md:right-16">
          <GroutControls active={stage >= 2} />
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
            <span>{['Living hall', 'Kitchen', 'Bathroom', '1.5 mm seam'][stage]}</span>
            <span>{stage < 3 ? 'Scroll' : 'End of path'}</span>
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
    <div key={s.kicker} className="glass max-w-md p-7 md:bg-transparent md:border-0 md:shadow-none md:backdrop-blur-0 md:p-0">
      <p className="font-mono text-[11px] uppercase tracking-ultra text-gold">
        {s.kicker}
      </p>
      <h2 className="mt-6 text-[clamp(1.7rem,3.4vw,2.7rem)] font-light leading-[1.08] tracking-tight text-white">
        {s.title}
      </h2>
      <p className="mt-5 text-[14px] leading-relaxed text-haze-300">{s.body}</p>
      {stage === 3 && (
        <a
          href="#quote"
          className="pointer-events-auto mt-8 inline-block rounded-full bg-gold px-7 py-3.5 text-[13px] font-medium text-ink-900 transition hover:bg-white"
        >
          Price this for my place — 30 seconds
        </a>
      )}
    </div>
  )
}
