'use client';

import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Toaster, Tooltip } from '@opub-cdl/ui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createUploadLink } from 'apollo-upload-client';
import NextTopLoader from 'nextjs-toploader';
import { SSRProvider } from 'react-aria';

import { gqlConfig } from '@/config/site';

export default function Provider({ children }: { children: React.ReactNode }) {
  const [client] = React.useState(
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

  const clientApollo = new ApolloClient({
    uri: gqlConfig.url,
    cache: new InMemoryCache(),
    link: createUploadLink({
      uri: gqlConfig.url,
      headers: gqlConfig.headers,
    }),
  });

  return (
    <ApolloProvider client={clientApollo}>
      <SSRProvider>
        <NextTopLoader color="var(--decorative-icon-three)" />
        <Tooltip.Provider>
          {children}
          <Toaster />
        </Tooltip.Provider>
      </SSRProvider>
    </ApolloProvider>
  );
}
