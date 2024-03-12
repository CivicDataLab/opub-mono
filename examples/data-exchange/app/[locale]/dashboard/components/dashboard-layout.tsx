'use client';

import React from 'react';

import { dashboardConfig } from '@/config/dashboard';
import { cn } from '@/lib/utils';
import { DashboardNav } from './dashboard-nav';
import { MobileDashboardNav } from './mobile-dashboard-nav';
import styles from './styles.module.scss';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isOpened, setIsOpened] = React.useState(false);

  return (
    <div
      className={cn('relative grid grow grid-cols-[8px_1fr] gap-1', 'md:flex')}
    >
      <DashboardNav items={dashboardConfig.sidebarNav} />

      <div className="z-1 basis-2 md:hidden">
        <MobileDashboardNav
          setIsOpened={setIsOpened}
          isOpened={isOpened}
          items={dashboardConfig.sidebarNav}
        />
      </div>
      <div className={cn(styles.Main, isOpened && styles.MainOpened)}>
        {children}
      </div>
    </div>
  );
}
