import NProgress from 'nprogress';

import { useIsNavigating } from '@/config/store';

export function navigateStart() {
  NProgress.start();
  useIsNavigating.getState().setIsNavigation(true);
}

export function navigateEnd() {
  NProgress.done();
  useIsNavigating.getState().setIsNavigation(false);
}
