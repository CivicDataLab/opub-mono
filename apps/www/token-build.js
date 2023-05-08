const config = require('./config/tokens.json');

// style dictionary need `value` and `comment`
let tokens = JSON.parse(
  JSON.stringify(Object.values(config)[0])
    .replaceAll('"$value"', '"value"')
    .replaceAll('"$description"', '"comment"')
);

const transformed = {};
// moving default entries to root
Object.keys(tokens).forEach((rootKey) => {
  if (!transformed[rootKey]) {
    transformed[rootKey] = {};
  }
  const obj = tokens[rootKey];
  if (obj.value) {
    // transform border value from object to string
    if (obj['$type'] === 'border') {
      const borderValue = `${obj.value.width} ${obj.value.style} ${obj.value.color}`;
      transformed[rootKey] = {
        ...obj,
        value: borderValue,
      };
      return;
    }

    if (obj['$type'] === 'shadow') {
      const shadowValue = `${obj.value.offsetX} ${obj.value.offsetY} ${obj.value.blur} ${obj.value.spread} ${obj.value.color}`;
      transformed[rootKey] = {
        ...obj,
        value: shadowValue,
      };
      return;
    }

    if (obj['$type'] === 'fontFamily') {
      transformed[rootKey] = {
        ...obj,
        value: `"${obj.value}"`,
      };
      return;
    }

    if (obj['$type'] === 'fontWeight') {
      transformed[`font-weight${rootKey}`] = {
        ...obj,
      };
      return;
    }

    // dont add typography in variables
    if (obj['$type'] === 'typography') {
      return;
    }

    transformed[rootKey] = obj;
    return;
  }

  Object.keys(obj).forEach((entry) => {
    if (entry.toLowerCase() === 'default') {
      transformed[rootKey.toLowerCase()] = obj[entry];
    } else {
      transformed[rootKey][entry] = tokens[rootKey][entry];
    }
  });
});

module.exports = {
  tokens: transformed,
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
