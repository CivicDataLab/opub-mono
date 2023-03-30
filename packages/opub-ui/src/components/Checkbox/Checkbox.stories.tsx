import { Meta, StoryObj } from '@storybook/react';
import { Form } from '../Form';
import { Checkbox } from './Checkbox';
import { PropsVariationSection } from '../../utils/helpers';
import { Button } from '../Button';

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
  render: (args) => (
    <Form defaultValues={{ checkbox: true }}>
      <Checkbox {...args} />
    </Form>
  ),
  args: {
    name: 'checkbox',
    children: 'Label',
  },
};

export const States = () => (
  <PropsVariationSection
    withFormik
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
    withFormik
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
