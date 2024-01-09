'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { ANALYTICS_REVENUE_TABLE_DATA } from '@/config/graphql/analaytics-queries';
import { GraphQL } from '@/lib/api';
import { cn } from '@/lib/utils';
import Icons from '@/components/icons';
//import { AnalyticsDashboardSidebar } from './analytics-sidebar';
import { SidebarLayout } from './sidebar-layout';
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

  const revenueData = useQuery(
    [`revenue_table_data`],
    () =>
      GraphQL('analytics', ANALYTICS_REVENUE_TABLE_DATA, {
        indcFilter: { slug: 'composite-score' },
        dataFilter: { dataPeriod: '2023_08' },

        geoFilter: { code: '116' },
      }),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  return (
    <React.Fragment>
      <div
        className={cn(
          'md:flex relative gap-1 grow max-h-full min-h-[calc(100%_-_48px)] overflow-y-hidden'
        )}
      >
        {/* <IconButton
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
        </IconButton> */}

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
        {revenueData.isFetched && (
          <SidebarLayout
            revenueData={revenueData?.data?.revCircleViewTableData?.table_data}
          />
        )}
      </div>
    </React.Fragment>
  );
}
