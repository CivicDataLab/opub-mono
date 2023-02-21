import { Meta } from '@storybook/react';
import { Form } from '../Form';
import { TextArea } from './TextArea';

export default {
  component: TextArea,

  argTypes: {
    children: {
      control: 'text',
      description: 'description text',
    },
  },
} as Meta<typeof TextArea>;

export const Primary = ({ ...props }) => (
  <Form initialValues={{}}>
    <TextArea name="name" label="label" rows={4} {...props} />
  </Form>
);
