const tokenSanitize = require('../lib/style-dictionary/sanitize');
const tailwindFormat = require('../lib/style-dictionary/tailwind-formattor');
const cssFormattor = require('../lib/style-dictionary/css-formattor');
const jsFormattor = require('../lib/style-dictionary/js-formattor');
const config = require('./figma.tokens.json');

let tokens = tokenSanitize(config);
module.exports = {
  format: {
    tailwindFormat,
    cssFormattor,
    jsFormattor,
  },
  tokens,
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'styles/tokens/',
      files: [
        {
          destination: '_variables.css',
          format: 'cssFormattor',
        },
      ],
    },
    ts: {
      transformGroup: 'js',
      transforms: ['name/cti/camel'],
      buildPath: 'styles/tokens/',
      files: [
        {
          format: 'jsFormattor',
          destination: 'variables.js',
        },
      ],
    },
    tailwind: {
      buildPath: 'styles/tokens/tailwind/',
      transformGroup: 'js',
      transforms: ['attribute/cti', 'name/cti/camel'],
      files: [
        {
          destination: 'space.js',
          format: 'tailwindFormat',
          options: {
            type: 'space',
            category: 'dimension',
            trimName: true,
          },
        },
        {
          destination: 'line-height.js',
          format: 'tailwindFormat',
          options: {
            type: 'line-height',
            category: 'dimension',
            trimName: true,
          },
        },
        {
          destination: 'border-radius.js',
          format: 'tailwindFormat',
          options: {
            type: 'border-radius',
            category: 'dimension',
            trimName: true,
          },
        },
        {
          destination: 'border-width.js',
          format: 'tailwindFormat',
          options: {
            type: 'border-width',
            category: 'dimension',
            trimName: true,
          },
        },
        {
          destination: 'font-size.js',
          format: 'tailwindFormat',
          options: {
            type: 'font-size',
            category: 'dimension',
            trimName: true,
          },
        },
        {
          destination: 'box-shadow.js',
          format: 'tailwindFormat',
          options: {
            category: 'shadow',
            removeCategory: true,
          },
        },
        {
          destination: 'z-index.js',
          format: 'tailwindFormat',
          options: {
            type: 'z',
            category: 'number',
          },
        },
        {
          destination: 'duration.js',
          format: 'tailwindFormat',
          options: {
            category: 'duration',
            trimName: true,
          },
        },
        {
          destination: 'ease-function.js',
          format: 'tailwindFormat',
          options: {
            category: 'cubicBezier',
          },
        },
        {
          destination: 'font-family.js',
          format: 'tailwindFormat',
          options: {
            category: 'fontFamily',
            trimName: true,
          },
        },
        {
          destination: 'font-weight.js',
          format: 'tailwindFormat',
          options: {
            category: 'fontWeight',
            trimName: true,
          },
        },
        {
          destination: 'color.js',
          format: 'tailwindFormat',
          options: {
            category: 'color',
            useNameAttribute: true,
          },
        },
      ],
    },
  },
};
