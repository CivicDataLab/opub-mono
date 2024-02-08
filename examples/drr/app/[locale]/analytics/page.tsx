import React from 'react';
import { type TypedDocumentNode } from '@graphql-typed-document-node/core';
import { Hydrate, dehydrate } from '@tanstack/react-query';

import {
  ANALYTICS_DISTRICT_TABLE_DATA,
  ANALYTICS_FACTORS,
  ANALYTICS_REVENUE_TABLE_DATA,
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

  const sidePaneQuery: TypedDocumentNode<any, any> =
    searchParams.boundary === 'district'
      ? ANALYTICS_DISTRICT_TABLE_DATA
      : ANALYTICS_REVENUE_TABLE_DATA;

  await queryClient.prefetchQuery(
    [`sidePaneData__${searchParams?.indicator}_${searchParams?.region}_${searchParams?.boundary}`],
    () =>
      GraphQL('analytics', sidePaneQuery, {
        indcFilter: { slug: searchParams?.indicator },
        dataFilter: { dataPeriod: searchParams['time-period'] },
        ...(searchParams?.region && {
          geoFilter: { code: [searchParams?.region] },
        }),
      })
  );

  await queryClient.prefetchQuery([`timePeriods`], () =>
    GraphQL('analytics', ANALYTICS_TIME_PERIODS)
  );

  await queryClient.prefetchQuery([`factorScores`], () =>
    GraphQL('analytics', ANALYTICS_FACTORS)
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
