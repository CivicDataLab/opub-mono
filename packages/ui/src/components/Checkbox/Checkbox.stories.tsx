import { Meta, StoryObj } from '@storybook/react';
import { Form } from '../Form';
import { Checkbox } from './Checkbox';
import { PropsVariationSection } from '@ui/utils/helpers';

/**
 * A control that allows the user to toggle between checked and not checked.
 *
 * Reference: https://www.radix-ui.com/docs/primitives/components/checkbox
 */
const meta = {
  component: Checkbox,
} satisfies Meta<typeof Checkbox>;

export default meta;

export const Default = ({ children = 'label', ...props }: any) => (
  <Form initialValues={{}}>
    <Checkbox name="name" {...props}>
      {children}
    </Checkbox>
  </Form>
);

export const States = () => (
  <PropsVariationSection
    withFormik
    component={Checkbox}
    common={{ children: 'Label', value: 'abc' }}
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
    common={{ children: 'Label', value: 'abc' }}
    xAxis={{
      Type: {},
    }}
    yAxis={{
      // 'Without Text': {},
      'Help Text': {
        helpText: 'Lorem ipsum dolor sit.',
      },
      'Error Text': {
        error: 'Error Lorem ipsum dolor sit.',
      },

      'Both Error & Help Text': {
        error: 'Error Lorem ipsum dolor sit.',
        helpText: 'Lorem ipsum dolor sit.',
      },
    }}
  />
);
