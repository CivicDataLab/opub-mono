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

export type RadioGroupVariant = 'default' | 'card';

type RadioGroupContextValue = {
  variant: RadioGroupVariant;
};

const RadioGroupContext = React.createContext<RadioGroupContextValue>({
  variant: 'default',
});

export type RadioProps = Omit<RadioGroupProps, 'onChange' | 'title'> & {
  name: string;
  /** Display an error message */
  error?: Error;
  /** Title of the radio group */
  title?: React.ReactNode;
  /** Toggles display of the title */
  titleHidden?: boolean;
  /** Visual required indicator for the title */
  requiredIndicator?: boolean;
  /**
   * Layout of the radio items.
   * `card` renders each option as a selectable card with the radio, label, and help text.
   */
  variant?: RadioGroupVariant;
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
      variant = 'default',
      requiredIndicator,
      required,
      orientation,
      ...otherProps
    }: RadioProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const randomId = React.useId();
    const finalId = otherProps.id || randomId;
    const showRequired = requiredIndicator || required;
    const isCard = variant === 'card';

    const titleMarkup = title ? (
      <Text
        variant="bodyMd"
        as="legend"
        visuallyHidden={titleHidden}
        fontWeight={isCard ? 'medium' : undefined}
        className={showRequired ? styles.RequiredIndicator : undefined}
      >
        {title}
      </Text>
    ) : null;

    const errorMarkup = error && (
      <div className={styles.RadioError}>
        <InlineMessage message={error} fieldID={finalId} />
      </div>
    );

    const itemsMarkup = isCard ? (
      <div className={styles.RadioCardGroup}>{children}</div>
    ) : (
      children
    );

    return (
      <RadioGroupContext.Provider value={{ variant }}>
        <RadioRadix.Root
          onValueChange={(value) => onChange && onChange(value, name)}
          ref={ref}
          required={required}
          orientation={orientation ?? (isCard ? 'horizontal' : 'vertical')}
          {...otherProps}
          asChild
        >
          <fieldset
            className={cn(styles.RadioGroupRoot, isCard && styles.Card)}
          >
            {titleMarkup}
            {itemsMarkup}
            {errorMarkup}
          </fieldset>
        </RadioRadix.Root>
      </RadioGroupContext.Provider>
    );
  }
);

const RadioItem = ({
  children,
  className,
  helpText,
  ...props
}: RadioItemProps) => {
  const { variant } = React.useContext(RadioGroupContext);
  const id = React.useId();
  const { disabled } = props;

  const inputClassName = cn(
    styles.RadioItem,
    props.disabled && styles.Disabled
  );

  if (variant === 'card') {
    return (
      <RadioRadix.Item
        {...props}
        id={id}
        className={cn(
          styles.RadioCard,
          disabled && styles.RadioCardDisabled,
          className
        )}
      >
        <span className={inputClassName} aria-hidden>
          <RadioRadix.Indicator
            forceMount
            className={styles.RadioIndicator}
          />
        </span>
        <span className={styles.RadioCardContent}>
          <Text
            as="span"
            variant="bodyMd"
            fontWeight="semibold"
            color={disabled ? 'disabled' : undefined}
          >
            {children}
          </Text>
          {helpText ? (
            <Text
              as="span"
              variant="bodyMd"
              color={disabled ? 'disabled' : 'subdued'}
            >
              {helpText}
            </Text>
          ) : null}
        </span>
      </RadioRadix.Item>
    );
  }

  return (
    <Choice
      label={children}
      helpText={helpText}
      disabled={disabled}
      id={id}
      className={className}
    >
      <RadioRadix.Item
        {...props}
        id={id}
        className={inputClassName}
      >
        <RadioRadix.Indicator forceMount className={styles.RadioIndicator} />
      </RadioRadix.Item>
    </Choice>
  );
};

export { RadioItem, RadioGroup };
