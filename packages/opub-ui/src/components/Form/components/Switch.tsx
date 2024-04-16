'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { Switch as SwitchBase, SwitchProps } from '../../Switch';

const Switch = ({ ...props }: SwitchProps) => {
  const method = useFormContext();

  if (method) {
    return (
      <Controller
        {...props}
        control={method.control}
        render={({ field }) => (
          <SwitchBase
            {...field}
            {...props}
            checked={props.checked || field.value}
            onCheckedChange={(val, name) => {
              props.onCheckedChange && props.onCheckedChange(val, name);
              field.onChange(val);
            }}
          />
        )}
      />
    );
  }

  return <SwitchBase {...props} />;
};

export { Switch };
