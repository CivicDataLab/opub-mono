import { Checkmark, Export, Import } from '@opub-icons/workflow';
import { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { Content, Popover, Trigger } from '../Popover';
import { ActionList } from './ActionList';

/**
 * Action lists render a list of actions or selectable options. This component is usually placed inside a popover container to create a dropdown menu
 *
 * Reference: https://polaris.shopify.com/components/lists/action-list
 */
const meta = {
  component: ActionList,
} satisfies Meta<typeof ActionList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ ...args }) => {
    return (
      <Popover>
        <Trigger>
          <Button disclosure>More actions</Button>
        </Trigger>
        <Content>
          <ActionList {...args} />
        </Content>
      </Popover>
    );
  },
  args: {
    actionRole: 'menuitem',
    items: [{ content: 'Create Organisation' }, { content: 'Create Dataset' }],
  },
};
