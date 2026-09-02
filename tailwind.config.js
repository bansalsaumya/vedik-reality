/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#FAF7F2',     // Warm Off-White / Ivory
        cream: '#F4EFEA',     // Soft Beige / Light Cream
        sand: '#EAE3D9',      // Accent Light Sand
        charcoal: {
          950: '#0D0F12',
          900: '#14171F',
          800: '#1A1D24',     // Deep Charcoal
          700: '#2A303C',
          600: '#4A5568',
        },
        gold: {
          400: '#D4AF37',
          500: '#C59B27',     // Elegant Gold
          600: '#AA8828',
          700: '#9E7B1C',     // Warm Bronze
        },
        borderlight: '#E5DFD5', // Very light beige border
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
