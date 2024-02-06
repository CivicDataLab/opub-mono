import { cn, variationName } from '../../utils/css';
import styles from './SkeletonThumbnail.module.scss';

type Size = 'extraSmall' | 'small' | 'medium' | 'large';

export interface SkeletonThumbnailProps {
  /**
   * Size of the thumbnail
   * @default 'medium'
   */
  size?: Size;
}

export function SkeletonThumbnail({ size = 'medium' }: SkeletonThumbnailProps) {
  const className = cn(
    styles.SkeletonThumbnail,
    size && styles[variationName('size', size)]
  );

  return <div className={className} />;
}
