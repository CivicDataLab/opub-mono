import { cn } from '../../utils';
import styles from './Skeleton.module.scss';
import React from 'react';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(styles.Skeleton, className)} {...props} />;
}

export { Skeleton };
