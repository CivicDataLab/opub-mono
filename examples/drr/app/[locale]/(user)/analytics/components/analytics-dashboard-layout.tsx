'use client';

import React from 'react';

import { cn } from '@/lib/utils';
import { AnalyticsDashboardSidebar } from './analytics-sidebar';
import styles from './styles.module.scss';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export function AnalyticsDashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <React.Fragment>
      <div
        className={cn('md:flex relative gap-1 grow min-h-[calc(100%_-_48px)]')}
      >
        <AnalyticsDashboardSidebar />

        <main
          className={cn(styles.Main, 'md:max-w-[calc(100vw_-_320px)] pl-4 h-[100vh] overflow-y-auto')}
        >
          {children}
        </main>
      </div>
    </React.Fragment>
  )
}
