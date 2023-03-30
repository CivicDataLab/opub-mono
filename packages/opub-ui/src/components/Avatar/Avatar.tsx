import React from 'react';
import * as AvatarRadix from '@radix-ui/react-avatar';
import styles from './Avatar.module.scss';
import cx from 'classnames';

type Props = {
  label?: Boolean;
  size: any;
  type: any;
  image?: any;
  name?: any;
};

const Avatar = ({ label, size, type, image, name }: Props) => {
  const ProfileName =
    name &&
    name
      .split(' ')
      .map((item: any) => item[0])
      .join('')
      .toUpperCase();
  const className = cx(styles.Avatar, size === 'Large' && styles.AvatarLarge);

  return (
    <>
      <AvatarRadix.Root className={className}>
        {image && <AvatarRadix.Image></AvatarRadix.Image>}
        {!image && <AvatarRadix.Fallback>{ProfileName}</AvatarRadix.Fallback>}
      </AvatarRadix.Root>
    </>
  );
};

export { Avatar };
