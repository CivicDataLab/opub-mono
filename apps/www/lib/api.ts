import { GraphQLClient } from 'graphql-request';
import { getSdk } from 'lib/graphql';
import { QueryClient } from 'react-query';

const gqlClient = new GraphQLClient('http://13.233.164.47/graphql');
export const { getDatasets, getDatasets2 } = getSdk(gqlClient);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});
