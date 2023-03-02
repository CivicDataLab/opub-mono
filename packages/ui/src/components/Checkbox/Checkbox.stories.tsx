import { Meta } from '@storybook/react';
import { Form } from '../Form';
import { Checkbox } from './Checkbox';

/**
 * A control that allows the user to toggle between checked and not checked.
 * 
 * Reference: https://www.radix-ui.com/docs/primitives/components/checkbox
 */
export default {
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Content of the label',
    },
  },
} satisfies Meta<typeof Checkbox>;

export const Primary = ({ children = 'label', ...props }) => (
  <Form initialValues={{}}>
    <Checkbox name="name" {...props}>
      {children}
    </Checkbox>
  </Form>
);
