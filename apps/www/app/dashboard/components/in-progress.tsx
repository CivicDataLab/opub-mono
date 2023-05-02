'use client';

import { Icon, Text } from '@opub-cdl/ui';

import { Icons } from '@/components/icons';

export function InProgress() {
  return (
    <div className="flex flex-col h-full items-center justify-center gap-4">
      <Icon source={Icons.package} color="base" size="20" />
      <Text variant="headingSm" color="subdued">
        This page is currently under construction.
      </Text>
    </div>
  );
}
