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

/* Put your photograph at public/real-hdb-block-dusk.jpg.

   Shoot it yourself rather than pulling one off a stock site or an image
   search — a real block is a building someone owns, and a photograph of it is
   someone's copyright. Yours costs nothing, and a block you have actually
   worked in is a better picture anyway.

   What works: landscape, from across a carpark or void deck so the whole
   massing reads, around 7pm when the sky still has colour but the units are
   lit. Lit windows are what make the image feel inhabited, which is the entire
   reason for opening on a photograph instead of a render. */
const PHOTO_SRC = '/real-hdb-block-dusk.jpg'

const STAGES = [
  {
    kicker: '02 — The room',
    title: 'It starts in the one room that never dries out.',
    body: 'Cement grout is porous by design — it drinks water, soap and body oils. Scrubbing the black off cleans the surface of something growing inside the joint.'
  },
  {
    kicker: '03 — The floor',
    title: 'We price the joint, not the floor area.',
    body: 'A 300×300 floor holds exactly twice the joint of a 600×600 floor the same size. That is why a per-square-foot quote tells you nothing, and why ours is per metre of joint.'
  },
  {
    kicker: '04 — The joint',
    title: 'Three millimetres. Cement one end, epoxy the other.',
    body: 'One joint, running from the grout you have into the grout we lay. Epoxy is a cured thermoset with nothing for mould to feed on — which is the whole argument, and the whole job.'
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
     contains a WebGL canvas at 60 Hz is how a smooth page becomes a slideshow.
     React owns the stage label only, which changes twice in the whole section. */
  const onScroll = useCallback(() => {
    const el = sectionRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const travel = el.offsetHeight - window.innerHeight
    const t = clamp01(-rect.top / (travel || 1))
    scrollState.t = t

    const img = photoRef.current
    if (img) {
      // Hold at full opacity, then cross-fade out while scaling up slightly.
      // The scale is what stops the transition reading as a plain dissolve —
      // it feels like moving through the facade rather than past it.
      const out = smoothstep(clamp01((t - PHOTO_HOLD) / (PHOTO_OUT - PHOTO_HOLD)))
      img.style.opacity = String(1 - out)
      img.style.transform = `scale(${1 + out * 0.14})`
      // Stop compositing a fully transparent full-screen layer.
      img.style.visibility = out >= 0.999 ? 'hidden' : 'visible'
    }
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
       sticky child, so the canvas pins while you scroll through it. `fixed`
       would leak the canvas over the sections above and below. */
    <section ref={sectionRef} className="relative h-[460vh] w-full bg-ink-900">
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* ── Layer 0: WebGL. Underneath, revealed by the photo fading out. ── */}
        <div className="absolute inset-0 z-0">
          <Canvas
            shadows
            dpr={[1, 1.75]}
            /* near = 2 mm for the macro. Against a 60 m far that is a 30,000:1
               depth range, which shreds a 24-bit depth buffer — logarithmic
               depth is what makes it survivable. */
            camera={{ position: [0, 1.55, 3.6], fov: 38, near: 0.002, far: 60 }}
            gl={{ antialias: true, logarithmicDepthBuffer: true }}
            onCreated={({ gl }) => {
              gl.toneMapping = THREE.ACESFilmicToneMapping
              gl.toneMappingExposure = 1.55
            }}
          >
            <color attach="background" args={['#0A0C0F']} />
            <SoftShadows size={26} samples={12} focus={0.7} />
            <Suspense fallback={null}>
              <Journey onStage={setStage} />
              <EffectComposer multisampling={4} enableNormalPass>
                <SSAO
                  intensity={22}
                  radius={0.09}
                  luminanceInfluence={0.5}
                  bias={0.006}
                  worldDistanceThreshold={40}
                  worldDistanceFalloff={8}
                  worldProximityThreshold={0.6}
                  worldProximityFalloff={0.2}
                />
                {/* DoF only on the macro. focusDistance is normalised against
                    the camera's near/far range, so a value tuned for a 22 mm
                    subject throws the whole room out of focus. */}
                {stage === 2 && (
                  <DepthOfField focusDistance={0.0006} focalLength={0.008} bokehScale={3.2} height={480} />
                )}
                <Bloom intensity={0.42} luminanceThreshold={0.62} luminanceSmoothing={0.3} mipmapBlur />
                <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.22} />
                <Vignette eskil={false} offset={0.3} darkness={0.55} />
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
              alt="HDB residential block at dusk"
              className="h-full w-full object-cover"
              onError={() => setPhotoOk(false)}
            />
          ) : (
            /* Placeholder until the real file is dropped in. Deliberately
               obvious — a plausible-looking fake gradient would be worse,
               because it would quietly ship. */
            <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(180deg,#16202B_0%,#0E141C_55%,#0A0C0F_100%)]">
              <p className="max-w-sm px-8 text-center font-mono text-[11px] uppercase leading-relaxed tracking-wide2 text-haze-400">
                Add your photograph at
                <br />
                <span className="text-ember">public{PHOTO_SRC}</span>
                <br />
                <span className="normal-case tracking-normal">
                  Landscape, a block at dusk with the units lit.
                </span>
              </p>
            </div>
          )}
          {/* Scrim so overlay type stays legible on any photograph. */}
          <div className="absolute inset-0 bg-gradient-to-r from-ink-900/85 via-ink-900/45 to-transparent" />
          <div className="absolute inset-0 bg-ink-900/25" />
        </div>

        {/* ── Layer 2: type. Above both, so it survives the crossfade. ── */}
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center px-6 pb-28 md:px-16">
          <StageCopy stage={stage} />
        </div>

        {/* Fixed chrome. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 px-6 pb-7 md:px-16">
          <div className="flex items-center gap-3">
            {STAGES.map((s, i) => (
              <div
                key={s.kicker}
                className={`h-px flex-1 transition-colors duration-500 ${
                  i <= stage ? 'bg-ember' : 'bg-white/15'
                }`}
              />
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-wide2 text-haze-400">
            <span>{['Interior', 'Tile slab', '3 mm channel'][stage]}</span>
            <span>{stage < 2 ? 'Scroll' : 'End of path'}</span>
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
    <div key={s.kicker} className="max-w-md">
      <p className="font-mono text-[11px] uppercase tracking-ultra text-ember">
        {s.kicker}
      </p>
      <h2 className="mt-6 text-[clamp(1.7rem,3.4vw,2.7rem)] font-light leading-[1.08] tracking-tight text-white">
        {s.title}
      </h2>
      <p className="mt-5 text-[14px] leading-relaxed text-haze-300">{s.body}</p>
      {stage === 2 && (
        <a
          href="#quote"
          className="pointer-events-auto mt-8 inline-block rounded-full bg-white px-7 py-3.5 text-[13px] font-medium text-ink-900 transition hover:bg-ember hover:text-white"
        >
          Price your own joint — 30 seconds
        </a>
      )}
    </div>
  )
}
