import { Meta, StoryObj } from '@storybook/react';
import { Box } from '../Box';
import { Text } from '../Text';
import { ScrollArea } from './ScrollArea';

/**
 * Augments native scroll functionality for custom, cross-browser styling.
 *
 * Reference: https://www.radix-ui.com/docs/primitives/components/scroll-area
 */
const meta = {
  component: ScrollArea,
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

const TAGS = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

export const Default: Story = {
  args: {
    children: (
      <div style={{ padding: '15px 20px', maxHeight: '400px' }}>
        <Text>Tags</Text>
        {TAGS.map((tag) => (
          <Box borderBlockStart="base" padding="2">
            <Text as="p" key={tag}>
              {tag}
            </Text>
          </Box>
        ))}
      </div>
    ),
  },
};
