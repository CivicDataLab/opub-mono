'use client';

import React, { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Toaster, Tooltip } from '@opub-cdl/ui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NextTopLoader from 'nextjs-toploader';
import NProgress from 'nprogress';
import { SSRProvider } from 'react-aria';

import { shallow, useIsNavigating } from '@/config/store';

const selector = (state: {
  setIsNavigation: (isNavigating: boolean) => void;
}) => ({
  setIsNavigation: state.setIsNavigation,
});

export default function Provider({ children }: { children: React.ReactNode }) {
  const { setIsNavigation } = useIsNavigating(selector, shallow);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.done();
    setIsNavigation(false);
  }, [pathname, searchParams]);

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
