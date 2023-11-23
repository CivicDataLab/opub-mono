import { ActionList } from '../ActionList';
import { Button } from '../Button';
import { Select } from '../Select';
import { TextField } from '../TextField';
import { Popover } from './Popover';
import { Meta, StoryObj } from '@storybook/react';

/**
 * Popovers are small overlays that open on demand
 *
 * Reference: https://www.radix-ui.com/docs/primitives/components/popover
 */
const meta = {
  title: 'Verified/Popover',
  component: Popover.Content,
  argTypes: {
    children: {
      control: 'null',
    },
  },
} satisfies Meta<typeof Popover.Content>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ ...args }) => {
    return (
      <Popover>
        <Popover.Trigger>
          <Button disclosure>More actions</Button>
        </Popover.Trigger>
        <Popover.Content {...args} />
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
      <>
        <Select name="select" label="Show Users" options={['Tagged with']} />
        <TextField name="input" label="Tags" />
        <Button size="slim">Add filter</Button>
      </>
    ),
  },
};
