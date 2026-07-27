/* One scroll value, shared between the DOM layer and the WebGL layer.

   This exists because the photo and the camera must move off the SAME source.
   drei's ScrollControls builds its own scroll container and captures the
   wheel, which is fine when everything lives inside the Canvas — but the hero
   photograph is a DOM <img>, and it cannot read that container. Driving both
   from page scroll through a plain module-level object keeps them in lockstep
   with no context plumbing and, more importantly, no React re-render on every
   scroll frame. */

export const scrollState = { t: 0 }
