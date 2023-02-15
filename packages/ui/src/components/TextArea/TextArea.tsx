import { useField } from 'formik';
import React from 'react';
import { InputBase, InputProps } from '../InputBase';

type FromikTextAreaProps = {
  name: string;
  onFieldChange?: any;
} & InputProps;

export const TextArea = ({ name, label, ...props }: FromikTextAreaProps) => {
  const [field, meta, helpers] = useField(name);

  return (
    <>
      <InputBase
        label={label}
        errorMessage={meta.touched ? meta.error : null}
        as="textarea"
        {...field}
        {...props}
      />
    </>
  );
};
