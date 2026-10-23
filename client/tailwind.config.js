/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#080D10', light: '#11191D' },
        gold: { DEFAULT: '#D99A32', light: '#F0B84C', dark: '#B8841F' },
        cream: '#F7F4ED',
        dark: '#252525',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
