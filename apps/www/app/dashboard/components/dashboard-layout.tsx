'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';

import { dashboardConfig } from '@/config/dashboard';
import styles from '../dashboard.module.scss';
import { DashboardNav } from './dashboard-nav';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <div
      className={twMerge(
        'grid gap-6 grid-cols-1 grow overflow-hidden sm:grid-cols-[240px_1fr]',
        styles.Collapse,
        isCollapsed && 'sm:grid-cols-[60px_1fr]'
      )}
    >
      <aside className="hidden pt-2 pr-2 bg-surfaceDefault z-1 shadow-inset sm:block">
        <DashboardNav
          setIsCollapsed={setIsCollapsed}
          isCollapsed={isCollapsed}
          items={dashboardConfig.sidebarNav}
        />
      </aside>
      <main className="px-2 sm:pl-0 sm:px-6">{children}</main>
    </div>
  );
}
