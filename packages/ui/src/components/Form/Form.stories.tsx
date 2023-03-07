import { Meta, StoryObj } from '@storybook/react';
import * as yup from 'yup';
import { Button } from '../Button';
import { Flex } from '../Flex';
import { TextArea } from '../TextArea';
import { TextField } from '../TextField';
import { Form } from './Form';

const schema = yup.object().shape({
  name: yup.string().required('Name is Required'),
});

/**
 * A control that allows the user to toggle between checked and not checked.
 */
const meta = {
  component: Form,

  argTypes: {
    children: {
      control: 'null',
      description: 'Form Field elements',
    },
    validationSchema: {
      control: 'null',
      description: 'Schema for validation',
    },
    formSubmit: {
      control: 'null',
      description: 'Callback function triggered when the form is submitted',
    },
  },
} satisfies Meta<typeof Form>;
export default meta;
type Story = StoryObj<typeof meta>;

export const FormBase = () => (
  <Form
    defaultValues={{ name: '', lastName: '', desc: '' }}
    formSubmit={(e) => console.log(e)}
    validationSchema={schema}
  >
    <TextField name="name" label="First Name" />
    <TextField name="lastName" label="Last Name" />

    <TextArea name="desc" label="Hobbies" rows={6} fluid />
    <Button type="submit">Submit</Button>
  </Form>
);
