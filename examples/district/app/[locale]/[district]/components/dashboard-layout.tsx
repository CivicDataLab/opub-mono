'use client';

import { IconButton } from 'opub-ui';
import styles from './Content.module.scss';
import { DashboardSidebar } from './dashboard-sidebar';
import { MobileDashboardNav } from './mobile-dashboard-nav';
import { cn } from '@/lib/utils';
import React from 'react';
import Icons from '@/components/icons';

interface DashboardLayoutProps {
  children?: React.ReactNode;
  dashboardConfig: any;
}

export function DashboardLayout({
  children,
  dashboardConfig,
}: DashboardLayoutProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <div
      className={cn('md:flex relative gap-1 grow min-h-[calc(100%_-_48px)]')}
    >
      <IconButton
        className={cn(
          'absolute left-[220px] top-4 p-2 z-2 rounded-full shadow-insetBasic bg-lightmodePureWhite hover:bg-lightmodeIndigoSolid3',
          styles.CollapseBtn,
          isCollapsed && styles.Collapsed
        )}
        color="highlight"
        icon={Icons.doubleLeft}
        onClick={() => setIsCollapsed((e) => !e)}
      >
        Collapse Sidebar
      </IconButton>
      <DashboardSidebar
        isCollapsed={isCollapsed}
        items={dashboardConfig.sidebarNav}
      />

      <div className="md:hidden basis-2 z-1">
        <MobileDashboardNav items={dashboardConfig.sidebarNav} />
      </div>
      <main className={cn(styles.Main, `grow`)}>{children}</main>
    </div>
  );
}
