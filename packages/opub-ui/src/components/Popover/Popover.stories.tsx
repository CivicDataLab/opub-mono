import { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { Content, Popover, Trigger } from './Popover';

/**
 * Popovers are small overlays that open on demand
 *
 * Reference: https://www.radix-ui.com/docs/primitives/components/popover
 */
const meta = {
  component: Content,
} satisfies Meta<typeof Content>;

export default meta;

export const Default = ({ ...args }) => {
  return (
    <Popover>
      <Trigger>
        <Button disclosure>Different channels</Button>
      </Trigger>
      <Content {...args}>
        <span>ABC</span>
      </Content>
    </Popover>
  );
};
