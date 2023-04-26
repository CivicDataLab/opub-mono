'use client';

import { Toaster, Tooltip } from '@opub-cdl/ui';
import NextTopLoader from 'nextjs-toploader';
import { SSRProvider } from 'react-aria';

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SSRProvider>
      <NextTopLoader color="var(--icon-decorative-three)" />
      <Tooltip.Provider>
        {children}
        <Toaster />
      </Tooltip.Provider>
    </SSRProvider>
  );
}
