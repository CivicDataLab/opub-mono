import { TextFieldProps } from '../../types/input';
import { Input } from '../Input/Input';
import React from 'react';

export type Props = TextFieldProps & {
  name: string;
};

export const TextField = React.forwardRef(
  (props: Props, ref: React.Ref<HTMLInputElement | null>) => {
    const [value, setValue] = React.useState(props.defaultValue || '');

    return (
      <Input
        {...props}
        ref={ref}
        onChange={(e) => {
          setValue(e);
          props.onChange && props.onChange(e, props.name);
        }}
        value={props.value || value}
      />
    );
  }
);
