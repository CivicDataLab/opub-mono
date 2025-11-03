import { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button';
import { FormLayout } from '../FormLayout';
import { CheckboxGroup } from './CheckboxGroup';

/**
 * A Checkbox Group lets you create a list of grouped checkboxes.
 */
const meta = {
  title: 'Components/CheckboxGroup',
  component: CheckboxGroup,
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <FormLayout>
      <CheckboxGroup {...args} />
      <Button size="slim" submit>
        Submit
      </Button>
    </FormLayout>
  ),
  args: {
    title: 'Terms and Conditions',
    name: 'checkbox',
    options: [
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
    <FormLayout>
      <CheckboxGroup {...args} />
      <Button size="slim" submit>
        Submit
      </Button>
    </FormLayout>
  ),
  args: {
    ...Default.args,
    defaultValue: ['newsletter'],
    onChange(selected, name) {
      console.log(selected, name);
    },
  },
};

export const Error: Story = {
  args: {
    ...Default.args,
    error: 'It broke, lol',
  },
};
