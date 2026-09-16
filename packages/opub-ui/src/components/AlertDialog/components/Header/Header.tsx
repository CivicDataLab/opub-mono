import React from 'react';
import { AlertDialogTitle } from '@radix-ui/react-alert-dialog';

import { cn } from '../../../../utils';
import { Text } from '../../../Text';
import styles from '../../AlertDialog.module.scss';

export interface HeaderProps {
  id: string;
  titleHidden: boolean;
  children?: React.ReactNode;
}

export function Header({ id, children, titleHidden }: HeaderProps) {
  if (!children) {
    return null;
  }

  return (
    <div className={cn(styles.Header, titleHidden && styles.titleHidden)}>
      <AlertDialogTitle asChild>
        <Text id={id} as="h2" variant="headingLg" breakWord>
          {children}
        </Text>
      </AlertDialogTitle>
    </div>
  );
}
