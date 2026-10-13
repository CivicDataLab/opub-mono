// ============================================
// FILE 1: ShimmerWrapper/ShimmerWrapper.tsx
// ============================================
import React from 'react';
import { motion } from 'framer-motion';

import styles from './ShimmerWrapper.module.scss';

export interface ShimmerWrapperProps {
  children: React.ReactNode;
  /**
   * Enable/disable shimmer animation
   * @default true
   */
  enabled?: boolean;
  /**
   * Seconds for one pass of the highlight.
   * @default 1.5
   */
  duration?: number;
  /**
   * How the highlight eases across the bar.
   * @default 'easeInOut'
   */
  ease?: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut';
}

export function ShimmerWrapper({
  children,
  enabled = true,
  duration = 1.5,
  ease = 'easeInOut',
}: ShimmerWrapperProps) {
  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <div className={styles.ShimmerContainer}>
      {children}
      <motion.div
        data-shimmer=""
        className={styles.ShimmerOverlay}
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{
          repeat: Infinity,
          duration,
          ease,
        }}
      />
    </div>
  );
}
