'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { ActionBar } from './components/action-bar';
import { Content } from './components/content';

export default function DatasetPage() {
  const router = useRouter();

  React.useEffect(() => {
    router.prefetch('/dashboard/dataset/new');
  }, []);

  return (
    <div className="flex flex-col h-full">
      <ActionBar
        title="My Datasets"
        primaryAction={{
          content: 'Add New Dataset',
          onAction: () => router.push('/dashboard/dataset/new'),
        }}
      />
      <Content />
    </div>
  );
}
