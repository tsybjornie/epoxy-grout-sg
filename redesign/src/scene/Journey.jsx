import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'
import Architecture from './Architecture.jsx'
import TileFloor from './TileFloor.jsx'
import { samplePath, ramp } from './keyframes.js'

const _pos = new THREE.Vector3()
const _look = new THREE.Vector3()

export default function Journey({ onStage }) {
  const scroll = useScroll()
  const { camera } = useThree()

  const eased = useRef(0)          // our own smoothed copy of scroll.offset
  const wallFade = useRef(1)
  const ambient = useRef()
  const sun = useRef()
  const spot = useRef()
  const lastStage = useRef(-1)

  useFrame((_, delta) => {
    /* Weighted scrubbing.

       ScrollControls already damps, but a fast wheel flick still arrives as a
       near-step change in offset. Running our own critically-damped follow on
       top gives the camera mass — it keeps moving briefly after you stop, and
       it never snaps. Framed in terms of delta so a 144 Hz monitor gets the
       same feel as a 60 Hz one; a bare `lerp(x, y, 0.1)` does not. */
    const k = 1 - Math.pow(0.0000001, delta)
    eased.current = THREE.MathUtils.lerp(eased.current, scroll.offset, k)
    const t = eased.current

    samplePath(t, _pos, _look)
    camera.position.copy(_pos)
    camera.lookAt(_look)
    camera.updateProjectionMatrix()

    // Shell dissolves as we pass through the facade.
    wallFade.current = 1 - ramp(t, 0.18, 0.34)

    /* Light ramps with the shot. Flat daylight for the massing, then the
       ambient drops away and a hard spot takes over for the macro — at 24 mm
       the whole read is the shadow line down the channel, and flat light
       destroys it. */
    const macro = ramp(t, 0.62, 1.0)
    if (ambient.current) ambient.current.intensity = 1.15 - 0.92 * macro
    if (sun.current) sun.current.intensity = 2.4 - 1.5 * macro
    if (spot.current) spot.current.intensity = 1.9 * macro

    const stage = t < 0.25 ? 0 : t < 0.5 ? 1 : t < 0.75 ? 2 : 3
    if (stage !== lastStage.current) {
      lastStage.current = stage
      onStage?.(stage)
    }
  })

  return (
    <>
      <ambientLight ref={ambient} intensity={1.15} />
      <directionalLight
        ref={sun}
        position={[6, 12, 8]}
        intensity={2.4}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.01}
        shadow-camera-far={40}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />
      <hemisphereLight args={['#9DB4D0', '#0A0B0C', 0.5]} />

      {/* Raking spot for the macro. Almost parallel to the floor, so the 5 mm
          tile edge throws a shadow straight down the 3 mm channel. */}
      {/* decay={0} is deliberate. Physical inverse-square falloff is unusable
          across a scene spanning 17 m to 22 mm: aimed from 80 mm away, an
          intensity that reads correctly at the slab arrives at the macro
          multiplied by ~1/0.08² and blows every tile to pure white — which is
          exactly what the first macro render did. With decay off, intensity is
          the only variable and the ramp below stays predictable. */}
      <spotLight
        ref={spot}
        position={[0.06, 0.05, -0.02]}
        target-position={[0, 0, 0]}
        angle={0.8}
        penumbra={0.9}
        intensity={0}
        decay={0}
        color="#FFF3E4"
      />

      <Architecture fade={wallFade} />
      <TileFloor />
    </>
  )
}
