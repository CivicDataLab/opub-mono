'use client';

import styles from './Content.module.scss';
import { DashboardSidebar } from './dashboard-sidebar';
import { MobileDashboardNav } from './mobile-dashboard-nav';
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
      className={cn('md:flex gap-1 relative grow min-h-[calc(100%_-_48px)]')}
    >
      <DashboardSidebar items={dashboardConfig.sidebarNav} />

      <div className="md:hidden basis-2 z-1">
        <MobileDashboardNav items={dashboardConfig.sidebarNav} />
      </div>
      <main className={cn(styles.Main, `grow`)}>{children}</main>
    </div>
  );
}
