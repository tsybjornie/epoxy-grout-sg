import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

/* Builds the whole app into ONE html file with every asset inlined.

   This exists only so the prototype can be looked at without a deploy or an
   account — double-click the file and it runs. It is not how the app should
   ship: inlining ~270 kB gzipped of renderer into the document defeats
   caching entirely, so every visit re-downloads the lot. Use the normal
   `npm run build` for anything real. */
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: {
    outDir: 'dist-single',
    assetsInlineLimit: 100000000,
    chunkSizeWarningLimit: 100000,
    cssCodeSplit: false,
    rollupOptions: { output: { inlineDynamicImports: true } }
  }
})
