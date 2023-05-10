const convertValue = require('./converter');

module.exports = function ({ dictionary, options }) {
  let families = ':root { \n';
  dictionary.allTokens.map((token) => {
    if (token.category === 'typography') return;
    let name = `--${token.name.replace('-default', '')}`;
    let value = `${convertValue(token.value, token.category)}`;

    families += `  ${name}: ${value};\n`;
  });
  families += '}\n';

  return families;
};
