import { useMemo } from 'react'
import { TILE, JOINT, PITCH, COLS, ROWS, ROOM_W, ROOM_D } from './keyframes.js'

const CEMENT = '#4B4740'   // stained, matte, dead
const EPOXY = '#E8E4DC'    // dense, faintly wet
const PORCELAIN = '#3A4047'

/* The floor is built the way a real floor is: a continuous grout bed, with
   tiles sitting on top of it and 3 mm of air between them. The joints are not
   painted lines — they are the gaps, so the macro shot has real geometry and
   a real shadow to find. */

export default function TileFloor() {
  const tiles = useMemo(() => {
    const out = []
    for (let c = 0; c < COLS; c++) {
      for (let r = 0; r < ROWS; r++) {
        out.push([
          (c - (COLS - 1) / 2) * PITCH,
          0,
          (r - (ROWS - 1) / 2) * PITCH
        ])
      }
    }
    return out
  }, [])

  return (
    <group>
      {/* Grout bed, split along Z at z = 0 — deliberately ACROSS the joints
          rather than along one. The macro flies down the joint at x = 0, so a
          Z-split means that single 3 mm channel is cement at the near end and
          epoxy at the far end: one joint, one variable, both states in frame.
          Splitting on X instead put the seam inside the joint's own width,
          which just looks like a rendering fault. */}
      <mesh position={[0, -0.0005, -ROOM_D / 4]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[ROOM_W, ROOM_D / 2]} />
        <meshStandardMaterial color={CEMENT} roughness={0.98} metalness={0} />
      </mesh>
      <mesh position={[0, -0.0005, ROOM_D / 4]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[ROOM_W, ROOM_D / 2]} />
        <meshStandardMaterial color={EPOXY} roughness={0.42} metalness={0.02} />
      </mesh>

      {tiles.map((p, i) => (
        <mesh key={i} position={[p[0], 0.005, p[2]]} castShadow receiveShadow>
          {/* 10 mm tile, sitting 5 mm proud of the bed — that 5 mm is what
              throws the shadow line down the joint in the macro shot. */}
          <boxGeometry args={[TILE, 0.01, TILE]} />
          <meshStandardMaterial color={PORCELAIN} roughness={0.3} metalness={0.08} />
        </mesh>
      ))}
    </group>
  )
}

export { JOINT }
