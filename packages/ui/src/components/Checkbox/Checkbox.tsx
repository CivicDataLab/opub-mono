import { CheckmarkSize200 } from '@opub-icons/ui';
import * as CheckboxRadix from '@radix-ui/react-checkbox';
import { FieldHookConfig, useField } from 'formik';
import React from 'react';
import { Flex } from '../Flex';
import { Label } from '../Label';
import styles from './Checkbox.module.scss';
import { CheckboxProps } from '@ui/types/checkbox';

export interface CheckboxRadixProps
  extends Omit<React.ComponentProps<typeof CheckboxRadix.Root>, 'name'>,
    CheckboxProps {
  name: string | FieldHookConfig<any>;
}

const Checkbox = ({ children, name, ...props }: CheckboxRadixProps) => {
  const [field, meta, helpers] = useField(name);
  const id = React.useId();

  return (
    <Flex gap={8} alignItems="center">
      <CheckboxRadix.Root {...field} {...props} className={styles.base} id={id}>
        <CheckboxRadix.Indicator className={styles.indicator}>
          <CheckmarkSize200 />
        </CheckboxRadix.Indicator>
      </CheckboxRadix.Root>
      <Label htmlFor={id}>{children}</Label>
    </Flex>
  );
};

export { Checkbox };
