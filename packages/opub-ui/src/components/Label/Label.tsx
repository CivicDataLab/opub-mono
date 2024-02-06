import * as LabelRadix from '@radix-ui/react-label';
import { LabelProps } from '@radix-ui/react-label/dist/index';

import { cn } from '../../utils';
import styles from './Label.module.scss';

export interface LabelInterface extends LabelProps {
  disabled?: boolean;
  error?: boolean;
  /** Visual required indicator for the label */
  requiredIndicator?: boolean;
}

export function Label({ children, ...props }: LabelInterface) {
  const {
    error = false,
    disabled = false,
    requiredIndicator,
    ...otherProps
  } = props;

  return (
    <LabelRadix.Root
      {...otherProps}
      className={cn(
        styles.base,
        error && [styles['error']],
        disabled && [styles['disabled']],
        requiredIndicator && [styles['RequiredIndicator']]
      )}
    >
      {children}
    </LabelRadix.Root>
  );
}
