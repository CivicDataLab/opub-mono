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

  if (typeof document !== 'undefined') {
    setTimeout(() => {
      document.body.style.cssText = 'overflow: hidden;';
    }, 1000);
  }

  return (
    <React.Fragment>
      <div
        className={cn(
          'md:flex relative gap-1 grow max-h-full min-h-[calc(100%_-_48px)] overflow-y-hidden'
        )}
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

        <main
          className={cn(
            styles.Main,
            'px-10',
            'py-6',
            'h-[90vh] overflow-y-scroll'
          )}
        >
          {children}
        </main>
      </div>
    </React.Fragment>
  );
}
