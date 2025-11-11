import { Meta, StoryObj } from '@storybook/react-vite';
import { Drawer as DrawerPrimitive } from 'vaul';

import { Button } from '../Button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './Drawer';

/**
 * A drawer component is used to display a panel of content that slides in from the bottom of the screen.
 */
const meta = {
  title: 'Components/Drawer',
  component: DrawerContent,
} satisfies Meta<typeof DrawerContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button kind="secondary" variant="interactive">
            Open
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button kind="primary">Submit</Button>
            <DrawerClose asChild>
              <Button kind="secondary">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  },
};
