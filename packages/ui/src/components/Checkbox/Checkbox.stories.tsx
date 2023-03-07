import { Meta, StoryObj } from '@storybook/react';
import { Form } from '../Form';
import { Checkbox } from './Checkbox';
import { PropsVariationSection } from '@ui/utils/helpers';
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

export const Default = ({ children = 'label', ...props }: any) => (
  <Form defaultValues={{}}>
    <Checkbox name="name1" {...props}>
      {children}
    </Checkbox>
  </Form>
);

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
    common={{ children: 'Label', name: 'abc' }}
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

export const CheckboxGroup = () => (
  <Form formSubmit={(e: any) => console.log(e)}>
    <Checkbox name="name[0]" value="abc">
      ABC
    </Checkbox>
    <Checkbox name="name[1]" value="def">
      DEF
    </Checkbox>
    <Button submit size="slim">
      Submit
    </Button>
  </Form>
);
