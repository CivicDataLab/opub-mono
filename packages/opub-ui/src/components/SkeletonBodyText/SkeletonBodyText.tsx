import { ShimmerWrapper } from '../ShimmerWrapper';
import styles from './SkeletonBodyText.module.scss';

export interface SkeletonBodyTextProps {
  /**
   * Number of lines to display
   * @default 3
   */
  lines?: number;
  /**
   * Enable shimmer animation
   * @default true
   */
  shimmer?: boolean;
}

export function SkeletonBodyText({
  lines = 3,
  shimmer = true,
}: SkeletonBodyTextProps) {
  const bodyTextLines = [];

  for (let i = 0; i < lines; i++) {
    bodyTextLines.push(<div className={styles.SkeletonBodyText} key={i} />);
  }

  const content = <>{bodyTextLines}</>;

  return shimmer ? <ShimmerWrapper>{content}</ShimmerWrapper> : content;
}
