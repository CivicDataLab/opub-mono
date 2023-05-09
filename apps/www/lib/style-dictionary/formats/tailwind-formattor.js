module.exports = function ({ dictionary, options }) {
  const { category, type, trimName, noEnclose, useNameAttribute } = options;

  let sizeArray = dictionary.allTokens.filter((token) => {
    if (type) {
      return (
        token.category === category && token.attributes.category.includes(type)
      );
    }
    return token.category === category;
  });
  console.log(sizeArray);
  let families = 'module.exports = { \n';
  sizeArray.map((token) => {
    let name;
    if (useNameAttribute) name = token.name;
    else {
      name = trimName
        ? token.path[token.path.length - 1].split('-')
        : token.path[token.path.length - 1];
    }

    const value = noEnclose ? token.value : `"${token.value}"`;
    families += `  "${
      trimName ? formatKey(name[name.length - 1]) : formatKey(name)
    }": ${value},\n`;
  });
  families += '}\n';

  return families;
};

function formatKey(name) {
  return name.replace(/(\s|\/)/g, '-').toLowerCase();
}
