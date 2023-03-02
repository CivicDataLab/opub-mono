import { useField } from 'formik';
import { InputBase } from '../InputBase';
import { InputProps } from '@ui/types/input';

export interface FromikTextFieldProps extends InputProps {
  name: string;
  onFieldChange?: any;
}

export const TextField = ({ name, label, ...props }: FromikTextFieldProps) => {
  const [field, meta, helpers] = useField(name);

  function handleChange(e: any) {
    props.onFieldChange && props.onFieldChange(e);
  }

  return (
    <>
      <InputBase
        label={label}
        errorMessage={meta.touched ? meta.error : null}
        {...field}
        {...props}
      />
    </>
  );
};
