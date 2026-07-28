/* Grout configuration shared between the DOM controls and the 3D scene.

   Deliberately NOT React state. The scene reads it inside useFrame every
   frame and lerps materials toward it, so a swatch click must not re-render
   a tree containing a WebGL canvas. React components that need to display
   the current value subscribe and keep their own local mirror. */

export const SWATCHES = [
  { key: 'champagne', name: 'Champagne Gold', hex: '#D4AF37' },
  { key: 'pearl', name: 'Off-White Pearl', hex: '#F5F2EB' },
  { key: 'espresso', name: 'Espresso Bronze', hex: '#3D352E' },
  { key: 'silver', name: 'Sparkle Silver', hex: '#C0C0C0' }
]

const listeners = new Set()

export const groutStore = {
  swatch: SWATCHES[1],      // pearl reads best against terracotta on load
  material: 'epoxy',        // 'epoxy' | 'cement'

  setSwatch(key) {
    const s = SWATCHES.find((s) => s.key === key)
    if (!s || s === this.swatch) return
    this.swatch = s
    listeners.forEach((fn) => fn())
  },
  setMaterial(m) {
    if (m === this.material) return
    this.material = m
    listeners.forEach((fn) => fn())
  },
  subscribe(fn) {
    listeners.add(fn)
    return () => listeners.delete(fn)
  }
}
