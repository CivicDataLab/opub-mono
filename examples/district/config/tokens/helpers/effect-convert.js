function rgbaToString(rgba) {
  return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
}

function effectObjToString(effect) {
  let value = '';
  switch (effect.type) {
    case 'DROP_SHADOW':
      value = `${effect.offset.x}px ${effect.offset.y}px ${effect.radius}px ${
        effect.spread
      }px ${rgbaToString(effect.color)}`;
      break;
    case 'INNER_SHADOW':
      value = `inset ${effect.offset.x}px ${effect.offset.y}px ${
        effect.radius
      }px ${effect.spread}px ${rgbaToString(effect.color)}`;
      break;
    default:
      value = `${effect.offset.x}px ${effect.offset.y}px ${effect.radius}px ${
        effect.spread
      }px ${rgbaToString(effect.color)}`;
      break;
  }
  return value;
}

module.exports = function (effects) {
  let value = '';
  effects.forEach((effect) => {
    value += `${effectObjToString(effect)}, `;
  });
  return value.slice(0, -2);
};
