'use client';

import React from 'react';
import { notFound, useRouter } from 'next/navigation';

import { testDataset } from '@/config/dashboard';
import { InProgress } from '../../components/in-progress';
import { ActionBar } from '../components/action-bar';

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
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
