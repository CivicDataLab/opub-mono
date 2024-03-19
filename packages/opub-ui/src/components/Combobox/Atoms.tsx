import React, { useId, useRef } from 'react';
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
  verticalContent?: React.ReactNode;

  combobox: ComboboxStore;
  open: boolean;
} & ComboboxProps;

export const Combobox = React.forwardRef<HTMLInputElement, Props>(
  (props: Props, ref) => {
    const { label, labelHidden, id, error, verticalContent, combobox, open } =
      props;
    const verticalContentRef = useRef<HTMLDivElement>(null);

    const rId = useId();
    const finalId = id || rId;

    const element = (
      <ComboboxComponent
        placeholder={props.placeholder}
        id={finalId}
        ref={ref}
        className={cn(inputStyles.Input)}
      />
    );
    const backdropMarkup = <div className={cn(inputStyles.Backdrop)} />;

    const finalContent = verticalContent ? (
      <div className={inputStyles.VerticalContent} ref={verticalContentRef}>
        {verticalContent}
        {element}
      </div>
    ) : (
      element
    );

    const textField = (
      <div className={cn(inputStyles.TextField, error && inputStyles.error)}>
        {finalContent}
        {backdropMarkup}
        <div
          className={cn(
            'pointer-events-none absolute right-0.5 top-0 z-1 flex h-full transform items-center gap-1'
          )}
        >
          <IconButton
            onClick={() => {
              if (!combobox.getState().value) {
                combobox.setSelectedValue([]);
              } else {
                combobox.setValue('');
              }
            }}
            icon={IconX}
            className="hover:bg-actionSecondaryNeutralHovered"
            size="slim"
          >
            clear selected
          </IconButton>
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
