import * as THREE from 'three'

/* ─────────────────────────────────────────────────────────────────────────
   THE CAMERA PATH — the page opens ON the block.

   Shot order: an HDB slab block at dusk (the 3D exterior from
   Apartment.jsx, parked 40 m behind the gallery), push in toward one lit
   window, then swing down into three open-fronted room sets — living
   hall, kitchen, bathroom — and finally dive 20 mm above a 1.5 mm joint.

   Everything is METRIC: 1 world unit = 1 metre.

       frame height = 2 · d · tan(fov/2),  fov 38° → h = 0.689 · d
   ───────────────────────────────────────────────────────────────────────── */

export const LIVING_X = -7
export const KITCHEN_X = 0
export const BATH_X = 7

export const ROOM_W = 4.2
export const ROOM_D = 3.0
export const WALL_H = 2.6

/* Bathroom floor: 300 mm terracotta tiles, 1.5 mm joints. */
export const BTILE = 0.3
export const JOINT = 0.0015
export const BPITCH = BTILE + JOINT

/* The macro target: a point ON the joint that runs along Z at x = BATH_X. */
export const MACRO_Z = 0.45

/* The HDB block exterior. Centre of the block; its front facade is at
   BLOCK_Z + 5.5 (block depth 11 m). Aligned with the living hall on X so
   the exterior-to-interior swing is one straight pull-back. */
export const BLOCK_X = -7
export const BLOCK_Z = -40
const FACE_Z = BLOCK_Z + 5.5

/* One lit window on the facade to push toward (bay 3, storey 1 of the
   Apartment.jsx grid, offset from the block centre). */
const WIN_X = BLOCK_X + 1.8 - 0.55
const WIN_Y = 4.65

/* Legacy exports — the photo layer is gone, the camera owns scroll 0→1. */
export const PHOTO_HOLD = 0
export const PHOTO_OUT = 0

export const KEYFRAMES = [
  {
    at: 0.0,
    // Open ON the living hall — the whole room in frame. (The exterior
    // block prologue is retired until real footage replaces it.)
    pos: new THREE.Vector3(LIVING_X, 1.5, 4.6),
    look: new THREE.Vector3(LIVING_X, 0.8, -0.8),
    label: 'living'
  },
  {
    at: 0.19,
    // Pitched onto the marble floor and its checkered runner.
    pos: new THREE.Vector3(LIVING_X, 2.4, 2.7),
    look: new THREE.Vector3(LIVING_X, 0, 0.2),
    label: 'living-floor'
  },
  {
    at: 0.41,
    // Kitchen: framed on the zellige backsplash over the soapstone top.
    pos: new THREE.Vector3(KITCHEN_X, 1.35, 3.0),
    look: new THREE.Vector3(KITCHEN_X, 0.95, -1.5),
    label: 'kitchen'
  },
  {
    at: 0.66,
    // Bathroom: vanity mirror and zellige wall.
    pos: new THREE.Vector3(BATH_X, 1.45, 3.2),
    look: new THREE.Vector3(BATH_X, 1.1, -1.5),
    label: 'bath'
  },
  {
    at: 0.83,
    // Kneeling over the terracotta floor, lined up on the target joint.
    pos: new THREE.Vector3(BATH_X, 0.85, 1.5),
    look: new THREE.Vector3(BATH_X, 0, MACRO_Z),
    label: 'bath-floor'
  },
  {
    at: 1.0,
    // 20 mm out, looking DOWN the joint rather than across it, so the
    // channel recedes through the cement/epoxy transition at z = MACRO_Z.
    pos: new THREE.Vector3(BATH_X, 0.011, MACRO_Z - 0.017),
    look: new THREE.Vector3(BATH_X, 0.0008, MACRO_Z + 0.004),
    label: 'macro'
  }
]

/* The through-the-window blink is retired with the exterior prologue —
   kept as a no-op so callers don't care. */
export function windowFlash() {
  return 0
}

/* Piecewise interpolation across the keyframe list.

   smoothstep inside each leg kills the velocity discontinuity you get at a
   keyframe boundary with raw linear blending — without it the camera
   visibly "ticks" at every keyframe even though the positions are correct. */
const smoothstep = (t) => t * t * (3 - 2 * t)

const _a = new THREE.Vector3()
const _b = new THREE.Vector3()

export function samplePath(t, outPos, outLook) {
  const clamped = THREE.MathUtils.clamp(t, 0, 1)

  let i = 0
  while (i < KEYFRAMES.length - 2 && clamped > KEYFRAMES[i + 1].at) i++

  const k0 = KEYFRAMES[i]
  const k1 = KEYFRAMES[i + 1]
  const span = k1.at - k0.at
  const local = smoothstep(span === 0 ? 0 : (clamped - k0.at) / span)

  outPos.copy(_a.copy(k0.pos)).lerp(k1.pos, local)
  outLook.copy(_b.copy(k0.look)).lerp(k1.look, local)
  return clamped
}

/* Fade helper: 0 before `from`, 1 after `to`, smooth in between. */
export function ramp(t, from, to) {
  return smoothstep(THREE.MathUtils.clamp((t - from) / (to - from), 0, 1))
}

/* Page scroll → camera-path parameter. Identity now that the camera owns
   the full scroll — kept as a function so callers don't care. */
export function cameraParam(t) {
  return THREE.MathUtils.clamp(t, 0, 1)
}

/* Stage index for the copy overlay:
   0 living · 1 kitchen · 2 bath · 3 macro. */
export function stageAt(u) {
  return u < 0.32 ? 0 : u < 0.56 ? 1 : u < 0.79 ? 2 : 3
}
