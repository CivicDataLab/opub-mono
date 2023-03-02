import * as LabelRadix from '@radix-ui/react-label';
import { LabelProps } from '@radix-ui/react-label/dist/index';
import cx from 'classnames';
import styles from './Label.module.scss';

export interface LabelInterface extends LabelProps {
  error?: boolean;
}

export function Label({ children, ...props }: LabelInterface) {
  const { error = false, ...otherProps } = props;

  return (
    <LabelRadix.Root
      {...otherProps}
      className={cx(styles.base, {
        [styles['error']]: error,
      })}
    >
      {children}
    </LabelRadix.Root>
  );
}
