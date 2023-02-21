import * as LabelRadix from '@radix-ui/react-label';
import cx from 'classnames';
import React from 'react';
import styles from './Label.module.scss';

type LabelProps = React.ComponentProps<typeof LabelRadix.Root> & {
  error?: boolean;
};

const Label = React.forwardRef<
  React.ElementRef<typeof LabelRadix.Root>,
  LabelProps
>(({ children, ...props }: LabelProps) => {
  const { error = false, ...otherProps } = props;

  return (
    <LabelRadix.Root
      {...otherProps}
      className={cx(styles.base, {
        [styles['error']]: error,
      })}
    >
      sadasd
      {children}
    </LabelRadix.Root>
  );
});

export { Label };
