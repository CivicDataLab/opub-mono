import React from 'react';
import * as AvatarRadix from '@radix-ui/react-avatar';
import styles from './Avatar.module.scss';
import cx from 'classnames';
import { Flex } from '../Flex';

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
  const className = cx(
    styles.Avatar,
    size === 'Large' && styles.AvatarLarge,
    size === 'Small' && styles.AvatarSmall,
    size === 'ExtraSmall' && styles.AvatarExtraSmall,
    size === 'Medium' &&
      type === 'Profile_Customer' &&
      styles.AvatarProfileMedium,
    size === 'Large' &&
      type === 'Profile_Customer' &&
      styles.AvatarProfileLarge,
    size === 'Small' &&
      type === 'Profile_Customer' &&
      styles.AvatarProfileSmall,
    size === 'ExtraSmall' &&
      type === 'Profile_Customer' &&
      styles.AvatarProfileExtraSmall
  );

  return (
    <Flex gap={'8px'}>
      <AvatarRadix.Root className={className}>
        {image && <AvatarRadix.Image src={image}></AvatarRadix.Image>}
        {!image && <AvatarRadix.Fallback>{ProfileName}</AvatarRadix.Fallback>}
      </AvatarRadix.Root>
      {label && <Flex marginY={'auto'}>{name}</Flex>}
    </Flex>
  );
};

export { Avatar };
