/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBlue: '#4A6572',
        mustard: '#F9AA33',
        olive: '#8B8D42',
        lightBlue: '#BFD4DB',
        beige: '#EAE3D2',
        ivory: '#F9F5E6',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
