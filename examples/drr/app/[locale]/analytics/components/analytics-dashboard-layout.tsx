'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import InfoCircle from '@/public/InfoCircle';
import Vulnerability from '@/public/Vulnerability';
import { useQuery } from '@tanstack/react-query';
import { Spinner, Text } from 'opub-ui';

import {
  ANALYTICS_DISTRICT_DATA,
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
  const searchParams = useSearchParams();

  const indicator = searchParams.get('indicator');
  const time_period = searchParams.get('time-period') || '2023_08';
  const region = searchParams.get('region');
  const boundary = searchParams.get('boundary') || 'district';

  const sidePaneQuery: any =
    boundary === 'district'
      ? ANALYTICS_DISTRICT_DATA
      : ANALYTICS_REVENUE_TABLE_DATA;

  const sidePaneData: any = useQuery(
    [
      `sidePaneData_${indicator}_${region?.split(',')}_${boundary}_${time_period}`,
    ],
    () =>
      GraphQL('analytics', sidePaneQuery, {
        indcFilter: { slug: indicator },
        dataFilter: { dataPeriod: time_period },
        ...(region && { geoFilter: { code: region?.split(',') } }),
      }),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  React.useEffect(() => {
    sidePaneData.refetch();
  }, [region?.split(','), time_period]);

  const factorData = useQuery(
    [`factorScores`],
    () => GraphQL('analytics', ANALYTICS_FACTORS),
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
          'relative max-h-full min-h-[calc(100vh_-_48px)] grow gap-1 overflow-y-hidden md:flex'
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
        {!sidePaneData.isFetched && (
          <div className="grid  basis-[500px] place-content-center border-solid border-borderSubdued bg-surfaceDefault shadow-basicMd">
            <Spinner color="highlight" />
            <Text>Loading...</Text>
          </div>
        )}
        {region !== null && region.length > 0
          ? sidePaneData.isFetched && (
              <SidebarLayout
                data={
                  sidePaneData?.data[
                    boundary === 'district'
                      ? 'districtViewData'
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
                      ? 'districtViewData'
                      : 'revCircleViewTableData'
                  ]?.table_data
                }
              />
            )}
      </div>
    </React.Fragment>
  );
}
