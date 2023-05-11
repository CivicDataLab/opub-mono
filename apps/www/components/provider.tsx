'use client';

import React from 'react';
import { Toaster, Tooltip } from '@opub-cdl/ui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NextTopLoader from 'nextjs-toploader';
import { SSRProvider } from 'react-aria';

export default function Provider({ children }: { children: React.ReactNode }) {
  const [client] = React.useState(
    new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } })
  );

  return (
    <QueryClientProvider client={client}>
      <SSRProvider>
        <NextTopLoader color="var(--icon-decorative-three)" />
        <Tooltip.Provider>
          {children}
          <Toaster />
        </Tooltip.Provider>
      </SSRProvider>
    </QueryClientProvider>
  );
}
