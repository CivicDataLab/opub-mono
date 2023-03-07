import { Meta } from '@storybook/react';
import { Form } from '../Form';
import { TextField } from './TextField';
import { Button } from '../Button';

/**
 * TextFields are text inputs that allow users to input custom text entries with a keyboard. Various decorations can be displayed around the field to communicate the entry requirements.
 */
export default {
  component: TextField,
} as Meta<typeof TextField>;

export const Default = () => (
  <Form>
    <TextField name="name" label="Text Field" />
  </Form>
);

export const WithSubmit = () => (
  <Form formSubmit={(e) => console.log(e)}>
    <TextField name="name" label="Text Field" />
    <Button submit size="slim">
      Submit
    </Button>
  </Form>
);
