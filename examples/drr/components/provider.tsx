'use client';

import { RouterEvents } from '@/lib/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NextTopLoader from 'nextjs-toploader';
import { Toaster, Tooltip } from 'opub-ui';
import React from 'react';

export default function Provider({ children }: { children: React.ReactNode }) {
  const [client] = React.useState(
    new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } })
  );

  return (
    <QueryClientProvider client={client}>
      <React.Fragment>
        <RouterEvents />
        <NextTopLoader color="var(--action-primary-success-default)" />
        <Tooltip.Provider>
          {children}
          <Toaster />
        </Tooltip.Provider>
      </React.Fragment>
    </QueryClientProvider>
  );
}
