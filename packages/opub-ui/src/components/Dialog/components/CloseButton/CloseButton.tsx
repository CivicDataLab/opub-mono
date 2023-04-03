import { MobileCancelMajor } from '@shopify/polaris-icons';
import cx from 'classnames';
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
      className={cx(styles.CloseButton, titleHidden && styles.titleHidden)}
      aria-label="Close dialog"
    >
      <Icon source={MobileCancelMajor} color="base" />
    </button>
  );
}
