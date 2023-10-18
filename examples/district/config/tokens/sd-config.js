const cssFormattor = require('./helpers/css-formattor');
const twFormat = require('./helpers/tailwind-formattor');
const config = require('./tokens.json');

module.exports = {
  format: {
    twFormat,
    cssFormattor,
  },
  tokens: config.collections,
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
    tailwind: {
      transformGroup: 'js',
      buildPath: 'styles/tokens/tailwind/',
      files: [
        {
          destination: 'space.js',
          format: 'twFormat',
          options: {
            category: 'Spacing / Numericals',
            trimName: true,
          },
        },
        {
          destination: 'border-radius.js',
          format: 'twFormat',
          options: {
            type: 'radius',
            category: 'Borders',
            trimName: true,
          },
        },
        {
          destination: 'border-width.js',
          format: 'twFormat',
          options: {
            type: 'width',
            category: 'Borders',
            trimName: true,
          },
        },
        {
          destination: 'box-shadow.js',
          format: 'twFormat',
          options: {
            category: 'Effects',
            trimName: true,
            trimLength: 2,
          },
        },
        {
          destination: 'color.js',
          format: 'twFormat',
          options: {
            category: 'Colors',
          },
        },
      ],
    },
  },
};
