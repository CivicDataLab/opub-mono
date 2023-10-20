'use client';

import React from 'react';

import { cn } from '@/lib/utils';
import { AnalyticsDashboardSidebar } from './analytics-sidebar';
import styles from './styles.module.scss';
import { Text } from 'opub-ui';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export function AnalyticsDashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <React.Fragment>
      <div className='p-8'>
      <Text variant="headingLg">DRR Dashboard : Analytical Map</Text>
      </div>
      <div
        className={cn(
          'relative grow min-h-[calc(100%_-_48px)]',
          'md:flex md:gap-1'
        )}
      >
        <AnalyticsDashboardSidebar />
        <main className={cn(styles.Main, 'md:max-w-[calc(100vw_-_260px)]')}>
          {children}
        </main>
      </div>
    </React.Fragment>
  );
}
