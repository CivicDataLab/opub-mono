import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

export const useUrlParams = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [value, setValue] = React.useState<{ [key: string]: string }>({});

  React.useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const obj: any = {};
    for (const [key, value] of params.entries()) {
      obj[key] = value;
    }
    setValue(obj);
  }, [searchParams]);

  function updateParam({
    key,
    value,
    replace,
    scroll = false,
  }: {
    key: string;
    value: string;
    replace?: boolean;
    scroll?: boolean;
  }) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router[replace ? 'replace' : 'push'](`${pathname}?${params.toString()}`, {
      scroll,
    });

    setValue((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  }

  return {
    value,
    updateParam,
  } as const;
};
