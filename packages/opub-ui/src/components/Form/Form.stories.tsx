import { Meta } from '@storybook/react';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { CheckboxGroup } from '../CheckboxGroup';
import { Divider } from '../Divider';
import { Flex } from '../Flex';
import { RadioGroup, RadioItem } from '../RadioGroup';
import { TextField } from '../TextField';
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

export const FormBase = () => (
  <Form
    // defaultValues={{ name: '', lastName: '', desc: '' }}
    formSubmit={(e) => console.log(e)}
    // validationSchema={schema}
  >
    <Flex gap={16}>
      <TextField name="name" label="First Name" />
      <TextField name="lastName" label="Last Name" />
    </Flex>

    <TextField multiline={4} name="desc" label="Hobbies" />
    <Divider borderStyle="divider" />
    <Checkbox name="checkbox-single">Single Checkbox</Checkbox>
    <CheckboxGroup
      title="Multi Checkbox"
      name="multi-checkbox"
      choices={[
        {
          label: 'I have read agreement to terms and conditions',
          value: 'terms',
          helpText: 'Reduces the number of fields required to signup.',
        },
        {
          label: 'I would like to receive weekly newsletter',
          value: 'newsletter',
        },
      ]}
    />
    <Divider borderStyle="divider" />
    <RadioGroup name="radio-item" title="Dietary preference">
      <RadioItem value="veg">Vegetarian </RadioItem>
      <RadioItem value="non-veg">Non vegetarian egetarian </RadioItem>
    </RadioGroup>
    <Button submit>Submit</Button>
  </Form>
);
