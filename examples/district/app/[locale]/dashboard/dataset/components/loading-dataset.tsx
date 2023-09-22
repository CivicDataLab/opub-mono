'use client';

import { Loading } from '@/components/loading';
import { Spinner } from 'opub-ui';

export default function DatasetLoading() {
  return (
    <div className="h-full ">
      <Loading />
    </div>
  );
}
