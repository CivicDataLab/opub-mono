const convertMap = {
  border: (value) => {
    return `${value.width} ${value.style} ${value.color}`;
  },
  shadow: (value) => {
    return `${value.inset ? 'inset ' : ''}${value.offsetX} ${value.offsetY} ${
      value.blur
    } ${value.spread} ${value.color}`;
  },
  default: (value) => {
    return value;
  },
};

module.exports = (value, category) => {
  return convertMap[category] ? convertMap[category](value) : value;
};
