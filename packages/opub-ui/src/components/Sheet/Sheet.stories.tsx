import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from '../Button';
import { Flex } from '../Flex';
import { Sheet } from './Sheet';

/**
 * Sheet is a panel that slides in from the side of the screen.
 */
const meta = {
  component: Sheet,
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <Flex
        width="90vw"
        height="90vh"
        alignItems="center"
        justifyContent="center"
      >
        <Button primary onClick={() => setOpen((val) => !val)}>
          Open Sheet
        </Button>
        <Sheet onOpenChange={() => setOpen((val) => !val)} isOpen={open}>
          Sheet
        </Sheet>
      </Flex>
    );
  },
  args: {},
};

export const Sides: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    const [side, setSide] = React.useState<any>('');

    React.useEffect(() => {
      if (side) setOpen((val) => !val);
    }, [side]);

    function handleOpenChange(side: string) {
      setSide(side);
    }

    return (
      <Flex
        height="90vh"
        alignItems="center"
        justifyContent="center"
        gap={8}
        direction="column"
        wrap="wrap"
      >
        <Button primary onClick={() => handleOpenChange('top')}>
          From Top
        </Button>
        <Flex width="100%" alignItems="center" justifyContent="center" gap={8}>
          <Button primary onClick={() => handleOpenChange('left')}>
            From Left
          </Button>
          <Button primary onClick={() => handleOpenChange('right')}>
            From Right
          </Button>
        </Flex>

        <Button primary onClick={() => handleOpenChange('bottom')}>
          From Bottom
        </Button>
        <Sheet
          onOpenChange={() => setOpen((val) => !val)}
          side={side}
          isOpen={open}
        >
          Sheet
        </Sheet>
      </Flex>
    );
  },
  args: {},
};

type sides = 'left' | 'right' | 'top' | 'bottom';
type sizes = 'narrow' | 'medium' | 'wide' | 'extended' | 'full';
const sizeArr = ['narrow', 'medium', 'wide', 'extended', 'full'];
export const Sizes: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    const [side, setSide] = React.useState<sides | undefined>(undefined);
    const [size, setSize] = React.useState<sizes | undefined>(undefined);

    function handleOpenChange(side: sides) {
      setSide(side);
      setOpen((val) => !val);
    }

    return (
      <Flex
        height="90vh"
        alignItems="center"
        justifyContent="center"
        gap={8}
        direction="column"
        wrap="wrap"
      >
        <Button primary onClick={() => handleOpenChange('top')}>
          From Top
        </Button>
        <Flex width="100%" alignItems="center" justifyContent="center" gap={8}>
          <Button primary onClick={() => handleOpenChange('left')}>
            From Left
          </Button>
          <Button primary onClick={() => handleOpenChange('right')}>
            From Right
          </Button>
        </Flex>

        <Button primary onClick={() => handleOpenChange('bottom')}>
          From Bottom
        </Button>
        <Sheet
          onOpenChange={() => setOpen((val) => !val)}
          side={side}
          isOpen={open}
          size={size}
        >
          <Flex
            gap={8}
            direction={side === 'left' || side === 'right' ? 'column' : 'row'}
            wrap="wrap"
            alignItems="center"
            justifyContent="center"
            width="100%"
            height="100%"
          >
            {sizeArr.map((size: any) => (
              <Button key={size} primary onClick={() => setSize(size)}>
                {size}
              </Button>
            ))}
          </Flex>
        </Sheet>
      </Flex>
    );
  },
  args: {},
};
