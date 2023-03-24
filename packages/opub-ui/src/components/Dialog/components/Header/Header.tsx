import { DialogClose } from '@radix-ui/react-dialog';
import { Flex } from '@ui/components/Flex';
import React from 'react';
import { Box } from '../../../Box';
import { Text } from '../../../Text';
import { CloseButton } from '../CloseButton/CloseButton';

export interface HeaderProps {
  id: string;
  titleHidden: boolean;
  children?: React.ReactNode;
  onClose?(): void;
}

export function Header({ id, children, titleHidden, onClose }: HeaderProps) {
  const titleHiddenMarkup = (
    <Box position="absolute" insetInlineEnd="0" zIndex="1">
      <Flex gap="var(--space-4)" justifyContent="end" alignItems="center">
        <CloseButton titleHidden={titleHidden} onClick={onClose} />
      </Flex>
    </Box>
  );
  if (titleHidden || !children) {
    return titleHiddenMarkup;
  }

  return (
    <Box
      paddingBlockStart="4"
      paddingBlockEnd="4"
      paddingInlineStart="5"
      paddingInlineEnd="5"
      borderBlockEnd="divider"
    >
      <Flex
        gap="var(--space-4)"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text id={id} as="h2" variant="headingLg" breakWord>
          {children}
        </Text>
        <DialogClose asChild>
          <CloseButton titleHidden={titleHidden} onClick={onClose} />
        </DialogClose>
      </Flex>
    </Box>
  );
}