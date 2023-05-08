const config = require('./config/figma.tokens.json');
const tokenSanitize = require('./lib/style-dictionary/sanitize');
const transform = require('./lib/style-dictionary/transform');

let sanitized = tokenSanitize(config);
let tokens = transform(sanitized);

module.exports = {
  tokens,
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'styles/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
        },
      ],
    },
    json: {
      buildPath: 'styles/',
      files: [
        {
          destination: 'tokens.json',
          format: 'json/nested',
        },
      ],
    },
    ts: {
      transformGroup: 'js',
      buildPath: 'styles/',
      files: [
        {
          format: 'javascript/module',
          destination: 'tokens.js',
        },
        {
          format: 'typescript/module-declarations',
          destination: 'tokens.d.ts',
        },
      ],
    },
  },
};
