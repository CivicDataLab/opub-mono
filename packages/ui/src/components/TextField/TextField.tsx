import { useField } from 'formik';
import { InputBase, InputProps } from '../InputBase';

type FromikTextFieldProps = {
  name: string;
  onFieldChange?: any;
} & InputProps;

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
