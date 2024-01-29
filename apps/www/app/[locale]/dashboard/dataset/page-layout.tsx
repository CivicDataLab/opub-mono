'use client';

import { ActionBar } from './components/action-bar';
import { Content } from './components/content';
import { graphql } from '@/gql';
import { usePRouter } from '@/hooks/use-prouter';
import { GraphQL } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

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
  console.log(data);

  const router = usePRouter();
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
