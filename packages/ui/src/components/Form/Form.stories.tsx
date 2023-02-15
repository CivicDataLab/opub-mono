import { Meta } from '@storybook/react';
import * as yup from 'yup';
import { Button } from '../Button';
import { Flex } from '../Flex';
import { TextArea } from '../TextArea';
import { TextField } from '../TextField';
import { Form } from './Form';

const schema = yup.object().shape({
  name: yup.string().required('Name is Required'),
});

export default {
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
} as Meta<typeof Form>;

export const FormBase = {
  args: {
    children: (
      <>
        <Flex gap={16}>
          <TextField name="name" label="First Name" />
          <TextField name="lastName" label="Last Name" />
        </Flex>
        <TextArea name="desc" label="Hobbies" rows={6} fluid />
        <Button type="submit">Submit</Button>
      </>
    ),
    formSubmit(val: any) {
      console.log(val);
    },
    initialValues: { name: '', lastName: '', desc: '' },
    validationSchema: schema,
  },
};
