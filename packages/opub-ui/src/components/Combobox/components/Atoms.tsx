import { ComboboxSingleProps } from '../../../types/combobox';
import inputStyles from '../../Input/Input.module.scss';
import { Labelled } from '../../Labelled';
import { Combobox as ComboboxComponent } from 'ariakit/combobox';
import cx from 'classnames';
import React, { useId, useRef } from 'react';

export const Combobox = React.forwardRef<HTMLInputElement, ComboboxSingleProps>(
  (props: ComboboxSingleProps, ref) => {
    const {
      label,
      labelHidden,
      id,
      error,
      combobox,
      verticalContent,
      ...comboboxProps
    } = props;
    const verticalContentRef = useRef<HTMLDivElement>(null);

    const rId = useId();
    const finalId = id || rId;

    const element = (
      <ComboboxComponent
        state={combobox}
        id={finalId}
        ref={ref}
        className={cx(inputStyles.Input)}
        {...comboboxProps}
      />
    );
    const backdropMarkup = <div className={cx(inputStyles.Backdrop)} />;

    const finalContent = verticalContent ? (
      <div className={inputStyles.VerticalContent} ref={verticalContentRef}>
        {verticalContent}
        {element}
      </div>
    ) : (
      element
    );

    const textField = (
      <div className={cx(inputStyles.TextField, error && inputStyles.error)}>
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
      >
        {textField}
      </Labelled>
    ) : (
      textField
    );
  }
);
