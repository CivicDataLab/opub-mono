import { Checkbox } from '@ui/components/Checkbox';
import { ComboboxListboxOptionContext } from '@ui/components/Combobox/utils';
import cx from 'classnames';
import React, { memo, useContext, useId } from 'react';
import { ActionContext } from '../../utils';
import styles from './TextOption.scss';

export interface TextOptionProps {
  children: React.ReactNode;
  // Whether the option is selected
  selected?: boolean;
  // Whether the option is disabled
  disabled?: boolean;
}

export const TextOption = memo(function TextOption({
  children,
  selected,
  disabled,
}: TextOptionProps) {
  const { allowMultiple } = useContext(ComboboxListboxOptionContext);
  const isAction = useContext(ActionContext);
  const name = useId();

  const textOptionClassName = cx(
    styles.TextOption,
    selected && !allowMultiple && styles.selected,
    disabled && styles.disabled,
    allowMultiple && styles.allowMultiple,
    isAction && styles.isAction
  );

  return (
    <div className={textOptionClassName}>
      <div className={styles.Content}>
        {allowMultiple && !isAction ? (
          <div className={styles.Checkbox}>
            <Checkbox
              disabled={disabled}
              checked={selected}
              label={children}
              name={name}
            />
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
});
