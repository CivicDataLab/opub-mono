const tokenSanitize = require('../lib/style-dictionary/sanitize');
const tailwindFormat = require('../lib/style-dictionary/tailwind-formattor');
const cssFormattor = require('../lib/style-dictionary/css-formattor');
const jsFormattor = require('../lib/style-dictionary/js-formattor');
const config = require('../styles/tokens/tokens.json');

function colorNameFormat(name) {
  return `--${name.toLowerCase().split('/').join('-')}`;
}

const cssTransformer = function ({ dictionary }) {
  let families = ':root { \n';
  Object.values(dictionary.tokens).map((collection) => {
    if (['Typography', 'Effects'].includes(collection.name)) return;

    collection.modes[0].variables.forEach((variable) => {
      let name =
        collection.name === 'Colors'
          ? colorNameFormat(variable.name)
          : `--${variable.name}`;
      let value;
      if (variable['isAlias'] === true) {
        value =
          collection.name === 'Colors'
            ? `var(${colorNameFormat(variable.name)})`
            : `var(--${variable.value.name})`;
      } else {
        const val = variable.value;
        if (variable.type === 'number') {
          value = `${variable.value}px`;
        } else {
          value = variable.value;
        }
      }
      families += `  ${name}: ${value};\n`;
    });
    families += '\n';
  });
  families += '}\n';

  return families;
};

let tokens = tokenSanitize(config);
module.exports = {
  format: {
    // tailwindFormat,
    cssTransformer,
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
          format: 'cssTransformer',
        },
      ],
    },
  },
};
