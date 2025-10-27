import { cn, variationName } from '../../utils/css';
import { ShimmerWrapper } from '../ShimmerWrapper';
import styles from './SkeletonThumbnail.module.scss';

type Size = 'extraSmall' | 'small' | 'medium' | 'large';

export interface SkeletonThumbnailProps {
  /**
   * Size of the thumbnail
   * @default 'medium'
   */
  size?: Size;
  /**
   * Enable shimmer animation
   * @default true
   */
  shimmer?: boolean;
}

export function SkeletonThumbnail({
  size = 'medium',
  shimmer = true,
}: SkeletonThumbnailProps) {
  const className = cn(
    styles.SkeletonThumbnail,
    size && styles[variationName('size', size)]
  );
  const content = <div className={className} />;

  return shimmer ? <ShimmerWrapper>{content}</ShimmerWrapper> : content;
}
