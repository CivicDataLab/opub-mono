import { Hydrate } from '@/lib';
import { dehydrate } from '@tanstack/react-query';

import { getPolicy, getQueryClient } from '@/lib/api';
import { Page } from './components/page-layout';

export default async function DatasetPage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['all_policies'], () => getPolicy());
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <div className="flex flex-col h-full">
        <Page />
      </div>
    </Hydrate>
  );
}
