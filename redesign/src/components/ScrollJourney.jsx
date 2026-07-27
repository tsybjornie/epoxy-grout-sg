import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll, SoftShadows } from '@react-three/drei'
import { EffectComposer, SSAO, Bloom, Vignette, Noise, DepthOfField } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'
import Journey from '../scene/Journey.jsx'

const STAGES = [
  {
    kicker: '01 — The block',
    title: 'Nobody re-tiles a whole flat because the tiles failed.',
    body: 'The tiles are fine. They are almost always fine. What went is the three millimetres between them, and that is a different job at a different price.'
  },
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

export default function ScrollJourney() {
  const [stage, setStage] = useState(0)

  return (
    <section className="relative h-[100svh] w-full bg-ink-900">
      <Canvas
        shadows
        dpr={[1, 1.75]}
        /* near = 2 mm because the last keyframe sits 24 mm off the joint. But
           a 2 mm near against a 60 m far is a 30,000:1 depth range, which
           shreds a normal 24-bit depth buffer — the house z-fights itself into
           confetti. logarithmicDepthBuffer is what makes the range survivable. */
        camera={{ position: [0, 6.5, 17], fov: 38, near: 0.002, far: 60 }}
        gl={{ antialias: true, logarithmicDepthBuffer: true }}
        /* ACES is the single biggest step from "3D model" to "render". Linear
           tone mapping clips highlights to flat white and crushes shadows to
           flat black; ACES rolls both off the way a camera sensor does, which
           is most of why CG footage reads as photographed. */
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping
          gl.toneMappingExposure = 1.55
        }}
      >
        <color attach="background" args={['#0A0C0F']} />
        {/* Dusk gradient behind the block. A pure-black void is the other
            instant CG tell — real exteriors always sit against something. */}
        <fog attach="fog" args={['#0E141C', 55, 150]} />
        <SoftShadows size={26} samples={12} focus={0.7} />
        <Suspense fallback={null}>
          {/* pages={4}, not 5. scroll.offset spans (pages - 1) screens, so with 4
                caption blocks each one full viewport tall, caption i centres at
                offset i/3 = 0, 0.33, 0.66, 1.0 — exactly the keyframe times. At
                pages={5} they centred at i/4 and every caption ran a stage ahead
                of the camera. */}
          <ScrollControls pages={4} damping={0.32}>
            <Journey onStage={setStage} />

            {/* Captions laid out in NORMAL FLOW, one full viewport each.
                Absolutely positioning them at `${i*100}vh` looked right but
                drifts: ScrollControls sizes its html track from the canvas
                container, and scroll.offset spans (pages - 1) screens, not
                pages. Stacked h-screen blocks stay locked to the keyframes by
                construction, with a trailing spacer for the 5th page. */}
            <Scroll html style={{ width: '100%' }}>
              {STAGES.map((s, i) => (
                <div
                  key={s.kicker}
                  className="pointer-events-none flex h-screen w-screen items-center px-6 pb-28 md:px-16"
                >
                  <div className="max-w-md">
                    <p className="font-mono text-[11px] uppercase tracking-ultra text-ember">
                      {s.kicker}
                    </p>
                    <h2 className="mt-6 text-[clamp(1.7rem,3.4vw,2.7rem)] font-light leading-[1.08] tracking-tight text-white">
                      {s.title}
                    </h2>
                    <p className="mt-5 text-[14px] leading-relaxed text-haze-300">
                      {s.body}
                    </p>
                    {i === 3 && (
                      <a
                        href="#quote"
                        className="pointer-events-auto mt-8 inline-block rounded-full bg-white px-7 py-3.5 text-[13px] font-medium text-ink-900 transition hover:bg-ember hover:text-white"
                      >
                        Price your own joint — 30 seconds
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </Scroll>
          </ScrollControls>

          {/* The grade. Each of these is doing one specific job:
              SSAO      — contact darkening in the reveals, balcony undersides
                          and the 3 mm channel. Absence of AO is the most
                          reliable "this is CG" signal there is.
              Bloom     — lit windows bleed slightly, as they do through a lens.
              DoF       — shallow focus at the macro, where a real 22 mm shot
                          would have millimetres of depth of field.
              Noise     — a little grain; perfectly clean pixels look synthetic.
              Vignette  — lens falloff. */}
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
            {/* DoF only on the macro. focusDistance is normalised against the
                camera's near/far range, so a value tuned for a 22 mm subject
                throws a 42 m building completely out of focus — which is
                exactly what it did on the first pass: the whole block soft.
                Mounted per stage rather than animated, since it changes three
                times in a whole journey. */}
            {stage === 3 && (
              <DepthOfField focusDistance={0.0006} focalLength={0.008} bokehScale={3.2} height={480} />
            )}
            <Bloom intensity={0.42} luminanceThreshold={0.62} luminanceSmoothing={0.3} mipmapBlur />
            <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.22} />
            <Vignette eskil={false} offset={0.3} darkness={0.55} />
          </EffectComposer>
        </Suspense>
      </Canvas>

      {/* Fixed chrome — outside the canvas so it never scrolls with the rig. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 px-6 pb-7 md:px-16">
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
          <AnimatePresence mode="wait">
            <motion.span
              key={stage}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.32 }}
            >
              {['Exterior', 'Interior', 'Tile slab', '3 mm channel'][stage]}
            </motion.span>
          </AnimatePresence>
          <span>{stage < 3 ? 'Scroll' : 'End of path'}</span>
        </div>
      </div>
    </section>
  )
}
