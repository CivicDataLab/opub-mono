import * as AvatarRadix from '@radix-ui/react-avatar';

import { cn } from '../../utils';
import { Text } from '../Text';
import styles from './Avatar.module.scss';

type AvatarTone = 'highlight' | 'critical' | 'success' | 'neutral';

type Props = {
  showLabel?: boolean;
  size?: 'extraSmall' | 'small' | 'medium' | 'large';
  showInitials?: boolean;
  image?: string | null;
  name?: string | null;
  /**
   * Semantic background tone mapped to design tokens.
   * Ignored if `hexColor` is provided.
   */
  tone?: AvatarTone;
  /**
   * Explicit background color (e.g. hex). Takes precedence over `tone`.
   */
  hexColor?: string;
};

interface StylesMap {
  [key: string]: string;
}

const variantStyles: StylesMap = {
  large: styles.AvatarLarge,
  small: styles.AvatarSmall,
  extraSmall: styles.AvatarExtraSmall,
};

const toneBackgroundMap: Record<AvatarTone, string> = {
  // Same family as the current default avatar background
  highlight: 'var(--base-violet-solid-3)',
  // Use primary success / critical tokens for semantic states
  success: 'var(--base-yellow-solid-4)',
  critical: 'var(--base-red-solid-3)',
  // Neutral gray tone
  neutral: 'var(--base-gray-slate-solid-3)',
};

const DEFAULT_SIZE = 'small';

const Avatar = ({
  showLabel,
  size = DEFAULT_SIZE,
  showInitials,
  image,
  name,
  tone,
  hexColor,
}: Props) => {
  const ProfileName =
    name &&
    name
      .split(' ')
      .map((item: any) => item[0])
      .join('')
      .toUpperCase();
  const className = cn(
    styles.Avatar,
    variantStyles[size],
    size === 'medium' && showInitials && styles.AvatarProfileMedium,
    size === 'large' && showInitials && styles.AvatarProfileLarge,
    size === 'small' && showInitials && styles.AvatarProfileSmall,
    size === 'extraSmall' && showInitials && styles.AvatarProfileExtraSmall
  );

  const backgroundStyle =
    hexColor != null
      ? { backgroundColor: hexColor }
      : tone
        ? { backgroundColor: toneBackgroundMap[tone] }
        : undefined;

  return (
    <div className={styles.Wrapper}>
      <AvatarRadix.Root className={className} style={backgroundStyle}>
        {image ? (
          <AvatarRadix.Image src={image} />
        ) : (
          <AvatarRadix.Fallback>{ProfileName}</AvatarRadix.Fallback>
        )}
      </AvatarRadix.Root>
      {showLabel && <Text fontWeight="medium">{name}</Text>}
    </div>
  );
};

export { Avatar };
