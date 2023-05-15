'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { getDatasetByID } from '@/lib/api';
import { ActionBar } from '../../../components/action-bar';
import { EditMetadata } from '../components/EditMetadata';

export function MetadataPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const submitRef = React.useRef<HTMLButtonElement>(null);

  const { data } = useQuery([`dataset_id_${params.id}`], () =>
    getDatasetByID({
      dataset_id: Number(params.id),
    })
  );

  React.useEffect(() => {
    router.prefetch(`/dashboard/dataset/${params.id}/edit/distribution`);
  }, []);

  return (
    <>
      <ActionBar
        title={data?.dataset?.title || 'Untitled Dataset'}
        primaryAction={{
          content: 'Save & Next',
          onAction: () => submitRef.current?.click(),
        }}
        secondaryAction={{
          content: 'Cancel',
          onAction: () => router.push('/dashboard/dataset'),
        }}
        previousPage={{
          link: `/dashboard/dataset/${params.id}/edit`,
          content: 'Edit Page',
        }}
      />
      <EditMetadata
        submitRef={submitRef}
        id={params.id}
        defaultVal={{
          source: '',
          created: '',
          frequency: '',
          tags: [],
          terms: false,
        }}
      />
    </>
  );
}
