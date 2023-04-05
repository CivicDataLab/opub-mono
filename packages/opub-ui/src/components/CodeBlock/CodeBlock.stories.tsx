import { Meta, StoryObj } from '@storybook/react';
import { CodeBlock } from './CodeBlock';

/**
 * A code block highlights an entire block of code and keeps the formatting.
 *
 * Reference: https://atlassian.design/components/code/code-block/code
 */
const meta = {
  component: CodeBlock,
} satisfies Meta<typeof CodeBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

const exampleJsx = `import React from 'react';
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

export default AspectRatioDemo;`;

export const Default: Story = {
  args: {
    language: 'jsx',
    text: exampleJsx,
  },
};

export const Higlighted: Story = {
  args: {
    language: 'jsx',
    text: exampleJsx,
    highlight: '1-5,7,10,15-17',
  },
};

const exampleCSS = `line-height: 1;
text-align: center;
cursor: pointer;
user-select: none;
text-decoration: none;
-webkit-tap-highlight-color: transparent;

&:hover {
  background: var(--action-secondary-hovered);
  outline: var(--border-width-1) solid transparent;
}

&:focus-visible {
  box-shadow: var(--shadow-button);
  outline: 0;

  @include focus-ring($style: 'focused');
}

&:active {
  background: var(--action-secondary-pressed);
  box-shadow: var(--shadow-button);

  &::after {
    border: none;
    box-shadow: none;
  }
}`;

export const CSSExample: Story = {
  args: {
    language: 'css',
    text: exampleCSS,
  },
};

const exampleWrap = `import Message from '../../../src/packages/components/example-of-a-really-long-import-path/message'

// This is an example of a comment that is going to create a long line of code, where you may want to use the \`shouldWrapLongLines\` prop. When this prop is set to false, the CodeBlock container will scroll horizontally. When it is set to true, the CodeBlock content will wrap to the next line. As you can see from this line, the 'highlight' and 'shouldWrapLongLines' props work well in tandem.

class ExtremelyLongComponentNameThatMightNormallyForceCodeBlockToScrollHorizontally extends React.Component {
  render() {
    return (
      <Message>
        Hello world
      </Message>
    );
  }
}

ReactDOM.render(
  <ExtremelyLongComponentNameThatMightNormallyForceCodeBlockToScrollHorizontally />,
  mountNode
);`;

export const WrappedLongLines: Story = {
  args: {
    language: 'jsx',
    text: exampleWrap,
    shouldWrapLongLines: true,
  },
};
