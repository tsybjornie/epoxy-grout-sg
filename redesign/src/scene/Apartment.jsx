import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { ROOM_W, ROOM_D, WALL_H } from './keyframes.js'
import { concreteMaps } from './concrete.js'

/* A Singapore block, not a detached house with a pitched roof.

   Nobody in this market lives in the thing an architectural template gives
   you. They live in an HDB slab block or a low-rise condo: a flat-roofed
   rectangle, horizontal floor slabs expressed on the facade, a repeating grid
   of windows and service yards, and a lift core. That silhouette is instantly
   legible to anyone in Singapore, which is the entire point of the shot — the
   viewer should recognise their own block before they read a word. */

const STOREYS = 7
const FLOOR_H = 3.0
const BAY_W = 3.6          // one unit's frontage
const BAYS = 6
const BLOCK_W = BAY_W * BAYS      // 21.6 m
const BLOCK_D = 11.0
const BLOCK_H = STOREYS * FLOOR_H // 21 m

// Deterministic pseudo-random so a given window is lit the same on every
// render — Math.random() here would make the block flicker between frames.
function lit(bay, floor) {
  const h = Math.sin(bay * 12.9898 + floor * 78.233) * 43758.5453
  return h - Math.floor(h)
}

function Windows({ register }) {
  const cells = useMemo(() => {
    const out = []
    for (let f = 0; f < STOREYS; f++) {
      for (let b = 0; b < BAYS; b++) {
        const x = (b - (BAYS - 1) / 2) * BAY_W
        const y = f * FLOOR_H + FLOOR_H * 0.55
        const r = lit(b, f)
        out.push({ x, y, on: r > 0.42, warm: r > 0.7, r, key: `${b}-${f}` })
      }
    }
    return out
  }, [])

  const FACE = BLOCK_D / 2

  return (
    <group>
      {cells.map((c, i) => (
        <group key={c.key}>
          {/* Glass sits 6 mm PROUD of the facade, not recessed into it.

             The obvious move — push the pane back so it looks like a hole —
             does not work here: the block is a solid box, so a pane inside it
             is simply occluded by the box's own front face, and every window
             on the facade goes black. Cutting real openings means CSG on 42
             cells, which is not worth it. Instead the pane sits just proud
             (6 mm, enough to avoid z-fighting) and the recess is *implied* by
             a hood above it that physically protrudes and casts a real shadow
             down the glass. Same read, no geometry surgery. */}
          <mesh position={[c.x - 0.55, c.y, FACE + 0.006]}>
            <planeGeometry args={[1.7, 1.5]} />
            <meshStandardMaterial
              ref={register(`w${i}`)}
              color={c.on ? (c.warm ? '#6B5233' : '#33445A') : '#0C1013'}
              emissive={c.on ? (c.warm ? '#C97F35' : '#3C5876') : '#000000'}
              emissiveIntensity={c.on ? (c.warm ? 0.95 : 0.6) : 0}
              roughness={0.35}
              metalness={0.1}
              transparent
              opacity={1}
            />
          </mesh>
          {/* Hood — protrudes 180 mm and shadows the top of the pane. This is
              the thing doing the work; without it the glass is a decal. */}
          <mesh position={[c.x - 0.55, c.y + 0.8, FACE + 0.09]} castShadow>
            <boxGeometry args={[1.84, 0.1, 0.18]} />
            <meshStandardMaterial ref={register(`rv${i}`)} color="#2A313A" roughness={0.93} transparent opacity={1} />
          </mesh>
          {/* Mullion — one vertical bar reads as a window far better than none */}
          <mesh position={[c.x - 0.55, c.y, FACE + 0.02]}>
            <boxGeometry args={[0.05, 1.5, 0.03]} />
            <meshStandardMaterial ref={register(`ml${i}`)} color="#141820" roughness={0.9} transparent opacity={1} />
          </mesh>

          {/* Service yard / bathroom window — the small one, and the room the
              camera is heading for. */}
          <mesh position={[c.x + 1.15, c.y - 0.12, FACE + 0.006]}>
            <planeGeometry args={[0.7, 1.1]} />
            <meshStandardMaterial
              ref={register(`s${i}`)}
              color="#0A0D10"
              emissive={'#000000'}
              emissiveIntensity={0}
              roughness={0.6}
              transparent
              opacity={1}
            />
          </mesh>

          {/* Bamboo laundry poles off the service yard. Nothing else in the
              world looks like this — it is the single detail that makes the
              silhouette read as Singapore rather than as generic housing. */}
          {c.r > 0.55 && (
            <group>
              {[0, 1, 2].map((k) => (
                <mesh
                  key={k}
                  position={[c.x + 1.15, c.y - 0.55 + k * 0.16, FACE + 0.75]}
                  rotation={[0, 0, Math.PI / 2]}
                >
                  <cylinderGeometry args={[0.022, 0.022, 1.9, 6]} />
                  <meshStandardMaterial
                    ref={register(`p${i}${k}`)}
                    color={k === 1 ? '#98A2AE' : '#77828F'}
                    roughness={0.85}
                    transparent
                    opacity={1}
                  />
                </mesh>
              ))}
            </group>
          )}

          {/* Balcony parapet on the main opening */}
          <mesh position={[c.x - 0.55, c.y - 0.62, FACE + 0.28]}>
            <boxGeometry args={[1.86, 0.5, 0.09]} />
            <meshStandardMaterial ref={register(`bp${i}`)} color="#454E58" roughness={0.88} transparent opacity={1} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

const NS = new THREE.Vector2(0.9, 0.9)

export default function Apartment({ fade }) {
  // Generated once, shared by every concrete surface on the block.
  const cc = useMemo(() => concreteMaps(256), [])
  const mats = useRef({})
  const register = (k) => (m) => { if (m) mats.current[k] = m }

  useFrame(() => {
    const o = fade.current
    for (const k in mats.current) {
      const m = mats.current[k]
      m.opacity = o
      m.visible = o > 0.004   // stop paying for depth sorting once invisible
    }
  })

  const slabs = useMemo(
    () => Array.from({ length: STOREYS + 1 }, (_, i) => i * FLOOR_H),
    []
  )

  return (
    <group>
      {/* Main slab block */}
      <mesh position={[0, BLOCK_H / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[BLOCK_W, BLOCK_H, BLOCK_D]} />
        <meshStandardMaterial
          ref={register('body')}
          color="#3A424B"
          {...cc}
          normalScale={NS}
          roughness={0.94}
          transparent
          opacity={1}
        />
      </mesh>

      {/* Floor slabs expressed on the facade — the horizontal banding is most
          of what makes a block read as HDB rather than as a generic tower. */}
      {slabs.map((y, i) => (
        <mesh key={i} position={[0, y, 0]} castShadow receiveShadow>
          <boxGeometry args={[BLOCK_W + 0.7, 0.22, BLOCK_D + 0.7]} />
          <meshStandardMaterial
            ref={register(`slab${i}`)}
            color="#4B545E"
            {...cc}
            normalScale={NS}
            roughness={0.88}
            transparent
            opacity={1}
          />
        </mesh>
      ))}

      {/* Lift core / staircase tower, offset to one end */}
      <mesh position={[BLOCK_W / 2 + 1.6, BLOCK_H / 2 + 1.2, 0]}>
        <boxGeometry args={[3.2, BLOCK_H + 2.4, 5.4]} />
        <meshStandardMaterial
          ref={register('core')}
          color="#2E353D"
          {...cc}
          normalScale={NS}
          roughness={0.95}
          transparent
          opacity={1}
        />
      </mesh>

      {/* Void deck — the open ground floor. Columns, no walls. */}
      {Array.from({ length: BAYS + 1 }, (_, i) => (
        <mesh
          key={`col${i}`}
          position={[(i - BAYS / 2) * BAY_W, FLOOR_H / 2, BLOCK_D / 2 - 0.5]}
        >
          <boxGeometry args={[0.45, FLOOR_H, 0.45]} />
          <meshStandardMaterial
            ref={register(`col${i}`)}
            color="#3E464F"
            {...cc}
            roughness={0.9}
            transparent
            opacity={1}
          />
        </mesh>
      ))}

      <Windows register={register} />

      {/* Ground */}
      <mesh position={[0, -0.03, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[220, 220]} />
        <meshStandardMaterial
          ref={register('ground')}
          color="#111417"
          roughness={1}
          transparent
          opacity={1}
        />
      </mesh>
    </group>
  )
}

/* The room the camera ends up in — three low walls framing the tile floor.
   These stay put; they are the backdrop for keyframes 2 and 3. */
export function Room() {
  const h = WALL_H * 0.42
  const t = 0.04
  return (
    <group>
      <mesh position={[0, h / 2, -ROOM_D / 2 - t / 2]} receiveShadow>
        <boxGeometry args={[ROOM_W + t * 2, h, t]} />
        <meshStandardMaterial color="#1A1E23" roughness={0.8} />
      </mesh>
      <mesh position={[-ROOM_W / 2 - t / 2, h / 2, 0]} receiveShadow>
        <boxGeometry args={[t, h, ROOM_D]} />
        <meshStandardMaterial color="#1A1E23" roughness={0.8} />
      </mesh>
      <mesh position={[ROOM_W / 2 + t / 2, h / 2, 0]} receiveShadow>
        <boxGeometry args={[t, h, ROOM_D]} />
        <meshStandardMaterial color="#1A1E23" roughness={0.8} />
      </mesh>
    </group>
  )
}
