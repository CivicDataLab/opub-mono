import React from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../Button';
import { Kbd } from '../Kbd';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './Command';

/**
 * Command menu for quick actions
 *
 * Reference: https://ui.shadcn.com/docs/components/command
 */
const meta = {
  title: 'Components/Command',
  component: Command,
} satisfies Meta<typeof Command>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    const [isMac, setIsMac] = React.useState<boolean | null>(null);

    React.useEffect(() => {
      const isMac = navigator.userAgent.indexOf('Mac') !== -1;
      setIsMac(isMac);
    }, []);

    React.useEffect(() => {
      const down = (e: KeyboardEvent) => {
        if (isMac) {
          if (e.key === 'k' && e.metaKey) {
            e.preventDefault();
            setOpen((open) => !open);
          }
        } else {
          if (e.key === 'k' && e.ctrlKey) {
            e.preventDefault();
            setOpen((open) => !open);
          }
        }
      };
      if (isMac !== null) document.addEventListener('keydown', down);
      return () => document.removeEventListener('keydown', down);
    }, [isMac]);

    return (
      <div>
        <Button
          kind="tertiary"
          variant="interactive"
          onClick={() => setOpen((e) => !e)}
          removeUnderline
        >
          Command Menu
          <span className="ml-2 inline-flex gap-1">
            <Kbd>{isMac ? 'cmd' : 'ctrl'}</Kbd>
            <Kbd>K</Kbd>
          </span>
        </Button>

        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>Calendar</CommandItem>
              <CommandItem>Search Emoji</CommandItem>
              <CommandItem>Calculator</CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </div>
    );
  },
};
