import { navigateStart } from '@/lib/navigation';
import { useRouter } from 'next/navigation';

export const usePRouter = () => {
  const router = useRouter();

  const { push, replace } = router;

  router.replace = (href, options) => {
    navigateStart();
    replace(href, options);
  };

  router.push = (href, options) => {
    navigateStart();
    push(href, options);
  };

  return router;
};
