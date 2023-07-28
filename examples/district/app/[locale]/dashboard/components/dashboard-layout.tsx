'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';

import { cn } from '@/lib/utils';
import { DashboardSidebar } from './dashboard-sidebar';
import { MobileDashboardNav } from './mobile-dashboard-nav';
import styles from './styles.module.scss';

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
      className={twMerge(
        'grid grid-cols-1 grow min-h-[calc(100%_-_48px)] relative',
        'md:flex md:gap-1'
      )}
    >
      <DashboardSidebar items={dashboardConfig.sidebarNav} />

      <div className="md:hidden basis-2 z-1">
        <MobileDashboardNav items={dashboardConfig.sidebarNav} />
      </div>
      <main className={cn(styles.Main)}>{children}</main>
    </div>
  );
}
