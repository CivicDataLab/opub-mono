import { Meta, StoryObj } from '@storybook/react';
import { ChoiceList } from './ChoiceList';
import { Form } from '../Form';
import { Button } from '../Button';

/**
 * A choice list lets you create a list of grouped radio buttons or checkboxes.
 *
 * Reference: https://polaris.shopify.com/components/selection-and-input/choice-list
 */
const meta = {
  component: ChoiceList,
} satisfies Meta<typeof ChoiceList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Form formSubmit={(e) => console.log(e)}>
      <ChoiceList {...args} />
      <Button size="slim" submit>
        Submit
      </Button>
    </Form>
  ),
  args: {
    allowMultiple: true,
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
    selected: [],
  },
};

export const Selected: Story = {
  render: (args) => (
    <Form
      formSubmit={(e) => console.log(e)}
      defaultValues={{ checkbox: ['terms'] }}
    >
      <ChoiceList {...args} />
      <Button size="slim" submit>
        Submit
      </Button>
    </Form>
  ),
  args: {
    allowMultiple: true,
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
    selected: [],
  },
};

export const Error: Story = {
  render: (args) => (
    <Form>
      <ChoiceList {...args} />
    </Form>
  ),
  args: {
    ...Default.args,
    error: 'It broke, lol',
  },
};
