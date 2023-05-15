import React from 'react';
import { QueryClient } from '@tanstack/react-query';
import { GraphQLClient } from 'graphql-request';
import { getSdk } from 'lib/graphql';

import { GRAPHQL_URL } from '@/config/site';

const gqlClient = new GraphQLClient(GRAPHQL_URL);
export const { getDatasets, getPolicy } = getSdk(gqlClient);

export const getQueryClient = React.cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnMount: false,
          refetchOnWindowFocus: false,
          refetchOnReconnect: false,
        },
      },
    })
);
