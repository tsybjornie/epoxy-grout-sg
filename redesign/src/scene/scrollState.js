/* Scroll + pointer, shared between the DOM layer and the WebGL layer.

   This exists because the photo and the camera must move off the SAME source.
   drei's ScrollControls builds its own scroll container and captures the
   wheel, which is fine when everything lives inside the Canvas — but the hero
   photograph is a DOM <img>, and it cannot read that container. Driving both
   from page scroll through a plain module-level object keeps them in lockstep
   with no context plumbing and, more importantly, no React re-render on every
   scroll frame.

   px/py are the normalised pointer (-1..1). The scene reads them each frame
   to drive the key light and a light parallax on the camera — the "mouse
   lighting physics" layer. Same rule as t: never through React state. */

export const scrollState = { t: 0, px: 0, py: 0 }
