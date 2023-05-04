import React from 'react';
import { twMerge } from 'tailwind-merge';

import { dashboardConfig } from '@/config/dashboard';
import { DashboardNav } from './dashboard-nav';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div
      className={twMerge(
        'flex gap-6 grow overflow-hidden h-[calc(100% - 60px)]'
      )}
    >
      <DashboardNav items={dashboardConfig.sidebarNav} />
      <main className="px-2 pb-6 grow sm:pl-0 sm:px-6">{children}</main>
    </div>
  );
}
