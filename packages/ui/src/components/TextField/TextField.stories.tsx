import { Meta } from '@storybook/react';
import { Form } from '../Form';
import { TextField } from './TextField';

export default {
  component: TextField,

  argTypes: {
    validationState: {
      options: ['valid', 'invalid'],
      control: { type: 'select' },
      description: 'whether the state is `valid` or `invalid`',
    },
  },
} as Meta<typeof TextField>;

export const Primary = ({ ...props }) => (
  <Form initialValues={{}}>
    <TextField name="name" label="label" {...props} />
  </Form>
);
