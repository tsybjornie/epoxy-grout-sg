import * as THREE from 'three'

/* Procedural canvas textures. Everything in the rooms is generated — no image
   downloads, nothing to license, and the single-file build stays a single
   file. Each generator is called once and cached by key. */

const cache = new Map()

function canvasTexture(key, size, draw, opts = {}) {
  if (cache.has(key)) return cache.get(key)
  const c = document.createElement('canvas')
  c.width = c.height = size
  draw(c.getContext('2d'), size)
  const tex = new THREE.CanvasTexture(c)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.colorSpace = THREE.SRGBColorSpace
  if (opts.repeat) tex.repeat.set(opts.repeat[0], opts.repeat[1])
  tex.anisotropy = 8
  cache.set(key, tex)
  return tex
}

// Deterministic PRNG — textures must be identical on every mount or the
// rooms visibly "re-skin" when React remounts a canvas.
function mulberry(seed) {
  let a = seed
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/* Burl wood — swirled knots in warm walnut. Layered translucent arcs around
   randomly seeded knot centres read as burl at cabinet-door distance. */
export function burlWood() {
  return canvasTexture('burl', 512, (ctx, S) => {
    const rnd = mulberry(7)
    ctx.fillStyle = '#4A3220'
    ctx.fillRect(0, 0, S, S)
    // base grain wash
    for (let i = 0; i < 900; i++) {
      const y = rnd() * S
      ctx.strokeStyle = `rgba(${30 + rnd() * 60}, ${18 + rnd() * 34}, ${8 + rnd() * 18}, ${0.05 + rnd() * 0.08})`
      ctx.lineWidth = 0.5 + rnd() * 2
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.bezierCurveTo(S * 0.3, y + (rnd() - 0.5) * 40, S * 0.7, y + (rnd() - 0.5) * 40, S, y + (rnd() - 0.5) * 24)
      ctx.stroke()
    }
    // knots
    for (let k = 0; k < 14; k++) {
      const cx = rnd() * S, cy = rnd() * S, rings = 6 + Math.floor(rnd() * 10)
      for (let r = rings; r > 0; r--) {
        const rad = r * (2.5 + rnd() * 3.5)
        ctx.strokeStyle = r % 2
          ? `rgba(96, 62, 32, ${0.16 + rnd() * 0.14})`
          : `rgba(40, 24, 12, ${0.18 + rnd() * 0.16})`
        ctx.lineWidth = 1 + rnd() * 2.2
        ctx.beginPath()
        ctx.ellipse(cx, cy, rad, rad * (0.7 + rnd() * 0.3), rnd() * Math.PI, 0, Math.PI * 2)
        ctx.stroke()
      }
      ctx.fillStyle = 'rgba(24, 13, 6, 0.55)'
      ctx.beginPath()
      ctx.arc(cx, cy, 2 + rnd() * 3, 0, Math.PI * 2)
      ctx.fill()
    }
    // gloss streaks — lacquered finish
    for (let i = 0; i < 60; i++) {
      const y = rnd() * S
      ctx.strokeStyle = `rgba(214, 168, 110, ${0.03 + rnd() * 0.05})`
      ctx.lineWidth = 2 + rnd() * 6
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(S, y + (rnd() - 0.5) * 30)
      ctx.stroke()
    }
  })
}

/* Cream marble — faint warm-grey veining on off-white, for the living floor. */
export function creamMarble() {
  return canvasTexture('marble', 512, (ctx, S) => {
    const rnd = mulberry(21)
    ctx.fillStyle = '#EFE9DE'
    ctx.fillRect(0, 0, S, S)
    for (let i = 0; i < 26; i++) {
      let x = rnd() * S, y = rnd() * S
      ctx.strokeStyle = `rgba(${140 + rnd() * 40}, ${132 + rnd() * 36}, ${120 + rnd() * 30}, ${0.10 + rnd() * 0.12})`
      ctx.lineWidth = 0.6 + rnd() * 1.6
      ctx.beginPath()
      ctx.moveTo(x, y)
      for (let s = 0; s < 7; s++) {
        x += (rnd() - 0.5) * 160
        y += (rnd() - 0.3) * 120
        ctx.lineTo(x, y)
      }
      ctx.stroke()
    }
    // soft clouding
    for (let i = 0; i < 240; i++) {
      ctx.fillStyle = `rgba(226, 218, 202, ${0.04 + rnd() * 0.05})`
      ctx.beginPath()
      ctx.arc(rnd() * S, rnd() * S, 10 + rnd() * 44, 0, Math.PI * 2)
      ctx.fill()
    }
  })
}

/* Soapstone — near-black with pale mineral threads. */
export function soapstone() {
  return canvasTexture('soap', 512, (ctx, S) => {
    const rnd = mulberry(33)
    ctx.fillStyle = '#22262A'
    ctx.fillRect(0, 0, S, S)
    for (let i = 0; i < 900; i++) {
      ctx.fillStyle = `rgba(${52 + rnd() * 30}, ${56 + rnd() * 30}, ${60 + rnd() * 28}, ${0.05 + rnd() * 0.07})`
      ctx.beginPath()
      ctx.arc(rnd() * S, rnd() * S, 1 + rnd() * 8, 0, Math.PI * 2)
      ctx.fill()
    }
    for (let i = 0; i < 9; i++) {
      let x = rnd() * S, y = rnd() * S
      ctx.strokeStyle = `rgba(178, 184, 188, ${0.10 + rnd() * 0.10})`
      ctx.lineWidth = 0.5 + rnd() * 1.1
      ctx.beginPath()
      ctx.moveTo(x, y)
      for (let s = 0; s < 6; s++) {
        x += (rnd() - 0.5) * 190
        y += (rnd() - 0.5) * 90
        ctx.lineTo(x, y)
      }
      ctx.stroke()
    }
  })
}

/* Terracotta — warm fired-clay mottling for the bathroom floor. */
export function terracottaTile() {
  return canvasTexture('terra', 512, (ctx, S) => {
    const rnd = mulberry(55)
    ctx.fillStyle = '#B4643E'
    ctx.fillRect(0, 0, S, S)
    for (let i = 0; i < 1400; i++) {
      const warm = rnd() > 0.5
      ctx.fillStyle = warm
        ? `rgba(${190 + rnd() * 40}, ${118 + rnd() * 34}, ${80 + rnd() * 26}, ${0.05 + rnd() * 0.08})`
        : `rgba(${140 + rnd() * 30}, ${70 + rnd() * 22}, ${44 + rnd() * 18}, ${0.05 + rnd() * 0.08})`
      ctx.beginPath()
      ctx.arc(rnd() * S, rnd() * S, 2 + rnd() * 26, 0, Math.PI * 2)
      ctx.fill()
    }
  })
}

/* Warm limewash plaster for walls. */
export function plaster() {
  return canvasTexture('plaster', 512, (ctx, S) => {
    const rnd = mulberry(77)
    ctx.fillStyle = '#D9CDBA'
    ctx.fillRect(0, 0, S, S)
    for (let i = 0; i < 2200; i++) {
      const light = rnd() > 0.5
      ctx.fillStyle = light
        ? `rgba(238, 230, 214, ${0.03 + rnd() * 0.05})`
        : `rgba(186, 172, 150, ${0.03 + rnd() * 0.05})`
      ctx.beginPath()
      ctx.arc(rnd() * S, rnd() * S, 3 + rnd() * 30, 0, Math.PI * 2)
      ctx.fill()
    }
  })
}
