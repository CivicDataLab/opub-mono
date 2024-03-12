'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HolyLoader from 'holy-loader';
import { SessionProvider } from 'next-auth/react';
import { Toaster, Tooltip } from 'opub-ui';

import { RouterEvents } from '@/lib/navigation';
import SessionGuard from './SessionGuard';

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
      <SessionGuard>
        <QueryClientProvider client={client}>
          <RouterEvents />
          <HolyLoader color="var(--action-primary-success-default)" />
          <Tooltip.Provider>
            {children}
            <Toaster />
          </Tooltip.Provider>
        </QueryClientProvider>
      </SessionGuard>
    </SessionProvider>
  );
}
