import { Page } from './page-layout';
import { graphql } from '@/gql';
import { Hydrate } from '@/lib';
import { GraphQL, getQueryClient } from '@/lib/api';
import { dehydrate } from '@tanstack/react-query';

const allDatasetsQueryDoc = graphql(`
  query allDatasetsQuery {
    all_datasets {
      id
      title
      description
    }
  }
`);

export default async function DatasetPage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['all_datasets'], () =>
    GraphQL(allDatasetsQueryDoc)
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <div className="flex flex-col h-full">
        <Page />
      </div>
    </Hydrate>
  );
}
