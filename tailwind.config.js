/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: '#(255, 215, 0)',       // Main gold color
        'gold-light': '#(255, 215, 0)', 
        'gold-dark': '#(255, 215, 0)',
        black: '#000000',      // Main black color
        'black-light': '#333333',
        'black-dark': '#111111',
      },
      animation: {
        'fadeIn': 'fadeIn 1s ease-in forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      }
    },
  },
  plugins: [],
}