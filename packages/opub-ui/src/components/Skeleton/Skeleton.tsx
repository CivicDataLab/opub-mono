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
}

export function Skeleton({
  className,
  shimmer = true,
  ...props
}: SkeletonProps) {
  const content = <div className={cn(styles.Skeleton, className)} {...props} />;

  return shimmer ? <ShimmerWrapper>{content}</ShimmerWrapper> : content;
}
