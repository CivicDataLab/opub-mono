import React from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../Button';
import { Sheet } from './Sheet';

/**
 * Sheet is a panel that slides in from the side of the screen.
 */
const meta = {
  title: 'Components/Sheet',
  component: Sheet.Content,
} satisfies Meta<typeof Sheet.Content>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Sheet>
          <Sheet.Trigger>
            <Button>Open Sheet</Button>
          </Sheet.Trigger>
          <Sheet.Content>Sheet Content</Sheet.Content>
        </Sheet>
      </div>
    );
  },
  args: {},
};

export const Sides: Story = {
  render: () => {
    const [side, setSide] = React.useState<any>('');

    function handleOpenChange(side: string) {
      setSide(side);
    }

    return (
      <div className="flex h-full w-full flex-col flex-wrap items-center justify-center gap-2">
        <Sheet>
          <Sheet.Trigger>
            <Button onClick={() => handleOpenChange('top')}>From Top</Button>
          </Sheet.Trigger>
          <Sheet.Content side={side}>Sheet Content</Sheet.Content>
        </Sheet>
        <div className="flex w-full justify-center gap-2">
          <Sheet>
            <Sheet.Trigger>
              <Button onClick={() => handleOpenChange('left')}>
                From Left
              </Button>
            </Sheet.Trigger>
            <Sheet.Content side={side}>Sheet Content</Sheet.Content>
          </Sheet>
          <Sheet>
            <Sheet.Trigger>
              <Button onClick={() => handleOpenChange('right')}>
                From Right
              </Button>
            </Sheet.Trigger>
            <Sheet.Content side={side}>Sheet Content</Sheet.Content>
          </Sheet>
        </div>
        <Sheet>
          <Sheet.Trigger>
            <Button onClick={() => handleOpenChange('bottom')}>
              From Bottom
            </Button>
          </Sheet.Trigger>
          <Sheet.Content side={side}>Sheet Content</Sheet.Content>
        </Sheet>
      </div>
    );
  },
  args: {},
};

type sizes = 'narrow' | 'medium' | 'wide' | 'extended' | 'full';
const sizeArr = ['narrow', 'medium', 'wide', 'extended', 'full'];
export const Sizes: Story = {
  render: () => {
    const [size, setSize] = React.useState<sizes | undefined>(undefined);

    return (
      <div className="flex h-full w-full flex-col flex-wrap items-center justify-center">
        <Sheet>
          <Sheet.Trigger>
            <Button>Open Sheet</Button>
          </Sheet.Trigger>
          <Sheet.Content size={size}>
            <div className="flex h-full w-full items-center px-2">
              <div className="flex flex-wrap gap-2">
                {sizeArr.map((size: any) => (
                  <Button key={size} onClick={() => setSize(size)}>
                    {size}
                  </Button>
                ))}
              </div>
            </div>
          </Sheet.Content>
        </Sheet>
      </div>
    );
  },
  args: {},
};
