import { Labelled } from '@ui/components/Labelled';
import { ComboboxSingleProps } from '@ui/types/combobox';
import { Combobox as ComboboxComponent } from 'ariakit/combobox';
import cx from 'classnames';
import React, { useId, useRef } from 'react';
import inputStyles from '../../Input/Input.module.scss';

export const Combobox = React.forwardRef<HTMLInputElement, ComboboxSingleProps>(
  (props: ComboboxSingleProps, ref) => {
    const { label, id, combobox, verticalContent, ...comboboxProps } = props;
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
      <div
        className={inputStyles.VerticalContent}
        // id={`${final}-VerticalContent`}
        ref={verticalContentRef}
        // onClick={handleClickChild}
      >
        {verticalContent}
        {element}
      </div>
    ) : (
      element
    );

    const textField = (
      <div className={cx(inputStyles.TextField)}>
        {finalContent}
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
