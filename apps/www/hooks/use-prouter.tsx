import { useRouter } from 'next/navigation';
import NProgress from 'nprogress';

import { shallow, useIsNavigating } from '@/config/store';

const selector = (state: {
  setIsNavigation: (isNavigating: boolean) => void;
}) => ({
  setIsNavigation: state.setIsNavigation,
});

export const usePRouter = () => {
  const { setIsNavigation } = useIsNavigating(selector, shallow);
  const router = useRouter();

  const { push } = router;

  router.push = (href, options) => {
    NProgress.start();
    setIsNavigation(true);
    push(href, options);
  };

  return router;
};
