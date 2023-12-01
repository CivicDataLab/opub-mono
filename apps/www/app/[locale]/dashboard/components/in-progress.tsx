'use client';

import { Icon, Text } from 'opub-ui';

import { Icons } from '@/components/icons';

export function InProgress() {
  return (
    <div className="flex flex-col h-full items-center justify-center gap-4">
      <Icon source={Icons.construction} size={80} />
      <Text variant="headingSm" color="subdued">
        This page is currently under construction.
      </Text>
    </div>
  );
}
