'use client';

import { IconButton } from 'opub-ui';
import styles from './Content.module.scss';
import { DashboardSidebar } from './dashboard-sidebar';
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
      <DashboardSidebar
        isCollapsed={isCollapsed}
        items={dashboardConfig.sidebarNav}
      />
      <IconButton
        className={cn(
          'hidden md:block absolute left-[-24px] top-4 p-2 z-10 rounded-full shadow-insetBasic bg-basePureWhite hover:bg-baseIndigoSolid3',
          styles.CollapseBtn,
          isCollapsed && styles.Collapsed
        )}
        color="highlight"
        icon={Icons.doubleLeft}
        onClick={() => setIsCollapsed((e) => !e)}
      >
        Collapse Sidebar
      </IconButton>

      <main className={cn(styles.Main, `grow pb-10`)}>{children}</main>
    </div>
  );
}
