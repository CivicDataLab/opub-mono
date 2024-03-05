'use client';

import { Icon, Text } from 'opub-ui';

import { Icons } from '@/components/icons';

export function InProgress() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <Icon source={Icons.construction} size={80} />
      <Text variant="headingSm" color="subdued">
        This page is currently under construction.
      </Text>
    </div>
  );
}
