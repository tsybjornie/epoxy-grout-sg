import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { Room } from './Apartment.jsx'
import TileFloor from './TileFloor.jsx'
import { samplePath, ramp, cameraParam } from './keyframes.js'
import { scrollState } from './scrollState.js'

const _pos = new THREE.Vector3()
const _look = new THREE.Vector3()

export default function Journey({ onStage }) {
  const { camera } = useThree()

  const eased = useRef(0)
  const ambient = useRef()
  const sun = useRef()
  const spot = useRef()
  const lastStage = useRef(-1)

  useFrame((_, delta) => {
    /* Weighted scrubbing.

       scrollState.t is raw page scroll, which arrives as a near-step change on
       a fast wheel flick. A critically-damped follow gives the camera mass: it
       keeps moving briefly after you stop and never snaps. Framed in terms of
       delta so a 144 Hz monitor gets the same feel as a 60 Hz one — a bare
       lerp(x, y, 0.1) does not. */
    const k = 1 - Math.pow(0.0000001, delta)
    eased.current = THREE.MathUtils.lerp(eased.current, scrollState.t, k)
    const t = eased.current

    // The photograph owns the opening, so the camera runs on its own remapped
    // parameter rather than on raw page scroll — otherwise the 3D is already
    // halfway through its path by the time the image finishes fading out.
    const u = cameraParam(t)

    samplePath(u, _pos, _look)
    camera.position.copy(_pos)
    camera.lookAt(_look)
    camera.updateProjectionMatrix()

    /* Light ramps with the shot. Broad daylight for the room, then the ambient
       drops away and a hard raking spot takes over for the macro — at 22 mm the
       whole read is the shadow line down the channel, and flat light kills it. */
    const macro = ramp(u, 0.45, 1.0)
    if (ambient.current) ambient.current.intensity = 1.5 - 1.28 * macro
    if (sun.current) sun.current.intensity = 3.0 - 2.2 * macro
    if (spot.current) spot.current.intensity = 1.9 * macro

    const stage = u < 0.3 ? 0 : u < 0.72 ? 1 : 2
    if (stage !== lastStage.current) {
      lastStage.current = stage
      onStage?.(stage)
    }
  })

  return (
    <>
      <ambientLight ref={ambient} intensity={1.5} />
      <directionalLight
        ref={sun}
        position={[3, 6, 4]}
        intensity={3.0}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.01}
        shadow-camera-far={20}
        shadow-camera-left={-4}
        shadow-camera-right={4}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
      />
      <hemisphereLight args={['#93AECC', '#15181B', 0.9]} />

      {/* Raking spot for the macro. Almost parallel to the floor, so the 5 mm
          tile edge throws a shadow straight down the 3 mm channel.

          decay={0} is deliberate: physical inverse-square falloff is unusable
          across a scene spanning metres to millimetres — aimed from 80 mm away,
          an intensity that reads at the slab arrives at the macro scaled by
          1/0.08² and blows every tile to pure white. */}
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

      <Room />
      <TileFloor />
    </>
  )
}
