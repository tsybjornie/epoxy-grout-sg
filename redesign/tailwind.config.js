/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Deep slate — the brief's #080C14 — stepping up to lifted panels.
        // The site is a gallery: surfaces recede, the rooms carry the light.
        ink: { 900: '#080C14', 800: '#0C111B', 700: '#121826', 600: '#1A2233' },
        haze: { 400: '#6E7687', 300: '#9BA3B4', 200: '#D6D9E0' },
        // Gold is the only accent. It marks price, controls and proof.
        gold: { DEFAULT: '#D4AF37', soft: '#E8CE7A', deep: '#A8862A' },
        // The four grout colours we actually sell, so UI chips match the 3D.
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
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace']
      },
      letterSpacing: { ultra: '0.42em', wide2: '0.22em' }
    }
  },
  plugins: []
}
