import { Box } from '../Box';
import styles from './Avatar.module.scss';
import * as AvatarRadix from '@radix-ui/react-avatar';
import cx from 'classnames';

type Props = {
  showLabel?: Boolean;
  size: 'extraSmall' | 'small' | 'medium' | 'large';
  type: 'initials' | 'showInitials';
  image?: string;
  name?: string;
};

interface stylesMap {
  [key: string]: typeof styles;
}

const variantStyles: stylesMap = {
  large: styles.AvatarLarge,
  small: styles.AvatarSmall,
  extraSmall: styles.AvatarExtraSmall,
};

const Avatar = ({ showLabel, size, type, image, name }: Props) => {
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
    size === 'medium' && type === 'showInitials' && styles.AvatarProfileMedium,
    size === 'large' && type === 'showInitials' && styles.AvatarProfileLarge,
    size === 'small' && type === 'showInitials' && styles.AvatarProfileSmall,
    size === 'extraSmall' &&
      type === 'showInitials' &&
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
      {showLabel && <Box flex>{name}</Box>}
    </Box>
  );
};

export { Avatar };
