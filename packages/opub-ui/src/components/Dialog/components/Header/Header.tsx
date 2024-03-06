import React from 'react';
import { DialogClose } from '@radix-ui/react-dialog';

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
    <div className="absolute inset-0 z-1">
      <div className="flex items-center justify-end gap-4 ">
        <CloseButton titleHidden={titleHidden} onClick={onClose} />
      </div>
    </div>
  );
  if (titleHidden || !children) {
    return titleHiddenMarkup;
  }

  return (
    <div className="border-b-1 border-solid border-borderDefault px-5 py-4">
      <div className="flex items-center justify-between gap-4">
        <Text id={id} as="h2" variant="headingLg" breakWord>
          {children}
        </Text>
        <DialogClose asChild>
          <CloseButton titleHidden={titleHidden} onClick={onClose} />
        </DialogClose>
      </div>
    </div>
  );
}
