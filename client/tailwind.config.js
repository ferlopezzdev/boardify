/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'dark',
  content: ['./src/**/*.{jsx, js, tsx, ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#2BAEE5'
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
}

