import { Icon } from '../../../Icon';
import styles from './CloseButton.module.scss';
import { IconX } from '@tabler/icons-react';
import cx from 'classnames';

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
      className={cx(styles.CloseButton, titleHidden && styles.titleHidden)}
      aria-label="Close dialog"
    >
      <Icon source={IconX} color="base" />
    </button>
  );
}
