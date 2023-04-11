import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Box } from '../Box';
import { Button } from '../Button';
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
      <Box
        flex
        width="90vw"
        minHeight="90vh"
        alignItems="center"
        justifyContent="center"
      >
        <Button primary onClick={() => setOpen((val) => !val)}>
          Open Sheet
        </Button>
        <Sheet onOpenChange={() => setOpen((val) => !val)} isOpen={open}>
          Sheet
        </Sheet>
      </Box>
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
      <Box
        flex
        minHeight="90vh"
        alignItems="center"
        justifyContent="center"
        gap="2"
        direction="column"
        wrap="wrap"
      >
        <Button primary onClick={() => handleOpenChange('top')}>
          From Top
        </Button>
        <Box
          flex
          gap="2"
          width="100%"
          alignItems="center"
          justifyContent="center"
        >
          <Button primary onClick={() => handleOpenChange('left')}>
            From Left
          </Button>
          <Button primary onClick={() => handleOpenChange('right')}>
            From Right
          </Button>
        </Box>

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
      </Box>
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
      <Box
        flex
        gap="2"
        minHeight="90vh"
        alignItems="center"
        justifyContent="center"
        direction="column"
        wrap="wrap"
      >
        <Button primary onClick={() => handleOpenChange('top')}>
          From Top
        </Button>
        <Box
          flex
          gap="2"
          width="100%"
          alignItems="center"
          justifyContent="center"
        >
          <Button primary onClick={() => handleOpenChange('left')}>
            From Left
          </Button>
          <Button primary onClick={() => handleOpenChange('right')}>
            From Right
          </Button>
        </Box>

        <Button primary onClick={() => handleOpenChange('bottom')}>
          From Bottom
        </Button>
        <Sheet
          onOpenChange={() => setOpen((val) => !val)}
          side={side}
          isOpen={open}
          size={size}
        >
          <Box
            flex
            gap="2"
            direction={side === 'left' || side === 'right' ? 'column' : 'row'}
            wrap="wrap"
            alignItems="center"
            justifyContent="center"
            width="100%"
            minHeight="100%"
          >
            {sizeArr.map((size: any) => (
              <Button key={size} primary onClick={() => setSize(size)}>
                {size}
              </Button>
            ))}
          </Box>
        </Sheet>
      </Box>
    );
  },
  args: {},
};
