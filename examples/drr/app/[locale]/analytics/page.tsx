import React from 'react';
import { dehydrate, Hydrate } from '@tanstack/react-query';

import {
  ANALYTICS_FACTORS,
  ANALYTICS_TIME_PERIODS,
  ANALYTICS_INDICATORS
} from '@/config/graphql/analaytics-queries';
import { getQueryClient, GraphQL } from '@/lib/api';
import { Content } from './components/analytics-layout';

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery([`timePeriods`], () =>
    GraphQL('analytics', ANALYTICS_TIME_PERIODS)
  );

  await queryClient.prefetchQuery([`factorScores`], () =>
    GraphQL('analytics', ANALYTICS_FACTORS)
  );

  await queryClient.prefetchQuery([`indicators_${searchParams?.['indicator']}`], () =>
  GraphQL('analytics', ANALYTICS_INDICATORS , {indcFilter : {slug : searchParams?.['indicator']}})
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
