'use client';

import { InProgress } from '../../components/in-progress';
import { ActionBar } from '../components/action-bar';
import { testDataset } from '@/config/dashboard';
import { usePRouter } from '@/hooks/use-prouter';
import { notFound } from 'next/navigation';
import React from 'react';

export default function Page({ params }: { params: { id: string } }) {
  const router = usePRouter();
  // React.useEffect(() => {
  //   router.prefetch(`/dashboard/dataset/${params.id}/edit`);
  // }, []);

  // get demo data
  const data = testDataset[params.id];
  if (!data) {
    notFound();
  }

  return (
    <div className="flex flex-col h-full">
      <ActionBar
        title={data.name}
        primaryAction={{
          content: 'Add New Dataset',
          onAction: () => router.push(`/dashboard/dataset/${params.id}/edit`),
        }}
      />
      <InProgress />
    </div>
  );
}
