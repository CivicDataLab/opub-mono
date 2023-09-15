const tokenSanitize = require('../lib/style-dictionary/sanitize');
const tailwindFormat = require('../lib/style-dictionary/tailwind-formattor');
const cssFormattor = require('../lib/style-dictionary/css-formattor');
const jsFormattor = require('../lib/style-dictionary/js-formattor');
const config = require('../styles/tokens/tokens.json');

let tokens = tokenSanitize(config);
module.exports = {
  format: {
    // tailwindFormat,
    cssFormattor,
    // jsFormattor,
  },
  tokens,
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: './tokens/',
      files: [
        {
          destination: '_variables.css',
          format: 'cssFormattor',
        },
      ],
    },
  },
};
