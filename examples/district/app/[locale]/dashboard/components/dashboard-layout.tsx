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
  const [isOpened, setIsOpened] = React.useState(false);

  return (
    <div
      className={twMerge(
        'grid grid-cols-[8px_1fr] gap-1 grow min-h-[calc(100%_-_48px)] relative',
        'md:flex'
      )}
    >
      <DashboardSidebar items={dashboardConfig.sidebarNav} />

      <div className="md:hidden basis-2 z-1">
        <MobileDashboardNav
          setIsOpened={setIsOpened}
          isOpened={isOpened}
          items={dashboardConfig.sidebarNav}
        />
      </div>
      <main className={cn(styles.Main, isOpened && styles.MainOpened)}>
        {children}
      </main>
    </div>
  );
}
