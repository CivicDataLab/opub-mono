'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { getDatasetByID } from '@/lib/api';
import { ActionBar } from '../../components/action-bar';
import { EditDataset } from './components/EditDataset';

export function EditPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const submitRef = React.useRef<HTMLButtonElement>(null);

  const { data } = useQuery([`dataset_id_${params.id}`], () =>
    getDatasetByID({
      dataset_id: Number(params.id),
    })
  );

  React.useEffect(() => {
    router.prefetch(`/dashboard/dataset/${params.id}/edit/metadata`);
  }, []);

  return (
    <>
      <ActionBar
        title={data?.dataset?.title || 'Untitled Dataset'}
        primaryAction={{
          content: 'Save & Next',
          onAction: () =>
            router.push(`/dashboard/dataset/${params.id}/edit/metadata`),
        }}
        secondaryAction={{
          content: 'Cancel',
          onAction: () => router.push('/dashboard/dataset'),
        }}
        previousPage={{
          link: `/dashboard/dataset`,
          content: 'My Datasets',
        }}
      />
      <EditDataset
        submitRef={submitRef}
        defaultVal={{
          type: 'file',
          title: data?.dataset?.title || 'Untitled Dataset',
          description: data?.dataset?.description || '',
          terms: true,
        }}
      />
    </>
  );
}
