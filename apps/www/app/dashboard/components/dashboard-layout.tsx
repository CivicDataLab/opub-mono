'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';

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
      className={twMerge(
        'grid grid-cols-[8px_1fr] gap-1 grow h-[calc(100% - 60px)] relative',
        'md:flex md:gap-6'
      )}
    >
      <DashboardNav items={dashboardConfig.sidebarNav} />

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
