import { useMemo } from 'react'
import * as THREE from 'three'
import {
  LIVING_X, KITCHEN_X, BATH_X,
  ROOM_W, ROOM_D, WALL_H,
  BTILE, JOINT, BPITCH, MACRO_Z,
  BLOCK_X, BLOCK_Z
} from './keyframes.js'
import Apartment from './Apartment.jsx'
import { makeGroutMaterial } from './materials.js'
import { burlWood, creamMarble, soapstone, terracottaTile, plaster } from './textures.js'

/* Three open-fronted room sets, side by side like museum dioramas. The
   camera never crosses a wall — it tracks past the open fronts, steps into
   each set, then dives into the bathroom floor. */

const BRONZE = '#6E5637'
const BRONZE_DARK = '#4A3A26'

/* ── Shared shell: back + side walls in warm plaster, bronze skirting ───── */
function Shell({ x }) {
  const plasterTex = plaster()
  return (
    <group position={[x, 0, 0]}>
      <mesh position={[0, WALL_H / 2, -ROOM_D / 2]} receiveShadow>
        <boxGeometry args={[ROOM_W, WALL_H, 0.08]} />
        <meshStandardMaterial map={plasterTex} color="#CDBFA8" roughness={0.92} />
      </mesh>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * ROOM_W / 2, WALL_H / 2, 0]} receiveShadow>
          <boxGeometry args={[0.08, WALL_H, ROOM_D]} />
          <meshStandardMaterial map={plasterTex} color="#C4B59E" roughness={0.92} />
        </mesh>
      ))}
      {/* Bronze skirting along the back wall */}
      <mesh position={[0, 0.05, -ROOM_D / 2 + 0.045]}>
        <boxGeometry args={[ROOM_W, 0.1, 0.012]} />
        <meshStandardMaterial color={BRONZE_DARK} roughness={0.4} metalness={0.8} />
      </mesh>
      {/* Ceiling shadow catcher */}
      <mesh position={[0, WALL_H, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[ROOM_W, ROOM_D]} />
        <meshStandardMaterial color="#B9AC96" roughness={1} />
      </mesh>
    </group>
  )
}

/* ── Zellige: hand-cut glazed tiles, laid vertically ─────────────────────
   The read is per-tile irregularity: each instance gets a small tint, tilt
   and depth jitter, and a very low roughness so the speculars break across
   the wall the way real glaze does. One InstancedMesh per wall. */
function Zellige({ width, height, position, rotation = [0, 0, 0], seed = 1 }) {
  const TW = 0.068, TH = 0.21, GAP = 0.004
  const { mesh, groutMat } = useMemo(() => {
    const cols = Math.floor(width / (TW + GAP))
    const rows = Math.floor(height / (TH + GAP))
    const geo = new THREE.BoxGeometry(TW, TH, 0.008)
    const mat = new THREE.MeshStandardMaterial({
      color: '#FFFFFF', roughness: 0.12, metalness: 0.02, envMapIntensity: 1.2
    })
    const inst = new THREE.InstancedMesh(geo, mat, cols * rows)
    const dummy = new THREE.Object3D()
    const color = new THREE.Color()

    let a = seed * 1000 + 7
    const rnd = () => {
      a |= 0; a = (a + 0x6d2b79f5) | 0
      let t = Math.imul(a ^ (a >>> 15), 1 | a)
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }

    let i = 0
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        dummy.position.set(
          (c - (cols - 1) / 2) * (TW + GAP),
          (r + 0.5) * (TH + GAP) - height / 2 + (height - rows * (TH + GAP)) / 2,
          (rnd() - 0.5) * 0.0035          // depth jitter — the zellige tell
        )
        dummy.rotation.set((rnd() - 0.5) * 0.05, (rnd() - 0.5) * 0.05, (rnd() - 0.5) * 0.03)
        dummy.updateMatrix()
        inst.setMatrixAt(i, dummy.matrix)
        // warm off-whites, occasionally a shade deeper — glaze pooling
        const warm = 0.94 + rnd() * 0.06
        color.setRGB(warm, warm - 0.015 - rnd() * 0.02, warm - 0.045 - rnd() * 0.03)
        inst.setColorAt(i, color)
        i++
      }
    }
    inst.instanceMatrix.needsUpdate = true
    if (inst.instanceColor) inst.instanceColor.needsUpdate = true
    inst.castShadow = true
    return { mesh: inst, groutMat: makeGroutMaterial('live') }
  }, [width, height, seed])

  return (
    <group position={position} rotation={rotation}>
      {/* Grout bed behind the tiles — the joints ARE the swatch colour. */}
      <mesh position={[0, 0, -0.006]}>
        <planeGeometry args={[width, height]} />
        <primitive object={groutMat} attach="material" />
      </mesh>
      <primitive object={mesh} />
    </group>
  )
}

/* ── Bronze swing-arm wall lamp with a real (cheap) light ───────────────── */
function SwingArmLamp({ position, rotationY = 0 }) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <mesh position={[0, 0, 0.01]}>
        <cylinderGeometry args={[0.045, 0.045, 0.02, 16]} />
        <meshStandardMaterial color={BRONZE} roughness={0.35} metalness={0.85} />
      </mesh>
      <mesh position={[0, 0.09, 0.14]} rotation={[Math.PI / 3.2, 0, 0]}>
        <cylinderGeometry args={[0.011, 0.011, 0.34, 10]} />
        <meshStandardMaterial color={BRONZE} roughness={0.35} metalness={0.85} />
      </mesh>
      <mesh position={[0, 0.13, 0.34]} rotation={[Math.PI / 1.9, 0, 0]}>
        <cylinderGeometry args={[0.009, 0.009, 0.26, 10]} />
        <meshStandardMaterial color={BRONZE} roughness={0.35} metalness={0.85} />
      </mesh>
      {/* Shade + visible warm bulb */}
      <mesh position={[0, 0.1, 0.46]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.085, 0.12, 24, 1, true]} />
        <meshStandardMaterial color={BRONZE_DARK} roughness={0.45} metalness={0.7} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.045, 0.46]}>
        <sphereGeometry args={[0.028, 12, 12]} />
        <meshStandardMaterial color="#FFE3B0" emissive="#FFB94E" emissiveIntensity={1.4} />
      </mesh>
      <pointLight position={[0, 0.02, 0.46]} intensity={0.22} distance={2.2} decay={1.8} color="#FFD9A0" />
    </group>
  )
}

/* ── Checkered runner: terracotta / cream 150 mm checkerboard ──────────── */
function CheckerRunner({ position, cols = 26, rows = 4 }) {
  const T = 0.15
  const terra = terracottaTile()
  const { mesh } = useMemo(() => {
    const geo = new THREE.BoxGeometry(T - 0.002, 0.004, T - 0.002)
    const matC = new THREE.MeshStandardMaterial({ color: '#EFE6D4', roughness: 0.35 })
    const matT = new THREE.MeshStandardMaterial({ map: terra, color: '#C77B52', roughness: 0.5 })
    const group = new THREE.Group()
    const instC = new THREE.InstancedMesh(geo, matC, Math.ceil(cols * rows / 2))
    const instT = new THREE.InstancedMesh(geo, matT, Math.ceil(cols * rows / 2))
    const dummy = new THREE.Object3D()
    let ci = 0, ti = 0
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        dummy.position.set((c - (cols - 1) / 2) * T, 0, (r - (rows - 1) / 2) * T)
        dummy.updateMatrix()
        if ((r + c) % 2) instT.setMatrixAt(ti++, dummy.matrix)
        else instC.setMatrixAt(ci++, dummy.matrix)
      }
    }
    instC.count = ci; instT.count = ti
    instC.instanceMatrix.needsUpdate = instT.instanceMatrix.needsUpdate = true
    instC.receiveShadow = instT.receiveShadow = true
    group.add(instC, instT)
    return { mesh: group }
  }, [cols, rows, terra])
  return <primitive object={mesh} position={position} />
}

/* ── Tiled floor over a live grout bed ──────────────────────────────────
   Built the way a real floor is: a continuous grout bed with tiles sitting
   proud of it and a joint's width of air between them. The joints are not
   painted lines — they are gaps, so the macro has real geometry to find. */
function TiledFloor({ x, tile, joint, map, tint, roughness = 0.32, proud = 0.005, split = null }) {
  const pitch = tile + joint
  // Even counts only: an even grid puts a JOINT on each axis origin rather
  // than a tile centre, so the macro has something to look at when it
  // arrives at x = 0. An odd count parks the ×150 camera on blank tile.
  const cols = Math.floor(ROOM_W / pitch) & ~1
  const rows = Math.floor(ROOM_D / pitch) & ~1
  const tiles = useMemo(() => {
    const out = []
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        out.push([(c - (cols - 1) / 2) * pitch, (r - (rows - 1) / 2) * pitch])
      }
    }
    return out
  }, [cols, rows, pitch])

  const bedLive = useMemo(() => makeGroutMaterial('live'), [])
  const bedCement = useMemo(() => makeGroutMaterial('cement'), [])

  return (
    <group position={[x, 0, 0]}>
      {split ? (
        /* Split along Z at the macro joint: the near end of the channel is
           the cement you have, the far end is the epoxy we lay. One joint,
           one variable, both states in frame. */
        <>
          <mesh position={[0, -0.0005, (-ROOM_D / 2 + split) / 2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[ROOM_W, split + ROOM_D / 2]} />
            <primitive object={bedCement} attach="material" />
          </mesh>
          <mesh position={[0, -0.0005, (ROOM_D / 2 + split) / 2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[ROOM_W, ROOM_D / 2 - split]} />
            <primitive object={bedLive} attach="material" />
          </mesh>
        </>
      ) : (
        <mesh position={[0, -0.0005, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[ROOM_W, ROOM_D]} />
          <primitive object={bedLive} attach="material" />
        </mesh>
      )}
      {tiles.map(([tx, tz], i) => (
        <mesh key={i} position={[tx, proud / 2, tz]} castShadow receiveShadow>
          <boxGeometry args={[tile, proud, tile]} />
          <meshStandardMaterial map={map} color={tint} roughness={roughness} metalness={0.04} />
        </mesh>
      ))}
    </group>
  )
}

/* ── Layer 1: the living hall ───────────────────────────────────────────── */
function LivingHall() {
  const burl = burlWood()
  const marble = creamMarble()
  return (
    <group>
      <Shell x={LIVING_X} />
      <TiledFloor x={LIVING_X} tile={0.6} joint={0.0015} map={marble} tint="#F1EAE0" roughness={0.24} />
      <CheckerRunner position={[LIVING_X, 0.007, 0.95]} />
      <group position={[LIVING_X, 0, 0]}>
        {/* Linen sofa — low mass against the back wall */}
        <mesh position={[-0.7, 0.36, -1.05]} castShadow>
          <boxGeometry args={[1.9, 0.34, 0.85]} />
          <meshStandardMaterial color="#DDD2BC" roughness={0.9} />
        </mesh>
        <mesh position={[-0.7, 0.68, -1.32]} castShadow>
          <boxGeometry args={[1.9, 0.44, 0.28]} />
          <meshStandardMaterial color="#D6CAB2" roughness={0.9} />
        </mesh>
        {/* Burl sideboard */}
        <mesh position={[1.35, 0.35, -1.15]} castShadow>
          <boxGeometry args={[1.1, 0.62, 0.42]} />
          <meshStandardMaterial map={burl} color="#C89B6E" roughness={0.32} />
        </mesh>
        {/* Soapstone coffee slab — a floor-sitting plinth, not a legged table */}
        <mesh position={[-0.65, 0.075, 0.1]} castShadow>
          <boxGeometry args={[0.95, 0.15, 0.5]} />
          <meshStandardMaterial map={soapstone()} color="#333A42" roughness={0.35} />
        </mesh>
        <SwingArmLamp position={[1.35, 1.45, -ROOM_D / 2 + 0.05]} />
      </group>
    </group>
  )
}

/* ── Layer 2: the kitchen ───────────────────────────────────────────────── */
function Kitchen() {
  const burl = burlWood()
  const soap = soapstone()
  const backZ = -ROOM_D / 2
  return (
    <group>
      <Shell x={KITCHEN_X} />
      <TiledFloor x={KITCHEN_X} tile={0.6} joint={0.0015} map={creamMarble()} tint="#E9E1D3" roughness={0.3} />
      <CheckerRunner position={[KITCHEN_X, 0.007, 0.55]} cols={24} rows={4} />
      <group position={[KITCHEN_X, 0, 0]}>
        {/* Burl lower cabinets, full run */}
        <mesh position={[0, 0.45, backZ + 0.34]} castShadow>
          <boxGeometry args={[3.9, 0.9, 0.6]} />
          <meshStandardMaterial map={burl} color="#C89B6E" roughness={0.3} />
        </mesh>
        {/* Door gaps + bronze pulls */}
        {[-1.46, -0.73, 0, 0.73, 1.46].map((dx) => (
          <mesh key={dx} position={[dx, 0.55, backZ + 0.645]}>
            <boxGeometry args={[0.012, 0.16, 0.012]} />
            <meshStandardMaterial color={BRONZE} roughness={0.3} metalness={0.85} />
          </mesh>
        ))}
        {/* Soapstone countertop */}
        <mesh position={[0, 0.94, backZ + 0.36]} castShadow>
          <boxGeometry args={[3.98, 0.04, 0.68]} />
          <meshStandardMaterial map={soap} color="#31383F" roughness={0.28} metalness={0.05} />
        </mesh>
        {/* Black under-mount sink */}
        <mesh position={[0.55, 0.905, backZ + 0.36]}>
          <boxGeometry args={[0.56, 0.03, 0.42]} />
          <meshStandardMaterial color="#0B0D0F" roughness={0.35} />
        </mesh>
        {/* Bronze faucet */}
        <mesh position={[0.55, 1.06, backZ + 0.16]}>
          <cylinderGeometry args={[0.013, 0.013, 0.24, 10]} />
          <meshStandardMaterial color={BRONZE} roughness={0.3} metalness={0.9} />
        </mesh>
        <mesh position={[0.55, 1.18, backZ + 0.25]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.011, 0.011, 0.2, 10]} />
          <meshStandardMaterial color={BRONZE} roughness={0.3} metalness={0.9} />
        </mesh>
        {/* Vertical zellige backsplash, counter to 2.2 m */}
        <Zellige
          width={3.9} height={1.24}
          position={[0, 1.58, backZ + 0.052]}
          seed={3}
        />
        <SwingArmLamp position={[-1.2, 1.9, backZ + 0.05]} />
        <SwingArmLamp position={[1.2, 1.9, backZ + 0.05]} />
      </group>
    </group>
  )
}

/* ── Layer 3 + 4: the bathroom, and the joint the site is about ─────────── */
function Bathroom() {
  const burl = burlWood()
  const soap = soapstone()
  const backZ = -ROOM_D / 2
  return (
    <group>
      <Shell x={BATH_X} />
      {/* Terracotta floor, 300 mm tiles, 1.5 mm joints — bed split at the
          macro line so the target joint runs cement → epoxy. */}
      <TiledFloor
        x={BATH_X}
        tile={BTILE} joint={JOINT}
        map={terracottaTile()} tint="#C0714B"
        roughness={0.5} split={MACRO_Z}
      />
      <group position={[BATH_X, 0, 0]}>
        {/* Zellige on the full back wall */}
        <Zellige width={4.04} height={WALL_H - 0.1} position={[0, WALL_H / 2, backZ + 0.052]} seed={9} />
        {/* Bronze trim strips framing the wall */}
        {[-2.02, 2.02].map((dx) => (
          <mesh key={dx} position={[dx, WALL_H / 2, backZ + 0.055]}>
            <boxGeometry args={[0.025, WALL_H - 0.1, 0.014]} />
            <meshStandardMaterial color={BRONZE_DARK} roughness={0.35} metalness={0.85} />
          </mesh>
        ))}
        {/* Vanity: burl base, soapstone top, round basin */}
        <mesh position={[-0.9, 0.42, backZ + 0.32]} castShadow>
          <boxGeometry args={[1.3, 0.68, 0.52]} />
          <meshStandardMaterial map={burl} color="#C89B6E" roughness={0.3} />
        </mesh>
        <mesh position={[-0.9, 0.78, backZ + 0.33]} castShadow>
          <boxGeometry args={[1.38, 0.035, 0.58]} />
          <meshStandardMaterial map={soap} color="#31383F" roughness={0.28} />
        </mesh>
        <mesh position={[-0.9, 0.83, backZ + 0.33]}>
          <cylinderGeometry args={[0.19, 0.16, 0.09, 28]} />
          <meshStandardMaterial color="#EDE5D6" roughness={0.25} />
        </mesh>
        <mesh position={[-0.9, 1.02, backZ + 0.14]}>
          <cylinderGeometry args={[0.011, 0.011, 0.3, 10]} />
          <meshStandardMaterial color={BRONZE} roughness={0.3} metalness={0.9} />
        </mesh>
        {/* Backlit circular mirror — emissive halo ring behind a glass disc */}
        <group position={[-0.9, 1.7, backZ + 0.07]}>
          <mesh position={[0, 0, -0.008]}>
            <torusGeometry args={[0.42, 0.028, 12, 48]} />
            <meshStandardMaterial color="#FFE9C4" emissive="#FFD489" emissiveIntensity={2.2} />
          </mesh>
          <mesh>
            <circleGeometry args={[0.4, 48]} />
            <meshStandardMaterial color="#39434F" roughness={0.06} metalness={0.9} envMapIntensity={1.6} />
          </mesh>
          <mesh position={[0, 0, 0.004]}>
            <torusGeometry args={[0.4, 0.006, 8, 48]} />
            <meshStandardMaterial color={BRONZE} roughness={0.3} metalness={0.9} />
          </mesh>
          <pointLight position={[0, 0, 0.15]} intensity={0.7} distance={2.6} decay={1.8} color="#FFDFA8" />
        </group>
        {/* Towel rail */}
        <mesh position={[1.35, 1.15, backZ + 0.09]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.012, 0.012, 0.7, 10]} />
          <meshStandardMaterial color={BRONZE} roughness={0.3} metalness={0.9} />
        </mesh>
        <mesh position={[1.35, 0.92, backZ + 0.12]} castShadow>
          <boxGeometry args={[0.5, 0.42, 0.02]} />
          <meshStandardMaterial color="#E6DCC8" roughness={0.95} />
        </mesh>
      </group>
    </group>
  )
}

const BLOCK_FADE = { current: 1 }

/* ── The gallery: dark plinth floor tying the three sets together ───────── */
export default function Rooms() {
  return (
    <group>
      {/* The block itself — the opening shot, and afterwards a silhouette
          hanging in the fog behind the dioramas. */}
      <group position={[BLOCK_X, 0, BLOCK_Z]}>
        <Apartment fade={BLOCK_FADE} />
      </group>
      <mesh position={[0, -0.012, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[60, 30]} />
        <meshStandardMaterial color="#0A0E16" roughness={0.85} metalness={0.1} />
      </mesh>
      <LivingHall />
      <Kitchen />
      <Bathroom />
    </group>
  )
}
