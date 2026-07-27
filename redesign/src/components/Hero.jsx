import { Suspense, useRef, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import TileSlab from './TileSlab.jsx'

const rise = {
  hidden: { opacity: 0, y: 26 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, delay: 0.15 + i * 0.09, ease: [0.16, 1, 0.3, 1] }
  })
}

export default function Hero() {
  // Kept in a ref, not state — the pointer changes every mousemove and this
  // must never trigger a React render. The 3D scene reads it inside useFrame.
  const pointer = useRef({ x: 0, y: 0 })

  const onMove = useCallback((e) => {
    pointer.current = {
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: (e.clientY / window.innerHeight) * 2 - 1
    }
  }, [])

  return (
    <section
      onPointerMove={onMove}
      className="relative h-[100svh] w-full overflow-hidden bg-ink-900"
    >
      {/* ---- WebGL layer ---- */}
      <div className="absolute inset-0">
        <Canvas
          shadows
          dpr={[1, 1.75]}
          camera={{ position: [0, 2.6, 8.2], fov: 38 }}
          gl={{ antialias: true }}
        >
          <Suspense fallback={null}>
            <TileSlab pointer={pointer} />
          </Suspense>
        </Canvas>
      </div>

      {/* Vignette so type stays legible over the render, whatever it is doing. */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,#08090A_92%)]" />

      {/* ---- DOM overlay ----
          The whole overlay is pointer-events-none so the cursor reaches the
          canvas underneath; only the things you can actually click opt back in
          with pointer-events-auto. This is the bug that ruins most 3D sites. */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between px-6 pb-10 pt-28 md:px-12 md:pb-14">
        <div className="mx-auto w-full max-w-6xl">
          <motion.p
            variants={rise} initial="hidden" animate="show" custom={0}
            className="font-mono text-[11px] uppercase tracking-ultra text-haze-400"
          >
            Singapore &amp; Johor, Malaysia
          </motion.p>

          <motion.h1
            variants={rise} initial="hidden" animate="show" custom={1}
            className="mt-7 max-w-3xl text-[clamp(2.4rem,6.4vw,5.2rem)] font-light leading-[0.98] tracking-tight text-white"
          >
            The three millimetres
            <br />
            <span className="text-haze-400">everyone else</span> hides.
          </motion.h1>

          <motion.p
            variants={rise} initial="hidden" animate="show" custom={2}
            className="mt-8 max-w-md text-[15px] leading-relaxed text-haze-300"
          >
            Left of the line is cement. Right of it is epoxy. Same tile, same
            light — the joint is the only thing we changed, and it is the only
            thing that fails.
          </motion.p>

          <motion.div
            variants={rise} initial="hidden" animate="show" custom={3}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href="#quote"
              className="pointer-events-auto rounded-full bg-white px-7 py-3.5 text-[13px] font-medium text-ink-900 transition hover:bg-ember hover:text-white"
            >
              Build my quote — 30 seconds
            </a>
            <a
              href="#work"
              className="pointer-events-auto rounded-full border border-white/15 px-7 py-3.5 text-[13px] font-medium text-white transition hover:border-white/40"
            >
              See the work
            </a>
          </motion.div>
        </div>

        {/* Bottom rail — the numbers, stated flatly. */}
        <motion.div
          variants={rise} initial="hidden" animate="show" custom={5}
          className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-6 border-t border-white/10 pt-7 md:grid-cols-4"
        >
          {[
            ['Cement, re-done as it fails', '$110', 'a year'],
            ['Epoxy, 15-year material life', '$47', 'a year'],
            ['Written warranty', '5 yr', '7 whole home'],
            ['Every price', 'Published', 'no site visit first']
          ].map(([label, big, sub]) => (
            <div key={label}>
              <p className="font-mono text-[10px] uppercase tracking-wide2 text-haze-400">
                {label}
              </p>
              <p className="mt-2 text-2xl font-light text-white">{big}</p>
              <p className="text-[11px] text-haze-400">{sub}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
