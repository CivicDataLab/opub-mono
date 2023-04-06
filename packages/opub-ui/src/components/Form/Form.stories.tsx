import { Meta } from '@storybook/react';
import React from 'react';
import { Button } from '../Button';
import { FormLayout } from '../FormLayout';
import { Text } from '../Text';
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

const options = [
  { label: 'Today', value: 'today' },
  { label: 'Yesterday', value: 'yesterday' },
  { label: 'Last 7 days', value: 'lastWeek' },
];

export const FormBase = () => {
  const [values, setValues] = React.useState({});
  return (
    <>
      <Form onSubmit={(e) => setValues(e)}>
        <FormLayout>
          <Form.Input name="text" label="Name" />
          <Form.Select name="select" label="Select Period" options={options} />
          <Button submit>Submit</Button>
        </FormLayout>
      </Form>
      <br />
      <Text>Output:</Text>
      <br />
      <code>{JSON.stringify(values)}</code>
    </>
  );
};
