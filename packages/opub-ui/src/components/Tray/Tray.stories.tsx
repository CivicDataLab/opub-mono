import { Button } from '../Button';
import { Tray } from './Tray';
import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

/**
 * A wrapper around Sheet that opens from the bottom.
 */
const meta = {
  component: Tray,
} satisfies Meta<typeof Tray>;

export default meta;

export const Default = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open Tray</Button>
        <Tray open={open} onOpenChange={() => setOpen(false)}>
          <div>Tray content</div>
        </Tray>
      </div>
    );
  },
};

export const WithoutOverlay = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open Tray</Button>
        <Tray open={open} onOpenChange={() => setOpen(false)} hideOverlay>
          <div>Tray content</div>
        </Tray>
      </div>
    );
  },
};

export const Sizes = {
  render: () => {
    const [openNarrow, setOpenNarrow] = React.useState(false);
    const [openMedium, setOpenMedium] = React.useState(false);
    const [openExtended, setOpenExtened] = React.useState(false);

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
        <div>
          <Button onClick={() => setOpenNarrow(true)}>Narrow</Button>
          <Tray
            size="narrow"
            open={openNarrow}
            onOpenChange={() => setOpenNarrow(false)}
            hideOverlay
          >
            <div>{text}</div>
          </Tray>
        </div>
        <div>
          <Button onClick={() => setOpenMedium(true)}>Medium</Button>
          <Tray
            size="medium"
            open={openMedium}
            onOpenChange={() => setOpenMedium(false)}
            hideOverlay
          >
            <div>{text}</div>
          </Tray>
        </div>
        <div>
          <Button onClick={() => setOpenExtened(true)}>Extended</Button>
          <Tray
            size="extended"
            open={openExtended}
            onOpenChange={() => setOpenExtened(false)}
            hideOverlay
          >
            <div>{text}</div>
          </Tray>
        </div>
      </div>
    );
  },
};
