'use client';

import React from 'react';
import { IconButton, Tooltip } from 'opub-ui';

import { cn } from '@/lib/utils';
import Icons from '@/components/icons';
import styles from './Content.module.scss';
import { DashboardSidebar } from './dashboard-sidebar';

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
      className={cn('relative min-h-[calc(100svh_-_176px)] grow gap-1 md:flex')}
    >
      <DashboardSidebar
        isCollapsed={isCollapsed}
        items={dashboardConfig.sidebarNav}
      />
      <Tooltip
        content={isCollapsed ? 'Expand' : 'Collapse' + ' Sidebar'}
        className={cn(
          styles.CollapseBtn,
          isCollapsed && styles.Collapsed,
          'absolute top-4 z-10 hidden h-fit rounded-full bg-basePureWhite p-1 shadow-insetBasic hover:bg-baseIndigoSolid3 md:block'
        )}
        side="right"
        hideArrow
      >
        <IconButton
          color="highlight"
          icon={Icons.doubleLeft}
          onClick={() => setIsCollapsed((e) => !e)}
          size="slim"
        >
          {isCollapsed ? 'Expand' : 'Collapse'} Sidebar
        </IconButton>
      </Tooltip>

      <div className={cn(styles.Main, `grow pb-10`)}>{children}</div>
    </div>
  );
}
