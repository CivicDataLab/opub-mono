import React from 'react';
import { dehydrate, Hydrate } from '@tanstack/react-query';

import {
  ANALYTICS_REVENUE_TABLE_DATA,
  ANALYTICS_TIME_PERIODS,
} from '@/config/graphql/analaytics-queries';
import { getQueryClient, GraphQL } from '@/lib/api';
import { Content } from './components/analytics-Page-layout';

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(
    [
      `revenue_table_data_${searchParams?.indicator}_${searchParams['time-period']}`,
    ],
    () =>
      GraphQL('analytics', ANALYTICS_REVENUE_TABLE_DATA, {
        indcFilter: { slug: searchParams?.indicator },
        dataFilter: { dataPeriod: searchParams['time-period'] },
      })
  );

  await queryClient.prefetchQuery([`timePeriods`], () =>
    GraphQL('analytics', ANALYTICS_TIME_PERIODS)
  );

  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
      <Content
        timePeriod={searchParams['time-period']}
        indicator={searchParams?.indicator}
      />
    </Hydrate>
  );
}
