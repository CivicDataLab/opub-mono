'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { graphql } from '@/gql';
import { ResourceInput } from '@/gql/generated/graphql';
import { useMutation, useQuery } from '@apollo/client';

// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { GraphQL } from '@/lib/api';
import { ActionBar } from '../../../components/action-bar';
import { EditDistribution } from '../components/EditDistribution';

const datasetDistributionQueryDoc = graphql(`
  query datasetDistributionQuery($dataset_id: Int) {
    dataset(dataset_id: $dataset_id) {
      id
      title
      resource_set {
        id
        title
        description
        file_details {
          resource {
            id
            title
            description
          }
          format
          file
          remote_url
          source_file_name
        }
      }
    }
  }
`);

const createResourceMutationDoc = graphql(`
  mutation createResourceMutation($resource_data: ResourceInput) {
    create_resource(resource_data: $resource_data) {
      success
      errors
      resource {
        id
        title
        description
        file_details {
          resource {
            id
            title
            description
          }
          format
          file
          remote_url
          source_file_name
        }
      }
    }
  }
`);

export function DistibutionPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const submitRef = React.useRef<HTMLButtonElement>(null);

  const { data } = useQuery(datasetDistributionQueryDoc, {
    variables: { dataset_id: Number(params.id) },
    // dataset_id: Number(params.id),
  });
  console.log(data);

  // const queryClient = useQueryClient();
  const [mutate, { loading }] = useMutation(createResourceMutationDoc);

  // React.useEffect(() => {
  //   router.prefetch(`/dashboard/dataset/${params.id}/edit/distribution`);
  // }, []);

  return (
    <>
      <ActionBar
        title={data?.dataset?.title || 'Untitled Dataset'}
        primaryAction={{
          content: 'Save Dataset',
          onAction: () => submitRef.current?.click(),
        }}
        secondaryAction={{
          content: 'Cancel',
          onAction: () => router.push('/dashboard/dataset'),
        }}
        previousPage={{
          link: `dashboard/dataset/${params.id}/edit/metadata`,
          content: 'Edit Metadata',
        }}
        isLoading={loading}
      />
      <EditDistribution
        submitRef={submitRef}
        id={params.id}
        defaultVal={{
          id: params.id,
          resources: data?.dataset?.resource_set || [],
        }}
        isLoading={loading}
        mutate={mutate}
      />
    </>
  );
}
