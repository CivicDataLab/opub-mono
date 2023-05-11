'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { getPolicy } from '@/lib/api';
import { ActionBar } from './action-bar';
import { Content } from './content';

export const Page = () => {
  const router = useRouter();
  React.useEffect(() => {
    router.prefetch('/dashboard/dataset/new');
  }, []);

  const { data } = useQuery(['all_policies'], () => getPolicy());
  console.log(data);

  return (
    <>
      <ActionBar
        title="My Datasets"
        preFetch="/dashboard/dataset/new"
        primaryAction={{
          content: 'Add New Dataset',
          onAction: () => router.push('/dashboard/dataset/new'),
        }}
      />
      <Content />
    </>
  );
};
