import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import Rooms from './rooms.jsx'
import { samplePath, ramp, cameraParam, stageAt, BATH_X, MACRO_Z } from './keyframes.js'
import { scrollState } from './scrollState.js'
import { updateGroutMaterials } from './materials.js'

const _pos = new THREE.Vector3()
const _look = new THREE.Vector3()

export default function Journey({ onStage }) {
  const { camera } = useThree()

  const eased = useRef(0)
  const pointer = useRef({ x: 0, y: 0 })
  const ambient = useRef()
  const sun = useRef()
  const key = useRef()
  const spot = useRef()
  const lastStage = useRef(-1)

  useFrame((_, delta) => {
    /* Weighted scrubbing.

       scrollState.t is raw page scroll, which arrives as a near-step change
       on a fast wheel flick. A critically-damped follow gives the camera
       mass: it keeps moving briefly after you stop and never snaps. Framed
       in terms of delta so a 144 Hz monitor gets the same feel as 60 Hz. */
    const k = 1 - Math.pow(0.0000001, delta)
    eased.current = THREE.MathUtils.lerp(eased.current, scrollState.t, k)
    const t = eased.current

    // The photograph owns the opening; the camera runs on a remapped
    // parameter so the 3D is never moving behind an opaque image.
    const u = cameraParam(t)

    samplePath(u, _pos, _look)

    /* Mouse parallax. The pointer is damped separately and more loosely
       than scroll, so the room "floats" against the cursor. Scaled down as
       the macro approaches — at 20 mm from the subject a 40 mm sway is not
       parallax, it is an earthquake. */
    const pk = 1 - Math.pow(0.00001, delta)
    pointer.current.x = THREE.MathUtils.lerp(pointer.current.x, scrollState.px, pk)
    pointer.current.y = THREE.MathUtils.lerp(pointer.current.y, scrollState.py, pk)
    const sway = 0.05 * (1 - ramp(u, 0.83, 0.96))
    camera.position.set(
      _pos.x + pointer.current.x * sway,
      _pos.y - pointer.current.y * sway * 0.6,
      _pos.z
    )
    camera.lookAt(_look)
    camera.updateProjectionMatrix()

    /* The key light tracks the pointer too — this is the "lighting physics"
       read: speculars on the zellige and the epoxy crawl as the cursor
       moves. It rides ahead of whichever room the camera is in. */
    if (key.current) {
      key.current.position.set(
        camera.position.x + pointer.current.x * 2.4,
        2.3 + pointer.current.y * -0.8,
        2.6
      )
    }

    /* Light ramps with the shot. Warm gallery daylight for the rooms, then
       the ambient drops away and a hard raking spot takes over for the
       macro — at 20 mm the whole read is the shadow line down the channel,
       and flat light kills it. */
    const macro = ramp(u, 0.87, 1.0)
    if (ambient.current) ambient.current.intensity = 1.15 - 0.95 * macro
    if (sun.current) sun.current.intensity = 2.6 - 1.9 * macro
    if (key.current) key.current.intensity = 1.1 * (1 - macro)
    if (spot.current) spot.current.intensity = 2.1 * macro

    // Grout materials glide toward the store's swatch/material target.
    updateGroutMaterials(delta)

    const stage = stageAt(u)
    if (stage !== lastStage.current) {
      lastStage.current = stage
      onStage?.(stage)
    }
  })

  return (
    <>
      <ambientLight ref={ambient} intensity={1.15} color="#FFEEDD" />
      <directionalLight
        ref={sun}
        position={[4, 7, 5]}
        intensity={2.6}
        color="#FFF2E0"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.01}
        shadow-camera-far={40}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />
      <hemisphereLight args={['#C9B99A', '#10141E', 0.7]} />

      {/* Pointer-driven key light — no shadows, it exists for speculars. */}
      <pointLight ref={key} position={[0, 2.3, 2.6]} intensity={1.1} distance={12} decay={1.4} color="#FFE7C4" />

      {/* Raking spot for the macro. Almost parallel to the floor, so the
          tile edge throws a shadow straight down the 1.5 mm channel.

          decay={0} is deliberate: physical inverse-square falloff is
          unusable across a scene spanning metres to millimetres — aimed
          from 80 mm away, an intensity that reads at the room arrives at
          the macro scaled by 1/0.08² and blows every tile to pure white. */}
      <spotLight
        ref={spot}
        position={[BATH_X + 0.06, 0.05, MACRO_Z - 0.02]}
        target-position={[BATH_X, 0, MACRO_Z]}
        angle={0.8}
        penumbra={0.9}
        intensity={0}
        decay={0}
        color="#FFF3E4"
      />

      <Rooms />
    </>
  )
}
