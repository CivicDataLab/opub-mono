import React, { forwardRef } from 'react';
import * as AvatarRadix from '@radix-ui/react-avatar';
import styles from './Avatar.module.scss';

type Props = {
  children: React.ReactNode;
};

const Avatar = forwardRef((props: Props, ref: any) => {
  return (
    <div className={`opub-Avatar ${styles.Avatar}`} ref={ref} {...props}>
      <AvatarRadix.Root>
        <AvatarRadix.Image />
        <AvatarRadix.Fallback />
      </AvatarRadix.Root>
    </div>
  );
});

export { Avatar };
