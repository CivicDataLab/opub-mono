import React from 'react';
import { TextFieldProps } from '../../types/input';
import { Input } from '../Input';

export type Props = TextFieldProps & {
  name: string;
};

export const TextField = (props: Props) => {
  const [value, setValue] = React.useState(props.defaultValue || '');

  return (
    <Input
      {...props}
      onChange={(e, id) => {
        setValue(e);
        props.onChange && props.onChange(e, props.name);
      }}
      value={props.value || value}
    />
  );
};
