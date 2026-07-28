import * as THREE from 'three'

/* ─────────────────────────────────────────────────────────────────────────
   THE CAMERA PATH — a gallery fly-through of three rooms, ending 20 mm
   above a 1.5 mm joint.

   Three open-fronted room sets sit side by side along X like museum
   dioramas: living hall, kitchen, bathroom. The camera tracks laterally
   past them, steps into each, then dives into the bathroom floor.

   Everything is METRIC: 1 world unit = 1 metre. The path spans a 21 m
   gallery down to a 1.5 mm joint — about 14,000:1 — so units have to mean
   something or the last shot is unframeable.

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

/* The macro target: a point ON the joint that runs along Z at x = BATH_X.
   MACRO_Z sits on the joint between two tile columns, clear of the walls. */
export const MACRO_Z = 0.45

/* The photograph owns scroll 0 → PHOTO_OUT. The camera path is parameterised
   over what is left, so the 3D is never moving behind an opaque image. */
export const PHOTO_HOLD = 0.10
export const PHOTO_OUT = 0.22

export const KEYFRAMES = [
  {
    at: 0.0,
    // Standing in the living hall. d ≈ 4.6 m frames the full set.
    pos: new THREE.Vector3(LIVING_X, 1.5, 4.6),
    look: new THREE.Vector3(LIVING_X, 0.8, -0.8),
    label: 'living'
  },
  {
    at: 0.22,
    // Pitched onto the marble floor and its checkered runner.
    pos: new THREE.Vector3(LIVING_X, 2.4, 2.7),
    look: new THREE.Vector3(LIVING_X, 0, 0.2),
    label: 'living-floor'
  },
  {
    at: 0.48,
    // Kitchen: framed on the zellige backsplash over the soapstone top.
    pos: new THREE.Vector3(KITCHEN_X, 1.35, 3.0),
    look: new THREE.Vector3(KITCHEN_X, 0.95, -1.5),
    label: 'kitchen'
  },
  {
    at: 0.72,
    // Bathroom: vanity mirror and zellige wall.
    pos: new THREE.Vector3(BATH_X, 1.45, 3.2),
    look: new THREE.Vector3(BATH_X, 1.1, -1.5),
    label: 'bath'
  },
  {
    at: 0.86,
    // Kneeling over the terracotta floor, lined up on the target joint.
    pos: new THREE.Vector3(BATH_X, 0.85, 1.5),
    look: new THREE.Vector3(BATH_X, 0, MACRO_Z),
    label: 'bath-floor'
  },
  {
    at: 1.0,
    // 20 mm out, looking DOWN the joint rather than across it, so the
    // channel recedes through the cement/epoxy transition at z = MACRO_Z.
    // Frame is ~14 mm wide; the 1.5 mm joint is ~11% of it.
    pos: new THREE.Vector3(BATH_X, 0.011, MACRO_Z - 0.017),
    look: new THREE.Vector3(BATH_X, 0.0008, MACRO_Z + 0.004),
    label: 'macro'
  }
]

/* Piecewise interpolation across the keyframe list.

   smoothstep inside each leg kills the velocity discontinuity you get at a
   keyframe boundary with raw linear blending — without it the camera visibly
   "ticks" at every keyframe even though the positions are correct. */
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

/* Page scroll → camera-path parameter. The photo owns the first stretch, so
   the camera only starts moving once the image is on its way out. */
export function cameraParam(t) {
  return THREE.MathUtils.clamp((t - PHOTO_HOLD) / (1 - PHOTO_HOLD), 0, 1)
}

/* Stage index for the copy overlay: 0 living, 1 kitchen, 2 bath, 3 macro. */
export function stageAt(u) {
  return u < 0.34 ? 0 : u < 0.6 ? 1 : u < 0.82 ? 2 : 3
}
