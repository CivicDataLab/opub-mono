/** @type {import('tailwindcss').Config} */
const borderRadius = require('./styles/tailwind/border-radius');
const borderWidth = require('./styles/tailwind/border-width');
const boxShadow = require('./styles/tailwind/box-shadow');
const colors = require('./styles/tailwind/color');
const fontFamily = require('./styles/tailwind/font-family');
const fontSize = require('./styles/tailwind/font-size');
const fontWeight = require('./styles/tailwind/font-weight');
const lineHeight = require('./styles/tailwind/line-height');
const space = require('./styles/tailwind/space');
const transitionTimingFunction = require('./styles/tailwind/ease-function');
const transitionDuration = require('./styles/tailwind/duration');
const zIndex = require('./styles/tailwind/z-index');

module.exports = {
  corePlugins: {
    preflight: false,
  },
  darkMode: ['class', '[data-mode="dark"]'],
  content: ['./docs/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
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
      'accordion-down': 'accordion-down 0.2s ease-out',
      'accordion-up': 'accordion-up 0.2s ease-out',
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
      xl: '1336px',
      '2xl': '1536px',
    },
    container: {
      center: true,
      padding: '20px',
    },
    keyframes: {
      'accordion-down': {
        from: { height: '0' },
        to: { height: 'var(--radix-accordion-content-height)' },
      },
      'accordion-up': {
        from: { height: 'var(--radix-accordion-content-height)' },
        to: { height: '0' },
      },
    },
  },
  plugins: [],
};
