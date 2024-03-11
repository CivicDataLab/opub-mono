'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import NextTopLoader from 'nextjs-toploader';
import { Toaster, Tooltip } from 'opub-ui';

import { RouterEvents } from '@/lib/navigation';

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

  return (
    <SessionProvider>
      <QueryClientProvider client={client}>
        <RouterEvents />
        <NextTopLoader color="var(--icon-success)" />
        <Tooltip.Provider>
          {children}
          <Toaster />
        </Tooltip.Provider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
