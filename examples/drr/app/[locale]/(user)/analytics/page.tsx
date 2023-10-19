import React from 'react';
import { Hydrate, dehydrate } from '@tanstack/react-query';

import { ANALYTICS_TABLE_DATA , ANALYTICS_INDICATORS_BY_CATEGORY} from '@/config/graphql/analaytics-queries';
import { GraphQL, getQueryClient } from '@/lib/api';
import { Content } from './components/analytics-layout';

export default async function Home() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery([`district_table_data`], () =>
    GraphQL('analytics', ANALYTICS_TABLE_DATA)
  );

  await queryClient.prefetchQuery([`indicators`], () =>
  GraphQL('analytics', ANALYTICS_INDICATORS_BY_CATEGORY)
);
  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
      <Content />;
    </Hydrate>
  );
}
