import { Meta, StoryObj } from '@storybook/react';
import { PropsVariationSection } from '../../utils/helpers';
import { Checkbox } from './Checkbox';

/**
 * A control that allows the user to toggle between checked and not checked.
 *
 * Reference: https://www.radix-ui.com/docs/primitives/components/checkbox
 */
const meta = {
  component: Checkbox,
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'checkbox',
    children: 'Label',
    onChange: (e, name) => console.log(e, name),
  },
};

export const States = () => (
  <PropsVariationSection
    component={Checkbox}
    common={{ children: 'Label', name: 'abc' }}
    xAxis={{
      default: {},
      disabled: { disabled: true },
      error: { error: true },
    }}
    yAxis={{
      Unchecked: {},
      Checked: { checked: true },
      'Defualt Checked': { defaultChecked: true },
      Indeterminate: { checked: 'indeterminate' },
    }}
  />
);

export const WithText = () => (
  <PropsVariationSection
    component={Checkbox}
    common={{ children: 'Label', name: 'withText' }}
    xAxis={{
      Type: {},
    }}
    yAxis={{
      'Help Text': {
        helpText: 'Lorem ipsum dolor sit.',
      },
      'Error Text': {
        error: 'Error Lorem ipsum dolor sit.',
      },

      'Error & Help Text': {
        error: 'Error Lorem ipsum dolor sit.',
        helpText: 'Lorem ipsum dolor sit.',
      },
    }}
  />
);
