import React from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';

import { useIsNavigating } from '@/config/store';

export function navigateStart() {
  NProgress.start();
}

export function navigateEnd() {
  NProgress.done();
  useIsNavigating.getState().setIsNavigation(false);
}

export function loadingStart() {
  useIsNavigating.getState().setIsNavigation(true);
}

function useOnComplete() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  React.useEffect(() => navigateEnd(), [pathname, searchParams]);
}

function __RouterEvents() {
  useOnComplete();
  return null;
}

// https://github.com/joulev/nextjs13-appdir-router-events/blob/52e3457f183b0b638cd14c6c0e8c138e71a76895/app/router-events.tsx
export function RouterEvents() {
  return (
    <React.Suspense>
      <__RouterEvents />
    </React.Suspense>
  );
}
