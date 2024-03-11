'use client';

import { Icon, Text } from 'opub-ui';
import { twMerge } from 'tailwind-merge';

import { Icons } from '@/components/icons';
import { LinkButton } from '@/components/Link';

export function Content() {
  return (
    <div className="flex h-full w-full grow flex-col items-center justify-center">
      <div className={twMerge('h-100 flex flex-col items-center gap-4')}>
        <Icon
          source={Icons.addDataset}
          color="interactive"
          stroke={1}
          size={80}
        />
        <Text variant="headingSm" color="subdued">
          You have not added any datasets yet.
        </Text>
        <LinkButton href="/dashboard/dataset/new">Add New Dataset</LinkButton>
      </div>
    </div>
  );
}
