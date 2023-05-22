'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { graphql } from '@/gql';
import { UpdateDatasetInput } from '@/gql/generated/graphql';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { GraphQL } from '@/lib/api';
import { ActionBar } from '../../../components/action-bar';
import { EditMetadata } from '../components/EditMetadata';

const datasetQueryDoc = graphql(`
  query datasetQuery($dataset_id: Int) {
    dataset(dataset_id: $dataset_id) {
      id
      title
      description
      source
      update_frequency
      remote_issued
      tags {
        id
        name
      }
    }
  }
`);

const updateDatasetMutationDoc = graphql(`
  mutation updateDatasetMutation($dataset_data: UpdateDatasetInput) {
    update_dataset(dataset_data: $dataset_data) {
      success
      errors
      dataset {
        id
        title
        description
        remote_issued
        update_frequency
        source
        tags {
          id
          name
        }
      }
    }
  }
`);

export function MetadataPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const submitRef = React.useRef<HTMLButtonElement>(null);

  const { data } = useQuery([`dataset_meta_${params.id}`], () =>
    GraphQL(datasetQueryDoc, { dataset_id: Number(params.id) })
  );

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    (data: { dataset_data: UpdateDatasetInput }) =>
      GraphQL(updateDatasetMutationDoc, data),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: [`dataset_meta_${params.id}`],
        });
        router.push(
          `/dashboard/dataset/${data.update_dataset?.dataset?.id}/edit/distribution`
        );
      },
    }
  );

  // React.useEffect(() => {
  //   router.prefetch(`/dashboard/dataset/${params.id}/edit/distribution`);
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
          link: `/dashboard/dataset/${params.id}/edit`,
          content: 'Edit Page',
        }}
        isLoading={isLoading}
      />
      <EditMetadata
        submitRef={submitRef}
        id={params.id}
        defaultVal={{
          id: params.id,
          source: data?.dataset?.source || '',
          remote_issued: data?.dataset?.remote_issued || '',
          update_frequency: data?.dataset?.update_frequency || '',
          tags_list: data?.dataset?.tags?.map((tag) => tag.name) || [],
        }}
        isLoading={isLoading}
        mutate={mutate}
      />
    </>
  );
}
