'use client';

import * as React from 'react';
import { DialogProps } from '@radix-ui/react-dialog';
import { IconSearch } from '@tabler/icons-react';
import { Command as CommandPrimitive } from 'cmdk';

import { TextfieldAllProps } from '../../types/input';
import { cn } from '../../utils';
import { Dialog } from '../Dialog';
import { Icon } from '../Icon';
import { TextField } from '../TextField';
import styles from './Command.module.scss';

const Command = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive> & { ref?: any }) => (
  <CommandPrimitive
    ref={ref}
    className={cn(styles.Command, className)}
    {...props}
  />
);
Command.displayName = CommandPrimitive.displayName;

interface CommandDialogProps extends DialogProps {}

const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <Dialog.Content
        title="command"
        headerHidden
        className={styles.CommandDialog}
      >
        <Command className={styles.CommandDialogChild}>
          {children as any}
        </Command>
      </Dialog.Content>
    </Dialog>
  );
};

const CommandInput = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input> & {
  ref?: any;
}) => (
  <div className={styles.CommandInput} cmdk-input-wrapper="">
    <Icon source={IconSearch} />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(styles.CommandInputElement, className)}
      {...props}
    />
  </div>
);

CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.List> & {
  ref?: any;
}) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn(styles.CommandList, className)}
    {...props}
  />
);

CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = ({
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty> & {
  ref?: any;
}) => (
  <CommandPrimitive.Empty
    ref={ref}
    className={styles.CommandListEmpty}
    {...props}
  />
);

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group> & {
  ref?: any;
}) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(styles.CommandGroup, className)}
    {...props}
  />
);

CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator> & {
  ref?: any;
}) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn(styles.CommandListDivider, className)}
    {...props}
  />
);
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItem = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item> & {
  ref?: any;
}) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(styles.CommandItem, className)}
    {...props}
  />
);

CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return <span className={cn(styles.CommandShortcut, className)} {...props} />;
};
CommandShortcut.displayName = 'CommandShortcut';

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
