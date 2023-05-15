import { Hydrate } from '@/lib';
import { dehydrate } from '@tanstack/react-query';

import { getDatasetByID, getQueryClient } from '@/lib/api';
import styles from '../edit.module.scss';
import { MetadataPage } from './page-layout';

export default async function Page({ params }: { params: { id: string } }) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery([`dataset_id_${params.id}`], () =>
    getDatasetByID({ dataset_id: Number(params.id) })
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <div className={styles.EditPage}>
        <MetadataPage params={params} />
      </div>
    </Hydrate>
  );
}
