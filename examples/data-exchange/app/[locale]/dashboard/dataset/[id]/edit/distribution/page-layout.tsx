'use client';

import React from 'react';
import { graphql } from '@/gql';
// import { usePRouter } from '@/hooks/use-prouter';
import { useQuery } from '@tanstack/react-query';

import { GraphQL } from '@/lib/api';
import { DistributionList } from '../components/DistributionList';
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

export function DistibutionPage({ params }: { params: { id: string } }) {
  const [editId, setEditId] = React.useState<string | null>(null);
  const [page, setPage] = React.useState<'list' | 'create'>('list');
  // const router = usePRouter();
  const submitRef = React.useRef<HTMLButtonElement>(null);

  const { data } = useQuery([`dataset_distribution_${params.id}`], () =>
    GraphQL(datasetDistributionQueryDoc, {
      dataset_id: Number(params.id),
    })
  );

  return (
    <>
      {!editId && page === 'list' ? (
        <DistributionList setPage={setPage} setEditId={setEditId} />
      ) : (
        <EditDistribution
          setPage={setPage}
          submitRef={submitRef}
          id={params.id}
          defaultVal={{
            id: params.id,
            resources: data?.dataset?.resource_set || [],
          }}
        />
      )}
    </>
  );
}
