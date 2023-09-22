'use client';

import { Icons } from '@/components/icons';
import { Icon, Text } from 'opub-ui';

export function InProgress() {
  return (
    <div className="flex flex-col h-full items-center justify-center gap-4">
      <Icon source={Icons.construction} color="base" size="20" />
      <Text variant="headingSm" color="subdued">
        This page is currently under construction.
      </Text>
    </div>
  );
}
