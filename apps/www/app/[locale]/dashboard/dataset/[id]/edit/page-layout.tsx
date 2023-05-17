'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { graphql } from '@/gql';
import { useQuery } from '@tanstack/react-query';

import { GraphQL } from '@/lib/api';
import { ActionBar } from '../../components/action-bar';
import { EditDataset } from './components/EditDataset';

const datasetQueryDoc = graphql(`
  query datasetQuery($dataset_id: Int) {
    dataset(dataset_id: $dataset_id) {
      id
      title
      description
      issued
      highlights
      remote_issued
      remote_modified
      period_from
      period_to
      update_frequency
      modified
      tags {
        id
        name
      }
    }
  }
`);

export function EditPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const submitRef = React.useRef<HTMLButtonElement>(null);

  const { data } = useQuery([`dataset_id_${params.id}`], () =>
    GraphQL(datasetQueryDoc, {
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
