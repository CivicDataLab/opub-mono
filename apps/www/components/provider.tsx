'use client';

import React from 'react';
import { Toaster, Tooltip } from '@opub-cdl/ui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NextTopLoader from 'nextjs-toploader';
import { SSRProvider } from 'react-aria';

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
    <QueryClientProvider client={client}>
      <SSRProvider>
        <RouterEvents />
        <NextTopLoader color="var(--decorative-icon-three)" />
        <Tooltip.Provider>
          {children}
          <Toaster />
        </Tooltip.Provider>
      </SSRProvider>
    </QueryClientProvider>
  );
}
