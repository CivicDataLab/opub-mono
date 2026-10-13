import React from 'react';

import { cn } from '../../utils';
import { ShimmerWrapper } from '../ShimmerWrapper';
import styles from './Skeleton.module.scss';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Enable shimmer animation
   * @default true
   */
  shimmer?: boolean;
  /**
   * Seconds for one pass of the highlight.
   * @default 1.5
   */
  shimmerDuration?: number;
  /**
   * How the highlight eases across the bar.
   * @default 'easeInOut'
   */
  shimmerEase?: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut';
}

export function Skeleton({
  className,
  shimmer = true,
  shimmerDuration,
  shimmerEase,
  ...props
}: SkeletonProps) {
  const content = <div className={cn(styles.Skeleton, className)} {...props} />;

  return shimmer ? (
    <ShimmerWrapper duration={shimmerDuration} ease={shimmerEase}>
      {content}
    </ShimmerWrapper>
  ) : (
    content
  );
}
