module.exports = function ({ dictionary, options }) {
  const { category, type, trimName, useNameAttribute, removeCategory } =
    options;

  // filter tokens by category and type
  let sizeArray = dictionary.allTokens.filter((token) => {
    if (type) {
      return (
        token.category === category && token.attributes.category.includes(type)
      );
    }
    return token.category === category;
  });

  let families = 'module.exports = { \n';
  sizeArray.map((token) => {
    let name;
    // used for color tokens, where we want full name in camelCase
    if (useNameAttribute) name = token.name.replace('Default', '');
    // used for box-shadow tokens, where we want to remove the category from the name
    else if (removeCategory) {
      name = token.path[token.path.length - 1].split('-').slice(1).join('-');
    } else {
      // used for tokens where we want only the last part of the name, eg. dimension tokens
      name = trimName
        ? token.path[token.path.length - 1].split('-')
        : // all other tokens
          token.path[token.path.length - 1];
    }

    const value = `"var(${formatPath(token.path)})"`;
    families += `  "${formatKey(
      trimName ? name[name.length - 1] : name
    )}": ${value},\n`;
  });
  families += '}\n';

  return families;
};

function formatKey(name) {
  return name.replace(/(\s|\/)/g, '-'); // replace spaces and slashes with dashes
}

function formatPath(path) {
  const formattedPath = path
    .map((item) => item.toLowerCase())
    .join('-')
    .replace(/(\s|\/)/g, '-') // replace spaces and slashes with dashes
    .replace(/-default$/, ''); // remove '-default' from end of string

  return `--${formattedPath}`;
}
