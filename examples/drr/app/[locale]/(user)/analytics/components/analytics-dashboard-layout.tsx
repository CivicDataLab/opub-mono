'use client';

import React from 'react';
import { IconButton } from 'opub-ui';

import { cn } from '@/lib/utils';
import Icons from '@/components/icons';
import { AnalyticsDashboardSidebar } from './analytics-sidebar';
import styles from './styles.module.scss';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export function AnalyticsDashboardLayout({ children }: DashboardLayoutProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <React.Fragment>
      <div
        className={cn('md:flex relative gap-1 grow min-h-[calc(100%_-_48px)]')}
      >
        <IconButton
          className={cn(
            'hidden md:block absolute left-[300px] top-4 p-2 z-2 rounded shadow-insetBasic bg-surfaceDefault border-solid border-borderSubdued',
            styles.CollapseBtn,
            isCollapsed && styles.Collapsed
          )}
          color="highlight"
          icon={Icons.doubleLeft}
          onClick={() => setIsCollapsed((e) => !e)}
        >
          Collapse Sidebar
        </IconButton>
        <AnalyticsDashboardSidebar isCollapsed={isCollapsed} />

        <main className={cn(styles.Main, 'px-10', 'py-6')}>{children}</main>
      </div>
    </React.Fragment>
  );
}
