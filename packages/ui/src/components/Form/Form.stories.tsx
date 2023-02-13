import { ComponentMeta, ComponentStory } from '@storybook/react';
import { TextField } from '../TextField';
import * as yup from 'yup';
import { Form } from './Form';

const schema = yup.object().shape({
  name: yup.string().required('Name is Required'),
});

export default {
  title: 'Components/Form',
  component: Form,

  argTypes: {
    children: {
      control: 'text',
      description: 'description text',
    },
  },
} as ComponentMeta<typeof Form>;

const Template: ComponentStory<typeof Form> = (props) => <Form {...props} />;
export const Primary = Template.bind({});
Primary.args = {
  children: (
    <>
      <TextField name="name" label="Name" />
      <button type="submit">Submit</button>
    </>
  ),
  formSubmit(val: any) {
    console.log('eee', val);
  },
  initialValues: { name: '' },
  schema: schema,
};
