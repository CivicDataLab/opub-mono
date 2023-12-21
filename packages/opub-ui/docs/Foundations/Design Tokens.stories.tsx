import tokens from '../../styles/tokens.json';
import { TokenTable, convertToCssVariable } from './TokenTable';

const meta = {
  title: 'Foundations/Design Tokens',
};

export default meta;

const colorsRaw = { ...tokens.collections[0].modes[0].variables };
const colors = Object.values(colorsRaw).map((color: any) => {
  const value =
    typeof color.value === 'string' ? color.value : color.value.name;
  return {
    name: color.name,
    value,
    example:
      typeof color.value === 'string'
        ? color.value
        : convertToCssVariable(value),
  };
});

const exampleFormatColor = (info: any) => {
  return (
    <div
      className="w-full h-12 rounded-1 border-1 border-solid border-borderDefault"
      style={{ backgroundColor: info.getValue() }}
      aria-hidden="true"
    />
  );
};

export const Colors: any = {
  render: () => {
    return <TokenTable data={colors} exampleFormat={exampleFormatColor} />;
  },
};

const spaceRaw = { ...tokens.collections[1].modes[0].variables };
const space = Object.values(spaceRaw).map((space: any) => {
  return {
    name: space.name,
    value: `${space.value}px`,
    example: `${space.value}px`,
  };
});

const exampleFormatSpace = (info: any) => {
  return (
    <div
      className="w-full rounded-1 bg-borderHighlightDefault"
      style={{
        height: info.getValue(),
      }}
      aria-hidden="true"
    />
  );
};

export const Space: any = {
  render: () => {
    return <TokenTable data={space} exampleFormat={exampleFormatSpace} />;
  },
};

const borderRaw = { ...tokens.collections[2].modes[0].variables };
const borders = Object.values(borderRaw).map((border: any) => {
  const value =
    typeof border.value === 'number' ? border.value : border.value.name;

  return {
    name: border.name,
    value: value,
    example:
      typeof border.value === 'number'
        ? `${border.value}px`
        : convertToCssVariable(value),
  };
});

const exampleFormatBorder = (info: any, type: 'radius' | 'width') => {
  const isRadius = info.row.original.name.includes('radius');

  if (isRadius) {
    return (
      <div
        className="w-12 h-12 bg-borderHighlightDefault"
        style={{
          borderRadius: info.getValue(),
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className="w-12 h-12 border-solid border-borderDefault rounded-1"
      style={{
        borderWidth: info.getValue(),
      }}
      aria-hidden="true"
    />
  );
};

export const Borders: any = {
  render: () => {
    return <TokenTable data={borders} exampleFormat={exampleFormatBorder} />;
  },
};

// Elevation
function rgbaToString(rgba: any) {
  return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
}

function effectObjToString(effect: any) {
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

const elevationRaw = { ...tokens.collections[4].modes[0].variables };

const elevations = Object.values(elevationRaw).map((effect) => {
  let value = '';
  effect.value.effects.forEach((val: any) => {
    value += `${effectObjToString(val)}, `;
  });

  return {
    name: effect.name,
    value: value.slice(0, -2),
    example: value.slice(0, -2),
  };
});

const exampleFormatElevation = (info: any) => {
  return (
    <div
      className="w-full min-w-24 h-12 rounded-1"
      style={{
        boxShadow: info.getValue(),
      }}
      aria-hidden="true"
    />
  );
};

export const Elevations: any = {
  render: () => {
    return (
      <TokenTable data={elevations} exampleFormat={exampleFormatElevation} />
    );
  },
};
