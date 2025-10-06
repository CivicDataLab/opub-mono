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
}

export function ShimmerWrapper({
  children,
  enabled = true,
}: ShimmerWrapperProps) {
  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <div className={styles.ShimmerContainer}>
      {children}
      <motion.div
        className={styles.ShimmerOverlay}
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}
