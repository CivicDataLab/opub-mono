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
} & ComboboxProps;

export const Combobox = React.forwardRef<HTMLInputElement, Props>(
  (props: Props, ref) => {
    const { label, labelHidden, id, error, verticalContent, combobox } = props;
    const verticalContentRef = useRef<HTMLDivElement>(null);

    const rId = useId();
    const finalId = id || rId;

    const element = (
      <div className="relative flex w-full">
        <ComboboxComponent
          placeholder={props.placeholder}
          id={finalId}
          ref={ref}
          className={cn(inputStyles.Input)}
        />
        <div
          className={cn(
            'pointer-events-none absolute right-1.5 top-1 z-1 flex items-center'
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
            size="slim"
          >
            clear selected
          </IconButton>
          <IconChevronDown size={24} className={inputStyles.chevronIcon} />
        </div>
      </div>
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
