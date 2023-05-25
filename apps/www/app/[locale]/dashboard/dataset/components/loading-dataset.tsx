'use client';

import { Loading } from '@/components/loading';

export default function DatasetLoading({
  previousPage,
}: {
  previousPage?: boolean;
}) {
  return (
    <>
      <Loading />
    </>
  );
}
