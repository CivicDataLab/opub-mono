import * as RadioRadix from '@radix-ui/react-radio-group';
import cx from 'classnames';
import React from 'react';
import type { Error } from '../../types/shared/form';
import { Choice } from '../Choice';
import { InlineMessage } from '../InlineMessage';
import { Text } from '../Text';
import styles from './RadioGroup.module.scss';

type RadixProps = React.ComponentProps<typeof RadioRadix.Root> & {
  name: string;
  /** Display an error message */
  error?: Error;
  /** Toggles display of the title */
  titleHidden?: boolean;
};
interface Props extends React.ComponentProps<typeof RadioRadix.Item> {
  value: string;
  /** Additional text to aide in use */
  helpText?: React.ReactNode;
}

const RadioGroup = ({
  name,
  children,
  error,
  titleHidden,
  title,
  ...otherProps
}: RadixProps) => {
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
    <RadioRadix.Root {...otherProps} className={styles.RadioGroupRoot}>
      {titleMarkup}
      {children}
      {errorMarkup}
    </RadioRadix.Root>
  );
};

const RadioItem = ({ children, ...props }: Props) => {
  const { helpText, value, disabled, required } = props;
  const id = React.useId();

  const inputClassName = cx(
    styles.RadioItem,
    props.disabled && styles.Disabled
  );

  const checkboxMarkup = (
    <Choice label={children} helpText={helpText} disabled={disabled} id={id}>
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
