import { Meta, StoryObj } from '@storybook/react';
import { CodeBlock } from './CodeBlock';

/**
 * Highlight block of code snippets.
 *
 * Reference: https://react-syntax-highlighter.github.io/react-syntax-highlighter/
 */
const meta = {
  component: CodeBlock,
} satisfies Meta<typeof CodeBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    language: 'js',
    value: `
    import React from 'react';
    import * as AspectRatio from '@radix-ui/react-aspect-ratio';
    import './styles.css';

    const AspectRatioDemo = () => (
      <div className="Container">
        <AspectRatio.Root ratio={16 / 9}>
          <img
            className="Image"
            src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80"
            alt="Landscape photograph by Tobias Tullius"
          />
        </AspectRatio.Root>
      </div>
    );

    export default AspectRatioDemo;
    `,
  },
};
