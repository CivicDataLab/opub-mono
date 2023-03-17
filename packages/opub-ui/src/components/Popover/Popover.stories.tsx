import { Meta, StoryObj } from '@storybook/react';
import { ActionList } from '../ActionList';
import { Button } from '../Button';
import { Form } from '../Form';
import { Select } from '../Select';
import { TextField } from '../TextField';
import { Content, Popover, Trigger } from './Popover';

/**
 * Popovers are small overlays that open on demand
 *
 * Reference: https://www.radix-ui.com/docs/primitives/components/popover
 */
const meta = {
  component: Content,
  argTypes: {
    children: {
      control: 'null',
    },
  },
} satisfies Meta<typeof Content>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ ...args }) => {
    return (
      <Popover>
        <Trigger>
          <Button disclosure>More actions</Button>
        </Trigger>
        <Content {...args} />
      </Popover>
    );
  },
  args: {
    children: (
      <ActionList
        actionRole="menuitem"
        items={[
          { content: 'Create Organisation' },
          { content: 'Create Dataset' },
        ]}
      />
    ),
  },
};

export const WithForm: Story = {
  ...Default,
  args: {
    children: (
      <Form>
        <Select name="select" label="Show Users" options={['Tagged with']} />
        <TextField name="input" label="Tags" />
        <Button size="slim">Add filter</Button>
      </Form>
    ),
  },
};
