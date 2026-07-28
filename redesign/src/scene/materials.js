import * as THREE from 'three'
import { groutStore } from '../state/groutStore.js'

/* Every grout surface in the scene registers its material here, and Journey
   lerps them all toward the store's current target once per frame. UI clicks
   never touch React state that the Canvas depends on — the scene just
   notices the target moved and glides there.

   Two kinds:
     'live'   — follows the swatch AND the epoxy/cement toggle. All the
                grout we would lay.
     'cement' — the "before" reference: always dull cement. The macro shot's
                near half, so the comparison survives every toggle state. */

const registry = []

const CEMENT = {
  color: new THREE.Color('#847D72'),
  roughness: 0.97,
  metalness: 0.0,
  envMapIntensity: 0.15
}

export function makeGroutMaterial(kind = 'live') {
  const mat = new THREE.MeshStandardMaterial({
    color: kind === 'cement' ? CEMENT.color : new THREE.Color(groutStore.swatch.hex),
    roughness: kind === 'cement' ? CEMENT.roughness : 0.22,
    metalness: 0,
    envMapIntensity: 1
  })
  registry.push({ mat, kind })
  return mat
}

const _target = new THREE.Color()

/* Called from useFrame. Critically-damped like the camera, and framed in
   delta so the glide is identical at 60 and 144 Hz. */
export function updateGroutMaterials(delta) {
  const k = 1 - Math.pow(0.000001, delta)
  const epoxy = groutStore.material === 'epoxy'

  for (const { mat, kind } of registry) {
    if (kind === 'cement' || !epoxy) {
      _target.copy(CEMENT.color)
      mat.color.lerp(_target, k)
      mat.roughness += (CEMENT.roughness - mat.roughness) * k
      mat.metalness += (0 - mat.metalness) * k
      mat.envMapIntensity += (CEMENT.envMapIntensity - mat.envMapIntensity) * k
    } else {
      _target.set(groutStore.swatch.hex)
      mat.color.lerp(_target, k)
      // High-sheen liquid epoxy: tight speculars, faintly wet.
      mat.roughness += (0.18 - mat.roughness) * k
      // Sparkle Silver and Champagne Gold carry a metallic component;
      // Pearl and Espresso are resin-bodied.
      const metal =
        groutStore.swatch.key === 'silver' ? 0.85 :
        groutStore.swatch.key === 'champagne' ? 0.6 : 0.05
      mat.metalness += (metal - mat.metalness) * k
      mat.envMapIntensity += (1.4 - mat.envMapIntensity) * k
    }
  }
}
