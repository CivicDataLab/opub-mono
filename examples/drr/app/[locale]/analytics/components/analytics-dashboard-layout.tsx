'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';

import {
  ANALYTICS_REVENUE_TABLE_DATA,
  ANALYTICS_DISTRICT_CHART_DATA
} from '@/config/graphql/analaytics-queries';
import { GraphQL } from '@/lib/api';
import { cn } from '@/lib/utils';
import { SidebarDefaultLayout } from './SidebarDefaultLayout';
import { SidebarLayout } from './sidebar-layout';
import styles from './styles.module.scss';
import Hazard from "@/public/Hazard";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export function AnalyticsDashboardLayout({ children }: DashboardLayoutProps) {

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

  const chartData = useQuery(
    [`chart_data`],
    () =>
      GraphQL('analytics', ANALYTICS_DISTRICT_CHART_DATA, {
        indcFilter: { slug: 'composite-score' },
        dataFilter: { dataPeriod: '2022_11' },
      }),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  const REVENUE_CIRCLE = 'CHARIDUAR';

  return (
    <React.Fragment>
      <div
        className={cn(
          'md:flex relative gap-1 grow max-h-full min-h-[calc(100%_-_48px)] overflow-y-hidden'
        )}
      >
        <div className="absolute top-1/3 left-6 z-10 flex flex-col gap-4">
          <div className='flex items-center p-2 px-5 rounded-full border-1 border-solid border-baseGraySlateSolid12 transition-all duration-300 hover:w-52 overflow-hidden bg-[#f4f4f4cc]'>
            <Hazard />
            <span className='opacity-0 duration-300 absolute top-0 left-5 w-full h-full flex items-center justify-center hover:opacity-100'>
               Man Made Hazard
             </span>
          </div>
        </div>

        <main
          className={cn(
            styles.Main,
            'px-4',
            'py-6',
            'h-[90vh] overflow-y-scroll'
          )}
        >
          {children}
        </main>
        {REVENUE_CIRCLE
          ? chartData.isFetched && (
              <SidebarDefaultLayout
                chartData={chartData?.data?.districtChartData}
              />
            )
          : revenueData.isFetched && (
              <SidebarLayout
                revenueData={
                  revenueData?.data?.revCircleViewTableData?.table_data
                }
              />
            )}
      </div>
    </React.Fragment>
  );
}