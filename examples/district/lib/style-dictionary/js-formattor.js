const convertValue = require('./converter');

module.exports = function ({ dictionary, options }) {
  let families = 'module.exports = { \n';
  dictionary.allTokens.map((token) => {
    if (token.category === 'typography') return;

    let name = `"${token.name.replace('Default', '')}"`;
    let value = `"${convertValue(token.value, token.category)}"`;

    families += `  ${name}: ${value},\n`;
  });
  families += '}\n';

  return families;
};
