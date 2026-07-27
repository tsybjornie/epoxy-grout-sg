import * as THREE from 'three'

/* ─────────────────────────────────────────────────────────────────────────
   THE CAMERA PATH — interior only.

   The exterior is now a photograph, so the building geometry is gone and the
   path starts inside the room. Three keyframes instead of four.

   Everything is METRIC: 1 world unit = 1 metre. The path still spans a 3.6 m
   room down to a 3 mm joint — about 1,200:1 — so the units have to mean
   something or the last shot is unframeable.

       frame height = 2 · d · tan(fov/2),  fov 38° → h = 0.689 · d
   ───────────────────────────────────────────────────────────────────────── */

export const TILE = 0.6      // 600 mm tile
export const JOINT = 0.003   // 3 mm joint — the actual subject of the site
export const PITCH = TILE + JOINT

// Even tile counts put a JOINT on each axis origin rather than a tile centre,
// so the macro has something to look at when it arrives at (0, 0, 0).
export const COLS = 6
export const ROWS = 4

export const ROOM_W = COLS * PITCH   // 3.618 m
export const ROOM_D = ROWS * PITCH   // 2.412 m
export const WALL_H = 2.6

/* The photograph owns scroll 0 → PHOTO_OUT. The camera path is parameterised
   over what is left, so the 3D is never moving behind an opaque image. */
export const PHOTO_HOLD = 0.30   // full-opacity photo up to here
export const PHOTO_OUT = 0.50    // fully crossfaded to WebGL by here

export const KEYFRAMES = [
  {
    at: 0.0,
    // Standing in the room, floor already dominating frame. d = 4.5 m puts the
    // 3.62 m room across ~70% of frame width.
    pos: new THREE.Vector3(0, 1.55, 3.6),
    look: new THREE.Vector3(0, 0.75, -0.8),
    label: 'interior'
  },
  {
    at: 0.5,
    // Pitched down onto the tile grid. d = 3.89 m frames the whole floor.
    pos: new THREE.Vector3(0, 2.6, 2.9),
    look: new THREE.Vector3(0, 0, 0),
    label: 'slab'
  },
  {
    at: 1.0,
    // 22 mm out, looking DOWN the joint at x = 0 rather than across it, so the
    // channel recedes through the cement/epoxy transition at z = 0. Frame is
    // 25.6 mm wide, so the 3 mm joint is ~12% of it.
    pos: new THREE.Vector3(0, 0.014, -0.018),
    look: new THREE.Vector3(0, 0.001, 0),
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
