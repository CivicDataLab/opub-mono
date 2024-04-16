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
import { Labelled } from '../Labelled';

type Props = {
  /**
   * Whether to display the selected values.
   */
  tags?: React.ReactNode;

  combobox: ComboboxStore;
} & ComboboxProps;

export const Combobox = React.forwardRef<HTMLInputElement, Props>(
  (props: Props, ref) => {
    const { label, labelHidden, id, error, tags, combobox } = props;

    const rId = React.useId();
    const finalId = id || rId;

    const { open, selectedValue } = combobox.useState();

    const element = (
      <ComboboxComponent
        store={combobox}
        placeholder={props.placeholder}
        id={finalId}
        className={cn(inputStyles.Input)}
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
        className={cn(inputStyles.TextField, error && inputStyles.error)}
      >
        {finalContent}
        {backdropMarkup}
        <div
          className={cn(
            'absolute right-0.5 top-0 z-10 flex h-full transform items-center gap-1'
          )}
        >
          {Array.isArray(selectedValue) && selectedValue.length > 0 ? (
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
        helpText={props.helpText}
      >
        {textField}
      </Labelled>
    ) : (
      textField
    );
  }
);
