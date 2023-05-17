'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { graphql } from '@/gql';
import { useQuery } from '@tanstack/react-query';

import { GraphQL } from '@/lib/api';
import { ActionBar } from '../../../components/action-bar';
import { EditMetadata } from '../components/EditMetadata';

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

export function MetadataPage({
  params,
}: {
  params: { id: string };
  query: any;
}) {
  const router = useRouter();
  const submitRef = React.useRef<HTMLButtonElement>(null);

  const { data } = useQuery([`dataset_${params.id}`], () =>
    GraphQL(datasetQueryDoc, { dataset_id: Number(params.id) })
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
