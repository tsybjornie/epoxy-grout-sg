import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

/* The object in the hero is not a decorative blob — it is the product.

   A slab of tile with real grout joints between it, split down the middle:
   the left half's joints are the grimy cement you have now, the right half's
   are epoxy. Same tiles, same light, one variable changed. That is the entire
   sales argument rendered in 3D, and it is the one 3D object on the internet
   that only this business has a reason to show. */

const GRID = 6          // 6 x 6 tiles
const TILE = 1.0        // tile face, world units
const JOINT = 0.075     // joint width — deliberately visible; real is ~3mm
const PITCH = TILE + JOINT

// Resting tilt, radians. See the note in useFrame for where 1.22 comes from.
const REST_X = 1.22

const CEMENT = '#4A4640'  // stained, organic, uneven
const EPOXY = '#EDEAE4'   // dense, bright, uniform

function Tile({ position }) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={[TILE, 0.16, TILE]} />
      {/* Porcelain: charcoal, low roughness, faint sheen. Light enough to
          separate from the near-black page, dark enough that the pale epoxy
          joints are what your eye lands on. */}
      <meshStandardMaterial color="#3C4249" roughness={0.32} metalness={0.08} />
    </mesh>
  )
}

/* The joints are one plane sitting just below the tile faces. Splitting it in
   two lets each half take its own colour and roughness — cement reads matte
   and dead, epoxy reads slightly wet. */
function JointBed({ side, color, roughness }) {
  const w = (GRID * PITCH) / 2
  return (
    <mesh
      position={[side * w / 2, -0.06, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
    >
      <planeGeometry args={[w, GRID * PITCH]} />
      <meshStandardMaterial color={color} roughness={roughness} metalness={0} />
    </mesh>
  )
}

export default function TileSlab({ pointer }) {
  const group = useRef()

  const tiles = useMemo(() => {
    const out = []
    const offset = ((GRID - 1) * PITCH) / 2
    for (let x = 0; x < GRID; x++) {
      for (let z = 0; z < GRID; z++) {
        out.push([x * PITCH - offset, 0, z * PITCH - offset])
      }
    }
    return out
  }, [])

  /* Trick 4 from the pipeline: interpolate toward the cursor rather than
     tracking it. Raw tracking feels twitchy and cheap; a lerp with a low
     factor gives the weight that reads as "expensive". Frame-rate independent
     via delta so it behaves the same at 60 and 120 Hz. */
  useFrame((state, delta) => {
    if (!group.current) return
    const k = 1 - Math.pow(0.001, delta) // ~smooth damp
    // REST_X tips the slab up to face the camera. The slab lies in the XZ
    // plane, so its normal is +Y; rotating about X by θ swings that normal to
    // (0, cosθ, sinθ). The camera sits at ~17.6° elevation, so θ ≈ 1.22 rad
    // points the tile faces almost straight down the lens. Leave it flat and
    // you are looking at a 6-unit-wide line.
    const targetX = REST_X - pointer.current.y * 0.16
    const targetY = pointer.current.x * 0.3
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, k)
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetY, k)
    // A slow float so the scene is never completely still.
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.09
  })

  return (
    <>
      <ambientLight intensity={0.75} />
      <directionalLight
        position={[4, 7, 3]}
        intensity={2.6}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      {/* Rim light from behind picks the slab edge off the black background. */}
      <directionalLight position={[-5, 2, -4]} intensity={0.7} color="#8FB4FF" />
      {/* Deliberately NOT drei's <Environment preset="…" />. That helper fetches
          a ~1 MB HDR from a third-party CDN at runtime: an uncontrolled external
          dependency that adds a render-blocking round trip, and one that throws
          and kills the whole canvas if it fails. Three lights and a warm bounce
          get us the same read with nothing to download. */}
      <hemisphereLight args={['#9DB4D0', '#141210', 0.55]} />
      <pointLight position={[-3, 1.4, 4]} intensity={12} distance={14} color="#FFB27A" />

      {/* Pushed right so the slab occupies the empty half of the hero and
          the headline never sits on top of it. */}
      <group ref={group} position={[2.5, 0, 0]} rotation={[REST_X, 0, 0]}>
        <JointBed side={-1} color={CEMENT} roughness={0.95} />
        <JointBed side={1} color={EPOXY} roughness={0.35} />
        {tiles.map((p, i) => (
          <Tile key={i} position={p} />
        ))}
      </group>

      <ContactShadows
        position={[2.5, -2.4, 0]}
        opacity={0.5}
        scale={16}
        blur={2.6}
        far={4}
      />
    </>
  )
}
