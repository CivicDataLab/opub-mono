import tokens from '../../styles/tokens.json';
import { TokenTable } from './TokenTable';

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

export const Colors: any = {
  render: () => {
    return <TokenTable data={colors} />;
  },
};

function convertToCssVariable(name: string) {
  return `var(--${name.split('/').join('-').toLowerCase()})`;
}
