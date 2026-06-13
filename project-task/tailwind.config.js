/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          light: '#F5F5F5',     // Elegant light background
          dark: '#111111',      // Pure modern dark
          gold: '#C5A880',      // Soft warm luxury gold
          goldHover: '#B4966E', // Gold hover transition
          grey: '#777777',      // Secondary text grey
          lightGrey: '#E5E5E5', // Outer container border/fill as in image
          bgGrey: '#EAEAEA',    // Exact light grey for navbar background
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Montserrat"', '"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(0, 0, 0, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.03)',
        'luxury-gold': '0 20px 40px -15px rgba(197, 168, 128, 0.15), 0 1px 3px 0 rgba(197, 168, 128, 0.08)',
        'navbar-inner': 'inset 0 1px 2px rgba(0,0,0,0.02)',
      }
    },
  },
  plugins: [],
}
