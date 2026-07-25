/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0B1F3A',      // Deep Navy
        secondary: '#00A878',    // Emerald Green
        success: '#10B981',      // Mint Green
        background: '#F8FAFC',   // Snow White
        text: '#0F172A',         // Slate Black
        accent: '#D4AF37',       // Gold
        card: '#FFFFFF',         // White
      },
    },
  },
  plugins: [],
}
