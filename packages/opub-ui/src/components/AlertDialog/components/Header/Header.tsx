import { AlertDialogCancel } from '@radix-ui/react-alert-dialog';
import { Box } from '../../../Box';
import { CloseButton } from '../../../Dialog/components';
import { Text } from '../../../Text';
import React from 'react';

export interface HeaderProps {
  id: string;
  titleHidden: boolean;
  children?: React.ReactNode;
  onClose?(): void;
}

export function Header({ id, children, titleHidden, onClose }: HeaderProps) {
  const titleHiddenMarkup = (
    <Box position="absolute" insetInlineEnd="0" zIndex="1">
      <Box flex gap="4" justifyContent="end" alignItems="center">
        <CloseButton titleHidden={titleHidden} onClick={onClose} />
      </Box>
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
      <Box flex gap="4" alignItems="center" justifyContent="space-between">
        <Text id={id} as="h2" variant="headingLg" breakWord>
          {children}
        </Text>
        <AlertDialogCancel asChild>
          <CloseButton titleHidden={titleHidden} onClick={onClose} />
        </AlertDialogCancel>
      </Box>
    </Box>
  );
}
