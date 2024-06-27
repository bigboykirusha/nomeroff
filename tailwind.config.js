/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-gray': '#D9D9D9',
      },
      screens: {
        '3xl': '1800px',
      },
    },
  },
  plugins: [],
}

