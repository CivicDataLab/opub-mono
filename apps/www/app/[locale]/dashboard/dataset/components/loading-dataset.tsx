'use client';

import { Spinner } from '@opub-cdl/ui';

import { Loading } from '@/components/loading';

export default function DatasetLoading() {
  return (
    <div className="h-full ">
      <Loading />
    </div>
  );
}
