import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { ROOM_W, ROOM_D, WALL_H, ramp } from './keyframes.js'

const HOUSE_W = 9.4
const HOUSE_D = 7.2
const EAVE = 3.0
const RIDGE = 4.6

/* The house exists to be flown into and then got rid of.

   Rather than lowering the near plane and letting the camera clip through
   solid walls — which reads as a glitch, because it is one — the shell fades
   out between 18% and 34% of the scroll. By the time the camera is inside,
   there is nothing left to punch through. */

function Shell({ fade }) {
  const mats = useRef([])

  useFrame(() => {
    const o = fade.current
    for (const m of mats.current) {
      if (!m) continue
      m.opacity = o
      m.visible = o > 0.004   // stop paying for depth sorting once invisible
    }
  })

  const reg = (i) => (m) => (mats.current[i] = m)
  const wall = (key, args, pos, i) => (
    <mesh key={key} position={pos}>
      <boxGeometry args={args} />
      <meshStandardMaterial
        ref={reg(i)}
        color="#20242A"
        roughness={0.85}
        transparent
        opacity={1}
      />
    </mesh>
  )

  return (
    <group>
      {/* Four walls, with the front left open as the way in. */}
      {wall('back', [HOUSE_W, EAVE, 0.2], [0, EAVE / 2, -HOUSE_D / 2], 0)}
      {wall('left', [0.2, EAVE, HOUSE_D], [-HOUSE_W / 2, EAVE / 2, 0], 1)}
      {wall('right', [0.2, EAVE, HOUSE_D], [HOUSE_W / 2, EAVE / 2, 0], 2)}
      {wall('frontL', [HOUSE_W / 2 - 0.9, EAVE, 0.2], [-(HOUSE_W / 4 + 0.45), EAVE / 2, HOUSE_D / 2], 3)}
      {wall('frontR', [HOUSE_W / 2 - 0.9, EAVE, 0.2], [HOUSE_W / 4 + 0.45, EAVE / 2, HOUSE_D / 2], 4)}
      {wall('lintel', [1.8, EAVE - 2.3, 0.2], [0, EAVE - (EAVE - 2.3) / 2, HOUSE_D / 2], 5)}

      {/* Gable roof — a 4-sided cone is a hip roof with no extra geometry. */}
      <mesh position={[0, EAVE + (RIDGE - EAVE) / 2, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[HOUSE_W * 0.79, RIDGE - EAVE, 4]} />
        <meshStandardMaterial
          ref={reg(6)}
          color="#171B20"
          roughness={0.9}
          transparent
          opacity={1}
        />
      </mesh>

      {/* Ground plane, so the exterior shot has something to sit on. */}
      <mesh position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[70, 70]} />
        <meshStandardMaterial ref={reg(7)} color="#0C0E10" roughness={1} transparent opacity={1} />
      </mesh>
    </group>
  )
}

/* The room the camera actually ends up in — three low walls framing the tile
   floor. These stay put; they are the backdrop for keyframes 2 and 3. */
function Room() {
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

export default function Architecture({ fade }) {
  return (
    <>
      <Shell fade={fade} />
      <Room />
    </>
  )
}

export { ramp }
