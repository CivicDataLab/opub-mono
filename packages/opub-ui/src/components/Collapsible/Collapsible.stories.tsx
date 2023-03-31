import { Meta, StoryObj } from '@storybook/react';
import React, { useCallback, useState } from 'react';
import { Button } from '../Button';
import { Link } from '../Link';
import { Collapsible } from './Collapsible';

/**
 * Collapsible Description
 *
 * Reference: #
 */
const meta = {
  component: Collapsible,
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export function Default() {
  const [open, setOpen] = useState(false);

  const handleToggle = useCallback(() => setOpen((open) => !open), []);
  return (
    <div style={{ height: '200px' }}>
      <Button
        onClick={handleToggle}
        ariaExpanded={open}
        ariaControls="basic-collapsible"
      >
        Toggle
      </Button>
      <Collapsible
        open={open}
        id="basic-collapsible"
        transition={{
          duration: 'var(--duration-150)',
          timingFunction: 'var(--ease-in-out)',
        }}
        expandOnPrint
      >
          <p>
            Your mailing list lets you contact customers or visitors who have
            shown an interest in your store. Reach out to them with exclusive
            offers or updates about your products.
          </p>
          <Link url="#">Test link</Link>
      </Collapsible>
    </div>
  );
}
