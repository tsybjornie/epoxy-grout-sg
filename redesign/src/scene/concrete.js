import * as THREE from 'three'

/* Procedural concrete, generated into a canvas at runtime.

   Every texture CDN is blocked from this environment, and shipping real
   albedo/normal/roughness maps would add megabytes to a page that already
   carries 265 kB of renderer. Concrete is mostly broadband noise with a
   little large-scale blotching, which generates convincingly in a few
   milliseconds and costs nothing to download.

   The normal map matters more than the colour map here. Flat-shaded boxes
   read as CG instantly; a surface that breaks up the specular highlight is
   most of what separates "3D model" from "photograph of a wall". */

function noiseCanvas(size, fn) {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const ctx = c.getContext('2d')
  const img = ctx.createImageData(size, size)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4
      const [r, g, b] = fn(x, y)
      img.data[i] = r
      img.data[i + 1] = g
      img.data[i + 2] = b
      img.data[i + 3] = 255
    }
  }
  ctx.putImageData(img, 0, 0)
  return c
}

// Cheap value noise — smooth enough at these frequencies, and far faster
// than a real Perlin implementation for a one-off bake.
function hash(x, y) {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453
  return n - Math.floor(n)
}
function smoothNoise(x, y, scale) {
  const xs = x / scale
  const ys = y / scale
  const x0 = Math.floor(xs)
  const y0 = Math.floor(ys)
  const fx = xs - x0
  const fy = ys - y0
  const u = fx * fx * (3 - 2 * fx)
  const v = fy * fy * (3 - 2 * fy)
  const a = hash(x0, y0)
  const b = hash(x0 + 1, y0)
  const c = hash(x0, y0 + 1)
  const d = hash(x0 + 1, y0 + 1)
  return a * (1 - u) * (1 - v) + b * u * (1 - v) + c * (1 - u) * v + d * u * v
}
function fbm(x, y) {
  let sum = 0
  let amp = 0.5
  let scale = 42
  for (let o = 0; o < 5; o++) {
    sum += smoothNoise(x, y, scale) * amp
    amp *= 0.5
    scale *= 0.5
  }
  return sum
}

let cached = null

export function concreteMaps(size = 256) {
  if (cached) return cached

  const map = new THREE.CanvasTexture(
    noiseCanvas(size, (x, y) => {
      const n = fbm(x, y)
      // Weathering streaks running down the facade — rain staining is one of
      // the strongest "this is a real building" cues there is.
      const streak = smoothNoise(x, y * 0.06, 30) * 0.13
      const v = 150 + (n - 0.5) * 46 - streak * 90
      return [v, v * 0.995, v * 0.975]
    })
  )

  const normalMap = new THREE.CanvasTexture(
    noiseCanvas(size, (x, y) => {
      // Finite-difference the height field into a tangent-space normal.
      const s = 1.6
      const dx = (fbm(x + 1, y) - fbm(x - 1, y)) * s
      const dy = (fbm(x, y + 1) - fbm(x, y - 1)) * s
      return [
        Math.max(0, Math.min(255, 128 - dx * 127)),
        Math.max(0, Math.min(255, 128 - dy * 127)),
        255
      ]
    })
  )

  const roughnessMap = new THREE.CanvasTexture(
    noiseCanvas(size, (x, y) => {
      const n = fbm(x * 1.7, y * 1.7)
      const v = 190 + (n - 0.5) * 70
      return [v, v, v]
    })
  )

  for (const t of [map, normalMap, roughnessMap]) {
    t.wrapS = t.wrapT = THREE.RepeatWrapping
    t.anisotropy = 4
  }

  cached = { map, normalMap, roughnessMap }
  return cached
}
