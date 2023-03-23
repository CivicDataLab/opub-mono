import { Labelled } from '@ui/components/Labelled';
import { ComboboxSingleProps } from '@ui/types/combobox';
import { Combobox as ComboboxComponent } from 'ariakit/combobox';
import cx from 'classnames';
import React, { useId } from 'react';
import inputStyles from '../../Input/Input.module.scss';

export const Combobox = React.forwardRef<HTMLInputElement, ComboboxSingleProps>(
  // @ts-ignore
  (props: ComboboxSingleProps, ref) => {
    const { label, id, combobox, ...comboboxProps } = props;
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

    const textField = (
      <div className={cx(inputStyles.TextField)}>
        {element}
        {backdropMarkup}
      </div>
    );

    return label ? (
      <Labelled id={finalId} label={label}>
        {textField}
      </Labelled>
    ) : (
      textField
    );
  }
);
