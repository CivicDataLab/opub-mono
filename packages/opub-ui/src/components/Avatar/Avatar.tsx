import { Box } from '../Box';
import { Text } from '../Text';
import styles from './Avatar.module.scss';
import * as AvatarRadix from '@radix-ui/react-avatar';
import cx from 'classnames';

type Props = {
  showLabel?: boolean;
  size?: 'extraSmall' | 'small' | 'medium' | 'large';
  showInitials?: boolean;
  image?: string;
  name?: string;
};

interface StylesMap {
  [key: string]: string;
}

const variantStyles: StylesMap = {
  large: styles.AvatarLarge,
  small: styles.AvatarSmall,
  extraSmall: styles.AvatarExtraSmall,
};

const DEFAULT_SIZE = 'small';

const Avatar = ({
  showLabel,
  size = DEFAULT_SIZE,
  showInitials,
  image,
  name,
}: Props) => {
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
    size === 'medium' && showInitials && styles.AvatarProfileMedium,
    size === 'large' && showInitials && styles.AvatarProfileLarge,
    size === 'small' && showInitials && styles.AvatarProfileSmall,
    size === 'extraSmall' && showInitials && styles.AvatarProfileExtraSmall
  );

  return (
    <Box flex gap={'2'} justifyContent={'center'} alignItems="center">
      <AvatarRadix.Root className={className}>
        {image ? (
          <AvatarRadix.Image src={image} />
        ) : (
          <AvatarRadix.Fallback>{ProfileName}</AvatarRadix.Fallback>
        )}
      </AvatarRadix.Root>
      {showLabel && <Text fontWeight="medium">{name}</Text>}
    </Box>
  );
};

export { Avatar };
