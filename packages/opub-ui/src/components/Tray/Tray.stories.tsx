import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button';
import { Tray } from './Tray';

/**
 * A wrapper around Sheet that opens from the bottom.
 */
const meta = {
  title: 'Components/Tray',
  component: Tray,
} satisfies Meta<typeof Tray>;

export default meta;

export const Default = {
  render: () => {
    return (
      <div>
        <Tray trigger={<Button>Open Tray</Button>}>
          <div>Tray content</div>
        </Tray>
      </div>
    );
  },
};

export const Sizes = {
  render: () => {
    const text = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse ab
    earum amet quisquam sint? Non alias pariatur deleniti.
    Perspiciatis, aut quasi. Fugit nostrum ratione voluptatem
    voluptatibus iusto earum debitis quis. Lorem ipsum dolor sit amet
    consectetur adipisicing elit. Esse ab earum amet quisquam sint?
    Non alias pariatur deleniti. Perspiciatis, aut quasi. Fugit
    nostrum ratione voluptatem voluptatibus iusto earum debitis quis.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse ab
    earum amet quisquam sint? Non alias pariatur deleniti.
    Perspiciatis, aut quasi. Fugit nostrum ratione voluptatem
    voluptatibus iusto earum debitis quis.
    `;
    return (
      <div style={{ display: 'flex', gap: '32px' }}>
        <Tray size="narrow" trigger={<Button>Narrow</Button>}>
          <div>{text}</div>
        </Tray>

        <Tray size="medium" trigger={<Button>Medium</Button>}>
          <div>{text}</div>
        </Tray>

        <Tray size="extended" trigger={<Button>Extended</Button>}>
          <div>{text}</div>
        </Tray>
      </div>
    );
  },
};

export const Controlled = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div style={{ display: 'flex', gap: '16px' }}>
        <Tray
          open={open}
          onOpenChange={setOpen}
          trigger={<Button onClick={() => setOpen(true)}>Open Tray</Button>}
        >
          <div>Tray content</div>
        </Tray>
        <Button onClick={() => setOpen(true)}>External Trigger</Button>
      </div>
    );
  },
};
