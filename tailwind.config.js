/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        gold: {
          300: '#e8cc8a',
          400: '#d4ad5a',
          500: '#c9a84c',
          600: '#b8923a',
        },
      },
      aspectRatio: {
        '3/2': '3 / 2',
        '4/3': '4 / 3',
      },
    },
  },
  plugins: [],
}
