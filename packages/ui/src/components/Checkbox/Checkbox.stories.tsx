import { Meta } from '@storybook/react';
import { Form } from '../Form';
import { Checkbox } from './Checkbox';

export default {
  component: Checkbox,

  argTypes: {
    children: {
      control: 'text',
      description: 'Content of the label',
    },
  },
} as Meta<typeof Checkbox>;

export const Primary = ({ children = 'label', ...props }) => (
  <Form initialValues={{}}>
    <Checkbox name="name" {...props}>
      {children}
    </Checkbox>
  </Form>
);
