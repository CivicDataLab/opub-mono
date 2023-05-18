'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { graphql } from '@/gql';
import { useQuery } from '@tanstack/react-query';

import { GraphQL } from '@/lib/api';
import { ActionBar } from './action-bar';
import { Content } from './content';

const allDatasetsQueryDoc = graphql(`
  query allDatasetsQuery {
    all_datasets {
      id
      title
      description
    }
  }
`);

export const Page = () => {
  const { data } = useQuery(['all_datasets'], () =>
    GraphQL(allDatasetsQueryDoc)
  );

  const router = useRouter();
  // React.useEffect(() => {
  //   router.prefetch('/dashboard/dataset/new');
  // }, []);

  return (
    <>
      <ActionBar
        title="My Datasets"
        preFetch="/dashboard/dataset/new"
        primaryAction={{
          content: 'Add New Dataset',
          onAction: () => router.push('/dashboard/dataset/new'),
        }}
      />
      <Content />
    </>
  );
};
