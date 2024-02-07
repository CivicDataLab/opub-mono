'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';

import {
  ANALYTICS_REVENUE_TABLE_DATA,
  ANALYTICS_DISTRICT_CHART_DATA,
  GET_FACTORS
} from '@/config/graphql/analaytics-queries';
import { GraphQL } from '@/lib/api';
import { cn } from '@/lib/utils';
import { SidebarDefaultLayout } from './SidebarDefaultLayout';
import { SidebarLayout } from './sidebar-layout';
import styles from './styles.module.scss';
import { useSearchParams } from 'next/navigation';
import InfoCircle from '@/public/InfoCircle';
import Vulnerability from '@/public/Vulnerability';
import Link from 'next/link';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export function AnalyticsDashboardLayout({ children }: DashboardLayoutProps) {

  if (typeof document !== 'undefined') {
    setTimeout(() => {
      document.body.style.cssText = 'overflow: hidden;';
    }, 1000);
  }

  const searchParams = useSearchParams();

  const indicator = searchParams.get("indicator");
  const time_period = searchParams.get("time-period");
  
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

  const factorData = useQuery(
    [`get_factors`],
    () => GraphQL("analytics", GET_FACTORS ),
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
        <div className="absolute top-1/3 left-6 z-10 flex flex-col gap-3">
          {factorData.isFetched &&
            factorData.data?.getFactors.map((item: any, index: number) => {
              const isActive = item.slug === indicator;
              return (
                <Link
                  key={`indicator_${index}`}
                  href={`?indicator=${item.slug}&time-period=${time_period}`}
                >
                  <div
                    className={cn(
                      styles.IndicatorBtn,
                      "group border-2 border-solid border-baseGraySlateSolid12 bg-[#050C17CC]",
                      isActive && "border-[#71E57D]"
                    )}
                  >
                    <Vulnerability color={isActive ? "#71E57D" : "#E2E2E2"} />
                    <span
                      className={cn(
                        styles.IndicatorBtnText,
                        "group-hover:max-w-[350px] text-[#E2E2E2]",
                        isActive && "text-[#71E57D]"
                      )}
                    >
                      {item.name}
                      <InfoCircle color={isActive ? "#71E57D" : "#E2E2E2"} />
                    </span>
                  </div>
                </Link>
              );
            })}
        </div>
        <main
          className={cn(
            styles.Main,
            'px-4',
            'py-6',
            'h-[80vh]'
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