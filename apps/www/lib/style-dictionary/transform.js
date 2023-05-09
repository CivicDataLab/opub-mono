// This code transforms the design tokens from the design system into a format that
// is consumable by the style dictionary.

module.exports = (tokens) => {
  let transformed = {};
  // moving default entries to root
  Object.keys(tokens).forEach((rootKey) => {
    if (!transformed[rootKey]) {
      transformed[rootKey] = {};
    }
    const obj = tokens[rootKey];
    if (obj.value) {
      // transform border value from object to string
      if (obj['category'] === 'border') {
        const borderValue = `${obj.value.width} ${obj.value.style} ${obj.value.color}`;
        transformed[rootKey] = {
          ...obj,
          value: borderValue,
        };
        return;
      }

      if (obj['category'] === 'shadow') {
        const shadowValue = `${obj.value.offsetX} ${obj.value.offsetY} ${obj.value.blur} ${obj.value.spread} ${obj.value.color}`;
        transformed[rootKey] = {
          ...obj,
          value: shadowValue,
        };
        return;
      }

      if (obj['category'] === 'fontFamily') {
        transformed[rootKey.toLowerCase()] = {
          ...obj,
          value: `"${obj.value}"`,
        };
        return;
      }

      if (obj['category'] === 'fontWeight') {
        transformed[`font-weight-${rootKey.toLowerCase()}`] = {
          ...obj,
        };
        return;
      }

      // dont add typography in variables
      if (obj['category'] === 'typography') {
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

  return transformed;
};
