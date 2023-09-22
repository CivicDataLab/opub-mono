'use client';

import { DashboardSidebar } from './dashboard-sidebar';
import { MobileDashboardNav } from './mobile-dashboard-nav';
import styles from './styles.module.scss';
import { cn } from '@/lib/utils';
import React from 'react';

interface DashboardLayoutProps {
  children?: React.ReactNode;
  dashboardConfig: any;
}

export function DashboardLayout({
  children,
  dashboardConfig,
}: DashboardLayoutProps) {
  return (
    <div
      className={cn(
        'relative grow min-h-[calc(100%_-_48px)]',
        'md:flex md:gap-1'
      )}
    >
      <DashboardSidebar items={dashboardConfig.sidebarNav} />

      <div className="md:hidden basis-2 z-1">
        <MobileDashboardNav items={dashboardConfig.sidebarNav} />
      </div>
      <main className={cn(styles.Main, 'md:max-w-[calc(100vw_-_260px)]')}>
        {children}
      </main>
    </div>
  );
}
