import * as LabelRadix from '@radix-ui/react-label';
import cx from 'classnames';
import React from 'react';
import styles from './Label.module.scss';

export interface LabelInterface {
  error?: boolean;
}
export type LabelProps = React.ComponentProps<typeof LabelRadix.Root> &
  LabelInterface;

export function Label({ children, ...props }: LabelProps) {
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
