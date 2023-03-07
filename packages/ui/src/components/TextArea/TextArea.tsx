import { InputProps } from '@ui/types/input';
import React from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { InputBase } from '../InputBase';

export interface TextAreaProps extends InputProps {
  name: string;
  onFieldChange?(e: any): void;
  height?: number;
  control?: any;
}

export const TextArea = (props: TextAreaProps) => {
  const { name, label, control, ...otherProps } = props;
  const value = useWatch({ control, name });

  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

  // 'Inspired' from react spectrum. Auto resize textarea height
  let onHeightChange = React.useCallback(() => {
    // Quiet textareas always grow based on their text content.
    // Standard textareas also grow by default, unless an explicit height is set.
    if (!props.height && textAreaRef.current) {
      let input = textAreaRef.current;
      let prevAlignment = input.style.alignSelf;
      let prevOverflow = input.style.overflow;
      // Firefox scroll position is lost when overflow: 'hidden' is applied so we skip applying it.
      // The measure/applied height is also incorrect/reset if we turn on and off
      // overflow: hidden in Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1787062
      let isFirefox = 'MozAppearance' in input.style;
      if (!isFirefox) {
        input.style.overflow = 'hidden';
      }
      input.style.alignSelf = 'start';
      input.style.height = 'auto';
      // offsetHeight - clientHeight accounts for the border/padding.
      input.style.height = `${
        input.scrollHeight + (input.offsetHeight - input.clientHeight)
      }px`;
      input.style.overflow = prevOverflow;
      input.style.alignSelf = prevAlignment;
    }
  }, [textAreaRef, props.height]);

  React.useLayoutEffect(() => {
    if (textAreaRef.current) {
      onHeightChange();
    }
  }, [onHeightChange, textAreaRef, value]);

  return (
    <>
      <Controller
        control={control}
        name={name}
        {...otherProps}
        render={({ field }) => (
          <InputBase
            as="textarea"
            label={label}
            // errorMessage={meta.touched ? meta.error : null}
            {...field}
            ref={textAreaRef}
          />
        )}
      />
    </>
  );
};
