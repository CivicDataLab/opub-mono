import { Meta } from '@storybook/react';
import { Form } from '../Form';
import { TextField } from './TextField';

/**
 * TextFields are text inputs that allow users to input custom text entries with a keyboard. Various decorations can be displayed around the field to communicate the entry requirements.
 */
export default {
  component: TextField,
} as Meta<typeof TextField>;

export const Primary = ({ ...props }) => (
  <Form initialValues={{}}>
    <TextField name="name" label="label" {...props} />
  </Form>
);
