import { Meta } from '@storybook/react';
import { Button } from '../Button';
import { FormLayout } from '../FormLayout';
import { Form } from './Form';

/**
 * A wrapper component that handles the submission of forms.
 */
const meta = {
  component: Form,

  argTypes: {
    children: {
      control: 'null',
      description: 'Form Field elements',
    },
  },
} satisfies Meta<typeof Form>;
export default meta;

export const FormBase = () => (
  <Form onSubmit={(e) => console.log(e)}>
    <FormLayout>
      <Form.Input name="text" label="Text" />
      <Button submit>Submit</Button>
    </FormLayout>
  </Form>
);
