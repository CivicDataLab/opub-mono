import { Content } from './components/dataset-explorer';
import { DATASET_BY_SLUG } from '@/config/graphql/dataset-queries';
import { GraphQL, getQueryClient } from '@/lib/api';
import { Hydrate, dehydrate } from '@tanstack/react-query';

export default async function DatasetExplorer({
  params,
}: {
  params: { dataset: string };
}) {

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery([`dataset_by_slug_${params.dataset}`], () =>
    GraphQL('datasets' , DATASET_BY_SLUG , { dataset_slug: params.dataset})
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Content slug={params.dataset}/>
    </Hydrate>
  )

}
