/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          950: '#0A0C0F',
          900: '#0F1115',
          800: '#181C24',
          700: '#222834',
          600: '#323B4D',
        },
        gold: {
          400: '#F3E5AB',
          500: '#D4AF37',
          600: '#AA8828',
          700: '#856A1E',
        },
        ivory: '#FAF8F5',
        beige: '#F4EFEA',
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
