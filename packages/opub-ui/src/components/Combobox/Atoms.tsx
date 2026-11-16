import React from 'react';
import {
  Combobox as ComboboxComponent,
  type ComboboxStore,
} from '@ariakit/react';
import { IconChevronDown, IconX } from '@tabler/icons-react';

import { ComboboxProps } from '../../types/combobox';
import { cn } from '../../utils';
import { IconButton } from '../IconButton';
import inputStyles from '../Input/Input.module.scss';
import { errorID, helpTextID, Labelled } from '../Labelled';
import styles from './Combobox.module.scss';

type Props = {
  /**
   * Whether to display the selected values.
   */
  tags?: React.ReactNode;

  combobox: ComboboxStore;
} & ComboboxProps;

export const Combobox = React.forwardRef<HTMLInputElement, Props>(
  (props: Props, ref) => {
    const {
      label,
      labelHidden,
      id,
      error,
      tags,
      combobox,
      requiredIndicator,
    } = props;

    const rId = React.useId();
    const finalId = id || rId;

    const { open, selectedValue } = combobox.useState();

    const describedBy: string[] = [];
    if (error) {
      describedBy.push(errorID(finalId));
    }
    if (props.helpText) {
      describedBy.push(helpTextID(finalId));
    }

    const element = (
      <ComboboxComponent
        store={combobox}
        placeholder={props.placeholder}
        id={finalId}
        className={cn(inputStyles.Input)}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          describedBy.length ? describedBy.join(' ') : undefined
        }
      />
    );
    const backdropMarkup = <div className={cn(inputStyles.Backdrop)} />;

    const finalContent = tags ? (
      <div className={inputStyles.tags}>
        {tags}
        {element}
      </div>
    ) : (
      element
    );

    const textField = (
      <div
        ref={ref}
        className={cn(
          inputStyles.TextField,
          styles.Field,
          error && inputStyles.error
        )}
      >
        {finalContent}
        {backdropMarkup}
        <div className={styles.Actions}>
          {(Array.isArray(selectedValue)
            ? selectedValue.length > 0
            : Boolean(selectedValue)) ? (
            <IconButton
              onClick={() => {
                const isArray = Array.isArray(selectedValue);

                combobox.setSelectedValue(isArray ? [] : '');
                combobox.setValue('');
              }}
              icon={IconX}
              className="hover:bg-actionSecondaryNeutralHovered"
              size="slim"
            >
              clear selected
            </IconButton>
          ) : null}
          <IconButton
            onClick={() => {
              combobox.toggle();
            }}
            icon={IconChevronDown}
            className={cn(
              inputStyles.chevronIcon,
              'hover:bg-actionSecondaryNeutralHovered'
            )}
            data-opened={open}
            size="slim"
          >
            {open ? 'close' : 'open'} combobox
          </IconButton>
        </div>
      </div>
    );

    return label ? (
      <Labelled
        error={error}
        id={finalId}
        label={label}
        labelHidden={labelHidden}
        requiredIndicator={requiredIndicator}
        helpText={props.helpText}
      >
        {textField}
      </Labelled>
    ) : (
      textField
    );
  }
);
