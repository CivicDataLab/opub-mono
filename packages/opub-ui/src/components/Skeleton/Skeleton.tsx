import { cn } from '../../utils';
import styles from './Skeleton.module.scss';
import cx from 'classnames';
import React, { forwardRef } from 'react';

type Props = {
  // children: React.ReactNode
};

// import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(styles.Skeleton, className)} {...props} />;
}

export { Skeleton };
