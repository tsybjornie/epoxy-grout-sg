import * as THREE from 'three'

/* ─────────────────────────────────────────────────────────────────────────
   THE CAMERA PATH

   Everything in this scene is METRIC: 1 world unit = 1 metre. That is not
   fussiness, it is the only way the last keyframe works. The shot list spans
   a house at 17 m and a grout joint at 3 mm — a range of about 5,700:1 — so
   the moment you use "whatever units look right" for the house, the joint
   ends up either invisible or the size of a car.

   ── Note on the supplied keyframes ──
   The brief specified the macro at (0.1, 0.05, 0.2). At true scale that puts
   the lens 224 mm from the joint. With a 38° vertical FOV the frame is then
   2 · 0.224 · tan(19°) = 154 mm tall, so a 3 mm joint occupies under 2% of
   the picture — a hairline, not a macro. To actually fill the frame the lens
   has to come in to roughly 24 mm, which is what K3 below does:

       frame height = 2 · d · tan(fov/2)
       d = 22 mm  →  15.3 mm tall, 25.6 mm wide  →  3 mm joint ≈ 12% of width

   That is the difference between "you can see a line" and "you are looking
   at the channel". The rest of the supplied path is used as given.
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

export const KEYFRAMES = [
  {
    at: 0.0,
    // Whole block in frame. It is 21.6 m wide and 21 m tall, so d = 38 m puts
    // it across about half the frame width with the roofline clear of the top
    // edge — the silhouette has to be readable as an HDB block before anything
    // else registers.
    pos: new THREE.Vector3(0, 15, 42),
    look: new THREE.Vector3(0, 9.5, 0),
    label: 'exterior'
  },
  {
    at: 0.33,
    // Through the facade, standing height, floor already dominating frame.
    pos: new THREE.Vector3(0, 1.55, 3.6),
    look: new THREE.Vector3(0, 0.75, -0.8),
    label: 'interior'
  },
  {
    at: 0.66,
    // Pitched down onto the tile grid. d = 3.89 m puts the 3.62 m floor across
    // ~80% of frame width. The first pass had this at d = 1.4 m, which framed
    // about two tiles — the "slab overview" showed no slab.
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
   "ticks" every 33% of the scroll even though the positions are correct. */
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
