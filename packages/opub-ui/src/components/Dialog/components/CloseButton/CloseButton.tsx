import { CrossSize400 } from '@opub-icons/ui';
import cx from 'classnames';
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
      className={cx(styles.CloseButton, titleHidden && styles.titleHidden)}
      aria-label="Close dialog"
    >
      <CrossSize400 />
    </button>
  );
}
