'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import { usePRouter } from '@/hooks/use-prouter';

import { testDataset } from '@/config/dashboard';
import { InProgress } from '../../components/in-progress';
import { ActionBar } from '../components/action-bar';

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
  console.log('sdasdadqwa');

  return (
    <div className="flex h-full flex-col">
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
