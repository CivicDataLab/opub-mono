// format `design/token` to `--design-token`
function nameFormat(name) {
  return `--${name.toLowerCase().split('/').join('-')}`;
}

module.exports = function ({ dictionary }) {
  let families = ':root { \n';
  Object.values(dictionary.tokens).map((collection) => {
    if (['Typography', 'Effects'].includes(collection.name)) return;

    collection.modes[0].variables.forEach((variable) => {
      let name = nameFormat(variable.name);
      let value;
      // if the value is based on another design token
      if (variable['isAlias'] === true) {
        value = `var(${nameFormat(variable.value.name)})`;
      } else {
        // if it's a fixed value
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
