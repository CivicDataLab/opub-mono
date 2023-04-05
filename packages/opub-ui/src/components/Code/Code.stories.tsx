import { Meta } from '@storybook/react';
import { Code } from './Code';

/**
 * Code highlights short strings of code snippets inline with body text.
 *
 * Reference: https://atlassian.design/components/code/examples
 */
const meta = {
  component: Code,
} satisfies Meta<typeof Code>;

export default meta;

export const Default = () => {
  return (
    <p>
      To start creating a changeset, run <Code>yarn changeset</Code>. Then
      you'll be prompted to select packages for release.
    </p>
  );
};
