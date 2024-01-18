import { ComboboxProps } from "../../types/combobox";
import inputStyles from "../Input/Input.module.scss";
import { Labelled } from "../Labelled";
import { Combobox as ComboboxComponent } from "@ariakit/react";
import cx from "classnames";
import React, { useId, useRef } from "react";

type Props = {
  /**
   * Whether to display the selected values.
   */
  verticalContent?: React.ReactNode;
} & ComboboxProps;

export const Combobox = React.forwardRef<HTMLInputElement, Props>(
  (props: Props, ref) => {
    const { label, labelHidden, id, error, verticalContent } = props;
    const verticalContentRef = useRef<HTMLDivElement>(null);

    const rId = useId();
    const finalId = id || rId;

    const element = (
      <ComboboxComponent
        placeholder={props.placeholder}
        id={finalId}
        ref={ref}
        className={cx(inputStyles.Input)}
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
        helpText={props.helpText}
      >
        {textField}
      </Labelled>
    ) : (
      textField
    );
  }
);
