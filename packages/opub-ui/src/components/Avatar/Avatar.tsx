import * as AvatarRadix from '@radix-ui/react-avatar';
import styles from './Avatar.module.scss';
import cx from 'classnames';
import { Box } from '../Box';

type Props = {
  label?: Boolean;
  size: string;
  type: 'initials' | 'Profile_Customer';
  image?: string;
  name?: string;
};

interface stylesMap {
  [key: string]: typeof styles;
}

const variantStyles: stylesMap = {
  Large: styles.AvatarLarge,
  Small: styles.AvatarSmall,
  ExtraSmall: styles.AvatarExtraSmall,
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
    variantStyles[size],
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
    <Box flex gap={'2'} justifyContent={'center'} alignItems="center">
      <AvatarRadix.Root className={className}>
        {image ? (
          <AvatarRadix.Image src={image}></AvatarRadix.Image>
        ) : (
          <AvatarRadix.Fallback>{ProfileName}</AvatarRadix.Fallback>
        )}
      </AvatarRadix.Root>
      {label && <Box flex>{name}</Box>}
    </Box>
  );
};

export { Avatar };
