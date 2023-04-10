import { Controller, useFormContext } from 'react-hook-form';
import { CheckboxGroupProps, CheckboxProps } from '../../../types';
import { Checkbox as CheckboxBase } from '../../Checkbox';
import { CheckboxGroup as CheckboxGroupBase } from '../../CheckboxGroup';

const Checkbox = ({ ...props }: CheckboxProps) => {
  const method = useFormContext();

  if (method) {
    return (
      <Controller
        {...props}
        control={method.control}
        render={({ field }) => (
          <CheckboxBase
            {...field}
            {...props}
            checked={props.checked || field.value}
            onChange={(checked, name) => {
              props.onChange && props.onChange(checked, name);
              props.checked
                ? field.onChange(checked ? props.checked : undefined)
                : field.onChange(checked);
            }}
          />
        )}
      />
    );
  }

  return <CheckboxBase {...props} />;
};

type GroupProps = {
  name: string;
} & Omit<CheckboxGroupProps, 'name'>;

const CheckboxGroup = ({ ...props }: GroupProps) => {
  const method = useFormContext();

  if (method) {
    return (
      <Controller
        {...props}
        control={method.control}
        render={({ field }) => (
          <CheckboxGroupBase
            {...field}
            {...props}
            value={props.defaultValue || field.value || []}
            onChange={(val, name) => {
              props.onChange && props.onChange(val, name);
              field.onChange(val);
            }}
          />
        )}
      />
    );
  }

  return <CheckboxGroupBase {...props} />;
};

export { Checkbox, CheckboxGroup };
