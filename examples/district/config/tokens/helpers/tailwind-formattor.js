function arrayToCamelCase(tokens) {
  return tokens
    .map((word, index) => {
      if (index === 0) return word.toLowerCase();
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join('');
}

function nameFormat({ name, cssStyle = false, trimName = false, trimLength }) {
  // format `design/token` to `design-token`
  if (cssStyle) {
    return `--${name.toLowerCase().split('/').join('-')}`;
  }

  // format `design/token/1` to `1`
  // with trimLength = 2, format `design/token/abc/def` to `abcDef`
  if (trimName) {
    return arrayToCamelCase(name.split('/').slice(-trimLength));
  }

  // format `design/token` to `designToken`
  return `${arrayToCamelCase(name.split('/'))}`;
}

module.exports = function ({ dictionary, options }) {
  const { category, type, trimName, trimLength = 1 } = options;

  let tokensObj = Object.values(dictionary.tokens).filter(
    (token) => token.name === category
  );

  // for border-radius and border-width since they are nested
  if (type) {
    tokensObj = tokensObj[0].modes[0].variables.filter((token) =>
      token.name.includes(type)
    );
  }

  const variables = type ? tokensObj : tokensObj[0].modes[0].variables;

  let families = 'module.exports = { \n';
  variables.forEach((variable) => {
    let name = nameFormat({
      name: variable.name,
      trimName,
      trimLength,
    });
    let value;
    if (variable.type === 'effect') {
      value = `"var(${nameFormat({
        name: variable.name,
        cssStyle: true,
      })})"`;
    } else {
      // if the value is based on another design token
      if (variable['isAlias'] === true) {
        value = `"var(${nameFormat({
          name: variable.value.name,
          cssStyle: true,
        })})"`;
      } else {
        // if it's a fixed value
        if (variable.type === 'number') {
          value = `"${variable.value}px"`;
        } else {
          value = `"${variable.value}"`;
        }
      }
    }
    families += `  "${name}": ${value},\n`;
  });
  families += '}\n';

  return families;
};
