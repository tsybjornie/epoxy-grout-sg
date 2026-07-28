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
      className="relative h-[100svh] w-full overflow-hidden bg-paper"
    >
      {/* ---- WebGL layer ---- */}
      <div className="absolute inset-0">
        <Canvas
          shadows
          dpr={[1, 1.75]}
          camera={{ position: [0, 2.6, 8.2], fov: 38 }}
          gl={{ antialias: true }}
        >
          <color attach="background" args={['#F4F1EA']} />
          <Suspense fallback={null}>
            <TileSlab pointer={pointer} />
          </Suspense>
        </Canvas>
      </div>

      {/* Soft ivory vignette so type sits on calm ground. */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#F7F5F1_95%)]" />

      {/* ---- DOM overlay ----
          pointer-events-none so the cursor reaches the canvas; only the
          clickable things opt back in. */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between px-6 pb-10 pt-28 md:px-12 md:pb-14">
        <div className="mx-auto w-full max-w-6xl">
          <motion.p
            variants={rise} initial="hidden" animate="show" custom={0}
            className="font-mono text-[11px] uppercase tracking-ultra text-stone-500"
          >
            Singapore &amp; Johor, Malaysia
          </motion.p>

          <motion.h1
            variants={rise} initial="hidden" animate="show" custom={1}
            className="mt-7 max-w-3xl text-[clamp(2.4rem,6.4vw,5.2rem)] font-light leading-[0.98] tracking-tight text-ink-900"
          >
            The three millimetres
            <br />
            <span className="text-stone-400">everyone else</span> hides.
          </motion.h1>

          <motion.p
            variants={rise} initial="hidden" animate="show" custom={2}
            className="mt-8 max-w-md text-[15px] leading-relaxed text-stone-600"
          >
            Cement left of the line. Epoxy right. Same tile, same light —
            the joint is the only thing that fails.
          </motion.p>

          <motion.div
            variants={rise} initial="hidden" animate="show" custom={3}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href="#quote"
              className="pointer-events-auto rounded-full bg-ink-900 px-7 py-3.5 text-[13px] font-medium text-white transition hover:bg-gold hover:text-ink-900"
            >
              The price, itemised
            </a>
            <a
              href="#work"
              className="pointer-events-auto rounded-full border border-stone-300 px-7 py-3.5 text-[13px] font-medium text-ink-900 transition hover:border-stone-500"
            >
              The work
            </a>
          </motion.div>
        </div>

        {/* Bottom rail — the numbers, stated flatly. */}
        <motion.div
          variants={rise} initial="hidden" animate="show" custom={5}
          className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-6 border-t border-stone-300/70 pt-7 md:grid-cols-4"
        >
          {[
            ['Cement, re-done as it fails', '$110', 'a year'],
            ['Epoxy, 15-year material life', '$47', 'a year'],
            ['Written warranty', '5 yr', 'any job size'],
            ['Every price', 'Published', 'no site visit first']
          ].map(([label, big, sub]) => (
            <div key={label}>
              <p className="font-mono text-[10px] uppercase tracking-wide2 text-stone-500">
                {label}
              </p>
              <p className="mt-2 text-2xl font-light text-ink-900">{big}</p>
              <p className="text-[11px] text-stone-500">{sub}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
