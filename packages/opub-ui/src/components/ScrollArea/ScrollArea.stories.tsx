import { Meta, StoryObj } from '@storybook/react-vite';

import { Text } from '../Text';
import { ScrollArea } from './ScrollArea';

/**
 * Augments native scroll functionality for custom, cross-browser styling.
 *
 * Reference: https://www.radix-ui.com/docs/primitives/components/scroll-area
 */
const meta = {
  title: 'Components/ScrollArea',
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
          <div className="border-l-1 border-solid border-borderDefault p-2">
            <Text as="p" key={tag}>
              {tag}
            </Text>
          </div>
        ))}
      </div>
    ),
  },
};
