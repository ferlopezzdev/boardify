/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: 'Poppins, sans-serif'
      },
      colors: {
        primary: '#0C66E4',
        primaryHover: '#123263',
        primaryLight: '#E8F2FF',
        secondary: '#FFA900'
      }
    },
  },
  plugins: [
    require('tailwindcss-animated'),
  ],
}

