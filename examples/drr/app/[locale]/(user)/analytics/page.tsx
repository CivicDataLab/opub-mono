import React from 'react';
import { Hydrate, dehydrate } from '@tanstack/react-query';

import {
  ANALYTICS_INDICATORS_BY_CATEGORY,
  ANALYTICS_REVENUE_TABLE_DATA,
  ANALYTICS_TABLE_DATA,
  ANALYTICS_TIME_PERIODS,
} from '@/config/graphql/analaytics-queries';
import { GraphQL, getQueryClient } from '@/lib/api';
import { Content } from './components/analytics-layout';

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    [`district_table_data_${searchParams?.indicator}`],
    () =>
      GraphQL('analytics', ANALYTICS_TABLE_DATA, {
        indcFilter: { slug: searchParams?.indicator },
        dataFilter: { dataPeriod: searchParams['time-period'] },
      })
  );

  await queryClient.prefetchQuery(
    [`revenue_table_data_${searchParams?.indicator}_${searchParams['time-period']}`],
    () =>
      GraphQL('analytics', ANALYTICS_REVENUE_TABLE_DATA, {
        indcFilter: { slug: searchParams?.indicator },
        dataFilter: { dataPeriod: searchParams['time-period'] },
      })
  );

  await queryClient.prefetchQuery([`indicatorsByCategory`], () =>
    GraphQL('analytics', ANALYTICS_INDICATORS_BY_CATEGORY)
  );

  await queryClient.prefetchQuery([`timePeriods`], () =>
    GraphQL('analytics', ANALYTICS_TIME_PERIODS)
  );

  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
      <Content
        subIndicator={searchParams['sub-indicator']}
        timePeriod={searchParams['time-period']}
        indicator={searchParams?.indicator}
      />
    </Hydrate>
  );
}
