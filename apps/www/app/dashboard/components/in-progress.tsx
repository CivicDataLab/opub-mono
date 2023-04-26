'use client';

import { Icon, Text } from '@opub-cdl/ui';

import { Icons } from '@/components/icons';
import styles from '../dashboard.module.scss';

export function InProgress() {
  return (
    <div className={styles.InProgress}>
      <Icon source={Icons.package} color="base" />
      <Text variant="headingSm" color="subdued">
        This page is currently under construction.
      </Text>
    </div>
  );
}
