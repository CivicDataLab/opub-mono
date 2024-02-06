import React from 'react';
import * as RadioRadix from '@radix-ui/react-radio-group';
import type {
  RadioGroupItemProps,
  RadioGroupProps,
} from '@radix-ui/react-radio-group';

import type { Error } from '../../types/shared/form';
import { cn } from '../../utils';
import { Choice } from '../Choice';
import { InlineMessage } from '../InlineMessage';
import { Text } from '../Text';
import styles from './RadioGroup.module.scss';

export type RadioProps = Omit<RadioGroupProps, 'onChange'> & {
  name: string;
  /** Display an error message */
  error?: Error;
  /** Toggles display of the title */
  titleHidden?: boolean;
  /** Callback when the selected choices change */
  onChange?(selected: string, name: string | undefined): void;
};
export interface RadioItemProps extends RadioGroupItemProps {
  value: string;
  /** Additional text to aide in use */
  helpText?: React.ReactNode;
  /** add classname */
  className?: string;
}

const RadioGroup = React.forwardRef(
  (
    {
      name,
      children,
      error,
      titleHidden,
      title,
      onChange,
      ...otherProps
    }: RadioProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const randomId = React.useId();
    const finalId = otherProps.id || randomId;

    const titleMarkup = title ? (
      <Text variant="bodyMd" as="legend" visuallyHidden={titleHidden}>
        {title}
      </Text>
    ) : null;

    const errorMarkup = error && (
      <div className={styles.RadioError}>
        <InlineMessage message={error} fieldID={finalId} />
      </div>
    );
    return (
      <RadioRadix.Root
        onValueChange={(value) => onChange && onChange(value, name)}
        ref={ref}
        {...otherProps}
        asChild
      >
        <fieldset className={styles.RadioGroupRoot}>
          {titleMarkup}
          {children}
          {errorMarkup}
        </fieldset>
      </RadioRadix.Root>
    );
  }
);

const RadioItem = ({ children, className, ...props }: RadioItemProps) => {
  const { helpText, value, disabled, required } = props;
  const id = React.useId();

  const inputClassName = cn(
    styles.RadioItem,
    props.disabled && styles.Disabled
  );

  const checkboxMarkup = (
    <Choice
      label={children}
      helpText={helpText}
      disabled={disabled}
      id={id}
      className={className}
    >
      <RadioRadix.Item
        id={id}
        value={value}
        className={inputClassName}
        disabled={disabled}
        required={required}
      >
        <RadioRadix.Indicator forceMount className={styles.RadioIndicator} />
      </RadioRadix.Item>
    </Choice>
  );

  return checkboxMarkup;
};

export { RadioItem, RadioGroup };
