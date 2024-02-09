'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import InfoCircle from '@/public/InfoCircle';
import Vulnerability from '@/public/Vulnerability';
import { type TypedDocumentNode } from '@graphql-typed-document-node/core';
import { useQuery } from '@tanstack/react-query';

import {
  ANALYTICS_DISTRICT_TABLE_DATA,
  ANALYTICS_FACTORS,
  ANALYTICS_REVENUE_TABLE_DATA,
} from '@/config/graphql/analaytics-queries';
import { GraphQL } from '@/lib/api';
import { cn } from '@/lib/utils';
import { SidebarLayout } from './sidebar-layout';
import { SidebarDefaultLayout } from './SidebarDefaultLayout';
import styles from './styles.module.scss';

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

  const indicator = searchParams.get('indicator');
  const time_period = searchParams.get('time-period');
  const region = searchParams.get('region');
  const boundary = searchParams.get('boundary') || 'district';

  const sidePaneQuery: TypedDocumentNode<any, any> =
    boundary === 'district'
      ? ANALYTICS_DISTRICT_TABLE_DATA
      : ANALYTICS_REVENUE_TABLE_DATA;

  const sidePaneData = useQuery(
    [`sidePaneData_${indicator}_${region}_${boundary}`],
    () =>
      GraphQL('analytics', sidePaneQuery, {
        indcFilter: { slug: indicator },
        dataFilter: { dataPeriod: time_period },
        ...(region && { geoFilter: { code: [region] } }),
      }),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  const factorData = useQuery(
    [`factorScores`],
    () => GraphQL('analytics', ANALYTICS_FACTORS),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  //const REVENUE_CIRCLE = null;

  return (
    <React.Fragment>
      <div
        className={cn(
          'relative max-h-full min-h-[calc(100%_-_48px)] grow gap-1 overflow-y-hidden md:flex'
        )}
      >
        <div className="absolute left-6 top-1/3 z-10 flex flex-col gap-3">
          {factorData.isFetched &&
            factorData.data?.getFactors.map((item: any, index: number) => {
              const isActive = item.slug === indicator;
              return (
                <Link
                  key={`indicator_${index}`}
                  href={`?indicator=${item.slug}&time-period=${time_period}&boundary=${boundary}`}
                >
                  <div
                    className={cn(
                      styles.IndicatorBtn,
                      'group border-2 border-solid border-baseGraySlateSolid12 bg-[#050C17CC]',
                      isActive && 'border-[#71E57D]'
                    )}
                  >
                    <Vulnerability color={isActive ? '#71E57D' : '#E2E2E2'} />
                    <span
                      className={cn(
                        styles.IndicatorBtnText,
                        'text-[#E2E2E2] group-hover:max-w-[350px]',
                        isActive && 'text-[#71E57D]'
                      )}
                    >
                      {item.name}
                      <InfoCircle color={isActive ? '#71E57D' : '#E2E2E2'} />
                    </span>
                  </div>
                </Link>
              );
            })}
        </div>
        <main className={cn(styles.Main, 'px-4', 'py-6', 'h-[80vh]')}>
          {children}
        </main>
        {region !== null && region.length > 0
          ? sidePaneData.isFetched && (
              <SidebarLayout
                revenueData={
                  sidePaneData?.data[
                    boundary === 'district'
                      ? 'districtViewTableData'
                      : 'revCircleViewTableData'
                  ]?.table_data
                }
              />
            )
          : sidePaneData.isFetched && (
              <SidebarDefaultLayout
                chartData={
                  sidePaneData?.data[
                    boundary === 'district'
                      ? 'districtViewTableData'
                      : 'revCircleViewTableData'
                  ]?.table_data
                }
              />
            )}
      </div>
    </React.Fragment>
  );
}
