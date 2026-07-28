/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // The page is a bright gallery: warm ivory paper, white glass panels.
        // The 3D journey section stays dark — it is the cinema in the middle
        // of the gallery, and the contrast is the point.
        paper: { DEFAULT: '#F7F5F1', deep: '#EFEBE3', edge: '#E3DDD1' },
        ink: { 900: '#080C14', 800: '#0C111B', 700: '#121826', 600: '#1A2233' },
        // haze greys are for the DARK sections only (journey overlays).
        haze: { 400: '#6E7687', 300: '#9BA3B4', 200: '#D6D9E0' },
        // Gold is the only accent. `deep` is the legible-on-white variant.
        gold: { DEFAULT: '#D4AF37', soft: '#E8CE7A', deep: '#9A7B24' },
        grout: {
          champagne: '#D4AF37',
          pearl: '#F5F2EB',
          espresso: '#3D352E',
          silver: '#C0C0C0'
        },
        cream: '#F5F2EB',
        terracotta: '#B86B4A',
        bronze: '#8A6A45'
      },
      fontFamily: {
        sans: ['Manrope', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace']
      },
      letterSpacing: { ultra: '0.42em', wide2: '0.22em' }
    }
  },
  plugins: []
}
