import * as LabelRadix from '@radix-ui/react-label';
import { LabelProps } from '@radix-ui/react-label/dist/index';
import cx from 'classnames';
import styles from './Label.module.scss';

export interface LabelInterface extends LabelProps {
  disabled?: boolean;
  error?: boolean;
  /** Visual required indicator for the label */
  requiredIndicator?: boolean;
}

export function Label({
  children,

  ...props
}: LabelInterface) {
  const {
    error = false,
    disabled = false,
    requiredIndicator,
    ...otherProps
  } = props;

  return (
    <LabelRadix.Root
      {...otherProps}
      className={cx(styles.base, {
        [styles['error']]: error,
        [styles['disabled']]: disabled,
        [styles['RequiredIndicator']]: requiredIndicator,
      })}
    >
      {children}
    </LabelRadix.Root>
  );
}
