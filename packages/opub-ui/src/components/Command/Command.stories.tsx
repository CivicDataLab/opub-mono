import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button';
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

    React.useEffect(() => {
      const down = (e: KeyboardEvent) => {
        const isMac = navigator.userAgent.indexOf('Mac') !== -1;

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
      document.addEventListener('keydown', down);
      return () => document.removeEventListener('keydown', down);
    }, []);

    return (
      <div>
        <Button
          kind="tertiary"
          variant="interactive"
          onClick={() => setOpen((e) => !e)}
        >
          CMD + K
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
