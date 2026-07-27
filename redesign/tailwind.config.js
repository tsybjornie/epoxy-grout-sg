/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Deep slate through to true black. The site is a gallery, so the
        // surface should recede and let the work carry the contrast.
        ink: { 900: '#08090A', 800: '#0D0F11', 700: '#14171A', 600: '#1C2024' },
        haze: { 400: '#6B7280', 300: '#9CA3AF', 200: '#D1D5DB' },
        // One accent, used sparingly — it marks price and proof, nothing else.
        ember: '#FF5C1A'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace']
      },
      letterSpacing: { ultra: '0.42em', wide2: '0.22em' }
    }
  },
  plugins: []
}
