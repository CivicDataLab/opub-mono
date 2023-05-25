'use client';

import React, { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Toaster, Tooltip } from '@opub-cdl/ui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NextTopLoader from 'nextjs-toploader';
import NProgress from 'nprogress';
import { SSRProvider } from 'react-aria';

export default function Provider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.done();
  }, [pathname]);

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
        <NextTopLoader color="var(--decorative-icon-three)" />
        <Tooltip.Provider>
          {children}
          <Toaster />
        </Tooltip.Provider>
      </SSRProvider>
    </QueryClientProvider>
  );
}
