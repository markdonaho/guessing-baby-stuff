/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f3ff',   // Very soft lavender
          100: '#f0e6ff',  // Lightest pastel lavender
          200: '#e6d5ff',  // Light pastel lavender
          300: '#d8c2ff',  // Soft pastel lavender
          400: '#c7a6ff',  // Muted pastel lavender
          500: '#b38aff',  // Base pastel lavender
          600: '#a470e6',  // Soft medium lavender
          700: '#8f55cc',  // Slightly deeper lavender
          800: '#7a3cb3',  // Rich pastel lavender
          900: '#693399',  // Deep pastel lavender
          950: '#3d1c5c',  // Very deep lavender
        },
        secondary: {
          50: '#f0fdf4',   // Keeping original secondary colors
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
      },
    },
  },
  plugins: [],
}