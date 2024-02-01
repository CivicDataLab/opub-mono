'use client';

import React from 'react';
import { graphql } from '@/gql';
import { UpdateDatasetInput } from '@/gql/generated/graphql';
import { usePRouter } from '@/hooks/use-prouter';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { GraphQL } from '@/lib/api';
import { EditMetadata } from '../components/EditMetadata';

const datasetQueryDoc = graphql(`
  query datasetQuery($dataset_id: Int) {
    dataset(dataset_id: $dataset_id) {
      id
      title
      description
      source
      update_frequency
      language
      remote_issued
      geography {
        name
        id
      }
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
        geography {
          name
          id
        }
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
  const router = usePRouter();
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

  return (
    <>
      <EditMetadata
        submitRef={submitRef}
        id={params.id}
        defaultVal={{
          id: params.id,
          language: data?.dataset?.language || '',
          geo_list: data?.dataset?.geography?.map((geo) => geo.name) || [],
          update_frequency: data?.dataset?.update_frequency || '',
          tags_list: data?.dataset?.tags?.map((tag) => tag.name) || [],
          remote_issued: data?.dataset?.remote_issued || '',
          source: data?.dataset?.source || '',
          sector_list: [],
        }}
        isLoading={isLoading}
        mutate={mutate}
      />
    </>
  );
}
