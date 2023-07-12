import { graphql } from '@/gql';
import { Hydrate } from '@/lib';
import { dehydrate } from '@tanstack/react-query';

import { GraphQL, getQueryClient } from '@/lib/api';
import styles from '../edit.module.scss';
import { DistibutionPage } from './page-layout';

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

export default async function Page({ params }: { params: { id: string } }) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery([`dataset_distribution_${params.id}`], () =>
    GraphQL(datasetDistributionQueryDoc, {
      dataset_id: Number(params.id),
    })
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <div className={styles.EditPage}>
        <DistibutionPage params={params} />
      </div>
    </Hydrate>
  );
}
