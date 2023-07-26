import { graphql } from '@/gql';
import { Hydrate } from '@/lib';
import { dehydrate } from '@tanstack/react-query';

import { GraphQL, getQueryClient } from '@/lib/api';
import styles from './edit.module.scss';
import { EditPage } from './page-layout';

const datasetQueryDoc = graphql(`
  query datasetEditQuery($dataset_id: Int) {
    dataset(dataset_id: $dataset_id) {
      id
      title
      description
    }
  }
`);

export default async function Page({ params }: { params: { id: string } }) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery([`dataset_${params.id}`], () =>
    GraphQL(datasetQueryDoc, {
      dataset_id: Number(params.id),
    })
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <div className={styles.EditPage}>
        <EditPage params={params} />
      </div>
    </Hydrate>
  );
}
