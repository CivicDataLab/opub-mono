import { cn } from '../../utils';
import { ShimmerWrapper } from '../ShimmerWrapper';
import { SkeletonBodyText } from '../SkeletonBodyText';
import styles from './SkeletonTabs.module.scss';

export interface SkeletonTabsProps {
  count?: number;
  /**
   * Enable shimmer animation
   * @default true
   */
  shimmer?: boolean;
}

export function SkeletonTabs({ count = 2, shimmer = true }: SkeletonTabsProps) {
  const content = (
    <div className={styles.Tabs}>
      {[...Array(count).keys()].map((key) => {
        const tabWidthClassName =
          key % 2 === 0 ? styles['Tab-short'] : styles['Tab-long'];

        return (
          <div key={key} className={cn(styles.Tab, tabWidthClassName)}>
            <SkeletonBodyText lines={1} shimmer={false} />
          </div>
        );
      })}
    </div>
  );
  return shimmer ? <ShimmerWrapper>{content}</ShimmerWrapper> : content;
}
