import { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button';
import { Dialog } from './Dialog';

/**
 * A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.
 *
 * Reference: https://www.radix-ui.com/docs/primitives/components/dialog
 */
const meta = {
  title: 'Components/Dialog',
  component: Dialog.Content,
} satisfies Meta<typeof Dialog.Content>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ ...args }) => {
    return (
      <Dialog>
        <Dialog.Trigger>
          <Button>Open Dialog</Button>
        </Dialog.Trigger>
        <Dialog.Content {...args} />
      </Dialog>
    );
  },
  args: {
    title: 'Dialog Title',
    children: 'Make changes to your profile here. Click save when youre done.',
    primaryAction: {
      content: 'Add Instagram',
      onAction: () => console.log('Add Instagram'),
    },
    secondaryActions: [
      {
        content: 'Learn more',
        onAction: () => console.log('Learn more'),
      },
    ],
  },
};

export const Large: Story = {
  ...Default,
  args: {
    title: 'Dialog Title',
    children: 'Make changes to your profile here. Click save when youre done.',
    primaryAction: {
      content: 'Add Instagram',
      onAction: () => console.log('Add Instagram'),
    },
    large: true,
  },
};

export const Small: Story = {
  ...Default,
  args: {
    title: 'Dialog Title',
    children: 'Make changes to your profile here. Click save when youre done.',
    primaryAction: {
      content: 'Add Instagram',
      onAction: () => console.log('Add Instagram'),
    },
    small: true,
  },
};

export const LimitHeight: Story = {
  ...Default,
  args: {
    title: 'Dialog Title',
    children: (
      <p>
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
        dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum
        dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
        ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit
        amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
        ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit
        amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
        ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit
        amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
        ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit
        amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
        ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit
        amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
        ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit
        amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit.'
      </p>
    ),

    primaryAction: {
      content: 'Add Instagram',
      onAction: () => console.log('Add Instagram'),
    },
    limitHeight: true,
  },
};

export const Fullscreen: Story = {
  ...Default,
  args: {
    title: 'Dialog Title',
    children:
      'This modal will take up the full height of the viewport on small screens',
    primaryAction: {
      content: 'Add Instagram',
      onAction: () => console.log('Add Instagram'),
    },
    fullScreen: true,
  },
};
