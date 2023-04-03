import { Meta, StoryObj } from '@storybook/react';
import { CheckboxGroup } from './CheckboxGroup';
import { Form } from '../Form';
import { Button } from '../Button';
import React from 'react';

/**
 * A CheckboxGroup lets you create a list of grouped checkboxes.
 *
 * Reference: https://polaris.shopify.com/components/selection-and-input/choice-list
 */
const meta = {
  component: CheckboxGroup,
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Form formSubmit={(e) => console.log(e)}>
      <CheckboxGroup {...args} />
      <Button size="slim" submit>
        Submit
      </Button>
    </Form>
  ),
  args: {
    title: 'Terms and Conditions',
    name: 'checkbox',
    choices: [
      {
        label: 'I have read agreement to terms and conditions',
        value: 'terms',
        helpText: 'Reduces the number of fields required to signup.',
      },
      {
        label: 'I would like to receive weekly newsletter',
        value: 'newsletter',
      },
    ],
  },
};

export const Selected: Story = {
  render: (args) => (
    <Form
      formSubmit={(e) => console.log(e)}
      defaultValues={{ checkbox: ['terms'] }}
    >
      <CheckboxGroup {...args} />
      <Button size="slim" submit>
        Submit
      </Button>
    </Form>
  ),
  args: {
    ...Default.args,
  },
};

export const Error: Story = {
  render: (args) => (
    <Form>
      <CheckboxGroup {...args} />
    </Form>
  ),
  args: {
    ...Default.args,
    error: 'It broke, lol',
  },
};
