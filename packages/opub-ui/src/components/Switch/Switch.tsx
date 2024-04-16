import React, { forwardRef } from 'react';
import * as SwitchRadix from '@radix-ui/react-switch';

import { Label } from '../Label';
import styles from './Switch.module.scss';

export type SwitchProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  required?: boolean;
  onCheckedChange?(checked: boolean, name?: string): void;
  label?: string;
  name: string;
};

const Switch = forwardRef((props: SwitchProps, ref: any) => {
  const { label, ...others } = props;
  const id = React.useId();
  return (
    <div className={`opub-Switch ${styles.Switch}`} ref={ref}>
      <SwitchRadix.Root
        id={id}
        className={styles.SwitchRoot}
        {...others}
        onCheckedChange={(val) => {
          props.onCheckedChange && props.onCheckedChange(val, props.name);
        }}
      >
        <SwitchRadix.Thumb className={styles.SwitchThumb} />
      </SwitchRadix.Root>
      <Label htmlFor={id}>{label}</Label>
    </div>
  );
});

export { Switch };
