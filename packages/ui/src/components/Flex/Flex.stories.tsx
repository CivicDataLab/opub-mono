import { Meta } from '@storybook/react';
import { Flex } from './Flex';

export default {
  component: Flex,
  // argTypes: {
  //   children: {
  //     control: 'null',
  //     description: 'Children for Flex container',
  //   },
  // },
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
