import React from 'react';
import {
  AlertDialogAction,
  AlertDialogCancel,
} from '@radix-ui/react-alert-dialog';

import { ComplexAction } from '../../../../types/button';
import { Button } from '../../../Button';
import styles from '../../AlertDialog.module.scss';

export interface FooterProps {
  /** Primary action */
  primaryAction?: ComplexAction;
  /** Collection of secondary actions */
  secondaryActions?: ComplexAction[];
  /** Extra content to display on the leading side of the footer */
  children?: React.ReactNode;
}

function ActionButton({
  action,
  role,
}: {
  action: ComplexAction;
  role: 'action' | 'cancel';
}) {
  const { content, onAction, destructive, ...rest } = action;
  const button = (
    <Button
      kind={role === 'cancel' ? 'tertiary' : 'primary'}
      variant={destructive ? 'critical' : 'basic'}
      {...rest}
      className={role === 'cancel' ? styles.Cancel : undefined}
      onClick={onAction}
    >
      {content}
    </Button>
  );

  if (role === 'cancel') {
    return <AlertDialogCancel asChild>{button}</AlertDialogCancel>;
  }

  return <AlertDialogAction asChild>{button}</AlertDialogAction>;
}

export function Footer({
  primaryAction,
  secondaryActions,
  children,
}: FooterProps) {
  const hasActions = Boolean(primaryAction || secondaryActions?.length);

  if (!hasActions && !children) {
    return null;
  }

  return (
    <div className={styles.Footer}>
      {children ? <div className={styles.FooterContent}>{children}</div> : null}
      {hasActions ? (
        <div className={styles.Actions}>
          {secondaryActions?.map((action, index) => (
            <ActionButton
              key={action.id || `cancel-${index}`}
              action={action}
              role="cancel"
            />
          ))}
          {primaryAction ? (
            <ActionButton action={primaryAction} role="action" />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
