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
      className="w-full h-12 rounded-1 bg-borderHighlightDefault"
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
