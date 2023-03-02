import { Meta } from '@storybook/react';
import { Flex } from './Flex';

/**
 * A control that allows the user to toggle between checked and not checked.
 *
 * Reference: https://react-spectrum.adobe.com/react-spectrum/Flex.html
 */
export default {
  component: Flex,
} as Meta<typeof Flex>;

export const Primary = {
  args: {
    wrap: 'wrap',
    gap: 12,

    children: (
      <>
        <div
          style={{
            backgroundColor: 'var(--decorative-surface-one)',
            width: '150px',
            height: '150px',
          }}
        />
        <div
          style={{
            backgroundColor: 'var(--decorative-surface-three)',
            width: '150px',
            height: '150px',
          }}
        />
      </>
    ),
  },
};
