'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { graphql } from '@/gql';
import { PatchDatasetInput } from '@/gql/generated/graphql';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { GraphQL } from '@/lib/api';
import { ActionBar } from '../../components/action-bar';
import { EditDataset } from './components/EditDataset';

const datasetQueryDoc = graphql(`
  query datasetEditQuery($dataset_id: Int) {
    dataset(dataset_id: $dataset_id) {
      id
      title
      description
    }
  }
`);

const patchDatasetMutationDoc = graphql(`
  mutation patchDatasetMutation($dataset_data: PatchDatasetInput) {
    patch_dataset(dataset_data: $dataset_data) {
      success
      errors
      dataset {
        id
        title
        description
      }
    }
  }
`);

export function EditPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const submitRef = React.useRef<HTMLButtonElement>(null);

  const { data } = useQuery([`dataset_${params.id}`], () =>
    GraphQL(datasetQueryDoc, {
      dataset_id: Number(params.id),
    })
  );

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    (data: { dataset_data: PatchDatasetInput }) =>
      GraphQL(patchDatasetMutationDoc, data),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: [`dataset_${params.id}`] });
        router.push(
          `/dashboard/dataset/${data.patch_dataset?.dataset?.id}/edit/metadata`
        );
      },
    }
  );

  // React.useEffect(() => {
  //   router.prefetch(`/dashboard/dataset/${params.id}/edit/metadata`);
  // }, []);

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
          link: `/dashboard/dataset`,
          content: 'My Datasets',
        }}
        isLoading={isLoading}
      />
      <EditDataset
        submitRef={submitRef}
        defaultVal={{
          type: 'file',
          title: data?.dataset?.title || 'Untitled Dataset',
          description: data?.dataset?.description || '',
          terms: true,
          id: params.id,
        }}
        isLoading={isLoading}
        mutate={mutate}
      />
    </>
  );
}
