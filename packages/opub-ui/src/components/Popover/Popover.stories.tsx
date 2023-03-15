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

export const Default = () => {
  return (
    <Popover>
      <Trigger>
        <Button>trigger</Button>
      </Trigger>
      <Content>
        <span>ABC</span>
      </Content>
    </Popover>
  );
};
