/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        berkshire: ['Berkshire Swash', 'cursive'],
        gamjaFlower: ['Gamja Flower', 'cursive'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
    'tailwindcss',
    'autoprefixer',
    'postcss-100vh-fix',
  ],
}
