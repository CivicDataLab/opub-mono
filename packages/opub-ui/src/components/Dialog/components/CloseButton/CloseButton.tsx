import { IconX } from '@tabler/icons-react';

import { cn } from '../../../../utils';
import { Icon } from '../../../Icon';
import styles from './CloseButton.module.scss';

export interface CloseButtonProps {
  titleHidden?: boolean;
  onClick?(): void;
}

export function CloseButton({
  titleHidden = false,
  onClick,
}: CloseButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(styles.CloseButton, titleHidden && styles.titleHidden)}
      aria-label="Close dialog"
    >
      <Icon source={IconX} color="default" />
    </button>
  );
}
