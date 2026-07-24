/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tiranga: {
          saffron: "#FF671F",
          saffronLight: "#FF8534",
          green: "#046A38",
          greenLight: "#059669",
          navy: "#0B1325",
          navyCard: "#132036",
          chakra: "#000080",
          sand: "#FAF6F0",
          gold: "#D4AF37",
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Cinzel', 'serif'],
      },
    },
  },
  plugins: [],
}
