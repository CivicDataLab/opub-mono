'use client';

import { usePRouter } from '@/hooks/use-prouter';
import { Divider } from 'opub-ui';

import { ActionBar } from './components/action-bar';
import { Content } from './components/content';

// const allDatasetsQueryDoc = graphql(`
//   query allDatasetsQuery {
//     all_datasets {
//       id
//       title
//       description
//     }
//   }
// `);

export const Page = () => {
  // const { data } = useQuery(['all_datasets'], () =>
  //   GraphQL(allDatasetsQueryDoc)
  // );

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
      <Divider />
      <Content />
    </>
  );
};
