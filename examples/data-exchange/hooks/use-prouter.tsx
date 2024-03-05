import { useRouter } from 'next/navigation';

import { navigateStart } from '@/lib/navigation';

export const usePRouter = () => {
  const router = useRouter();

  const { push } = router;

  router.push = (href, options) => {
    navigateStart();
    push(href, options);
  };

  return router;
};
