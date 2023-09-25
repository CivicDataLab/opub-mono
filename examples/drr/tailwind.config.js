/** @type {import('tailwindcss').Config} */
const borderRadius = require('./styles/tokens/tailwind/border-radius');
const borderWidth = require('./styles/tokens/tailwind/border-width');
const boxShadow = require('./styles/tokens/tailwind/box-shadow');
const colors = require('./styles/tokens/tailwind/color');
const fontFamily = require('./styles/tokens/tailwind/font-family');
const fontSize = require('./styles/tokens/tailwind/font-size');
const fontWeight = require('./styles/tokens/tailwind/font-weight');
const lineHeight = require('./styles/tokens/tailwind/line-height');
const space = require('./styles/tokens/tailwind/space');
const transitionTimingFunction = require('./styles/tokens/tailwind/ease-function');
const transitionDuration = require('./styles/tokens/tailwind/duration');
const zIndex = require('./styles/tokens/tailwind/z-index');

module.exports = {
  darkMode: ['class', '[data-mode="dark"]'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors,
    space,
    borderRadius,
    borderWidth,
    fontSize,
    lineHeight,
    boxShadow,
    zIndex,
    transitionTimingFunction,
    transitionDuration,
    fontFamily,
    fontWeight,

    animation: {
      none: 'none',
      spin: 'spin 1s linear infinite',
      ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
      pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      bounce: 'bounce 1s infinite',
    },
    aspectRatio: {
      auto: 'auto',
      square: '1 / 1',
      video: '16 / 9',
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    container: {
      center: true,
      padding: '14px',
    },
    extend: {
      flex: {
        '2': '2 2 0%',
        '3': '3 3 0%',
      },
  }
},
  plugins: [],
};
