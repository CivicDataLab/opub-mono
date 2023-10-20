import React from 'react';
import { type TypedDocumentNode } from '@graphql-typed-document-node/core';
import { QueryClient, UseQueryResult, useQuery } from '@tanstack/react-query';
import { request } from 'graphql-request';

import { gqlConfig } from '@/config/site';

// create a wrapper function for graphql-request
// that will be used by react-query
export async function GraphQL<TResult, TVariables>(
  type: string,
  document: TypedDocumentNode<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
) {
  const data = await request(
    gqlConfig[type],
    document,
    {
      ...variables,
    },
    // { ...gqlConfig.headers }
  );
  return data;
}

// wrapper function for react-query to be used by server components
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

export function useFetch(id: string, query: string) {
  return useQuery({
    queryKey: [id],

    queryFn: async () => {
      try {
        const data = await fetch(query).then((res) => res.json());
        return data;
      } catch (error: any) {
        throw new Error(error);
      }
    },
  });
}

export async function getData(query: string) {
  const res = await fetch(query, {
    cache: 'no-cache',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export function useGraphQL<TResult, TVariables>(
  document: TypedDocumentNode<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
): UseQueryResult<TResult> {
  return useQuery([(document.definitions[0] as any).name.value, variables], async ({ queryKey }) =>
    request(
      gqlConfig.datasets,
      document,
      queryKey[1] ? queryKey[1] : undefined
    )
  )
}
