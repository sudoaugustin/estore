const colors = require('tailwindcss/colors');
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.js', './components/**/*.js', './layouts/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
      },
      fill: { none: 'none' },
      colors: { ...colors, gray: colors.blueGray },
    },
  },
  variants: {
    extend: {
      keyframes: {
        wiggle: {
          '0%': { transform: 'rotateX(0deg)' },
          '100%': { transform: 'rotateX(360deg)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
