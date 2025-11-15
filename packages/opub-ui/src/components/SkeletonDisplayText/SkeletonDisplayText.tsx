import { cn, variationName } from '../../utils/css';
import { ShimmerWrapper } from '../ShimmerWrapper';
import styles from './SkeletonDisplayText.module.scss';

type Size = 'small' | 'medium' | 'large' | 'extraLarge';

export interface SkeletonDisplayTextProps {
  /**
   * Size of the text
   * @default 'medium'
   */
  size?: Size;
  /**
   * Enable shimmer animation
   * @default true
   */
  shimmer?: boolean;
}

export function SkeletonDisplayText({
  size = 'medium',
  shimmer = true,
}: SkeletonDisplayTextProps) {
  const className = cn(
    styles.DisplayText,
    size && styles[variationName('size', size)]
  );

  const content = <div className={className} />;

  return shimmer ? <ShimmerWrapper>{content}</ShimmerWrapper> : content;
}
