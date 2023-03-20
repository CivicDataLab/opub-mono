import * as SwitchRadix from '@radix-ui/react-switch';
import React, { forwardRef } from 'react';
import { Label } from '../Label';
import styles from './Switch.module.scss';

type Props = {
  checked?: boolean;
  defaultChecked?: boolean;
  required?: boolean;
  onCheckedChange?(checked: boolean): void;
  label?: string;
};

const Switch = forwardRef((props: Props, ref: any) => {
  const { label, ...others } = props;
  const id = React.useId();
  return (
    <div className={`opub-Switch ${styles.Switch}`} ref={ref}>
      <SwitchRadix.Root
        id={id}
        className={styles.SwitchRoot}
        {...others}
        onCheckedChange={props.onCheckedChange}
      >
        <SwitchRadix.Thumb className={styles.SwitchThumb} />
      </SwitchRadix.Root>
      <Label htmlFor={id}>{label}</Label>
    </div>
  );
});

export { Switch };
