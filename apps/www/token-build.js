const tokenSanitize = require('./lib/style-dictionary/sanitize');
const transform = require('./lib/style-dictionary/transform');
const tailwindFormat = require('./lib/style-dictionary/tailwind-formattor');

const config = require('./config/figma.tokens.json');

let sanitized = tokenSanitize(config);
let tokens = transform(sanitized);

module.exports = {
  format: {
    tailwindFormat,
  },
  tokens,
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'styles/tokens/',
      files: [
        {
          destination: '_variables.css',
          format: 'css/variables',
        },
      ],
    },
    json: {
      transforms: ['attribute/cti', 'name/cti/camel'],
      buildPath: 'styles/tokens/',
      files: [
        {
          destination: '_variables.json',
          format: 'json/nested',
        },
      ],
    },
    ts: {
      transformGroup: 'js',
      transforms: ['name/cti/camel'],
      buildPath: 'styles/tokens/',
      files: [
        {
          format: 'javascript/module-flat',
          destination: 'variables.js',
        },
        {
          format: 'typescript/module-declarations',
          destination: 'variables.d.ts',
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
            noEnclose: true,
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
