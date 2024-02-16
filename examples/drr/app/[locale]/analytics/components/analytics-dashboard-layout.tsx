'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Exposure,
  FloodHazard,
  GovtResponse,
  RiskScore,
  Vulnerability,
} from '@/public/FactorIcons';
import InfoCircle from '@/public/InfoCircle';
import { useQuery } from '@tanstack/react-query';
import { Spinner, Text } from 'opub-ui';

import {
  ANALYTICS_DISTRICT_DATA,
  ANALYTICS_FACTORS,
  ANALYTICS_INDICATORS,
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
  const [isClient, setIsClient] = React.useState(false);

  // To prevent a hydration mismatch fix:https://nextjs.org/docs/messages/react-hydration-error.
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <React.Suspense
      fallback={
        <div className="grid  h-[100vh] place-content-center">
          <Spinner color="highlight" />
          <Text>Loading...</Text>
        </div>
      }
    >
      {isClient ? (
        <div
          className={cn(
            'relative max-h-[calc(100vh_-_160px)] min-h-[calc(100vh_-_160px)] grow gap-1 overflow-y-hidden md:flex'
          )}
        >
          <FactorList />
          <main className={cn(styles.Main, 'px-4', 'py-6')}>{children}</main>
          <SidePaneLayout />
        </div>
      ) : (
        <div className="grid  h-[100vh] place-content-center">
          <Spinner color="highlight" />
          <Text>Loading...</Text>
        </div>
      )}
    </React.Suspense>
  );
}

function SidePaneLayout() {
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

  const indicatorDescriptions: any = useQuery(
    [`indicators_${indicator}`],
    () =>
      GraphQL('analytics', ANALYTICS_INDICATORS, {
        indcFilter: { slug: indicator },
      }),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  if (!sidePaneData.isFetched)
    return (
      <div className="grid  basis-[500px] place-content-center border-solid border-borderSubdued bg-surfaceDefault shadow-basicMd">
        <Spinner color="highlight" />
        <Text>Loading...</Text>
      </div>
    );
  return region !== null && region.length > 0
    ? sidePaneData.isFetched && (
        <SidebarLayout
          data={
            sidePaneData?.data[
              boundary === 'district' ? 'districtViewData' : 'revCircleViewData'
            ]?.table_data
          }
          indicator={indicator}
          boundary={boundary}
        />
      )
    : sidePaneData.isFetched && (
        <SidebarDefaultLayout
          chartData={
            sidePaneData?.data[
              boundary === 'district' ? 'districtViewData' : 'revCircleViewData'
            ]?.table_data
          }
          indicatorDescriptions={indicatorDescriptions?.data?.indicators}
          indicator={indicator}
          boundary={boundary}
        />
      );
}

function FactorList() {
  const factorData = useQuery(
    [`factorScores`],
    () => GraphQL('analytics', ANALYTICS_FACTORS),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );
  const searchParams = useSearchParams();
  const indicator = searchParams.get('indicator');
  const time_period = searchParams.get('time-period') || '2023_08';
  const boundary = searchParams.get('boundary') || 'district';

  return (
    <div className="absolute left-6 top-[250px] z-10 flex flex-col gap-3">
      {factorData.isFetched &&
        factorData.data?.getFactors.map((item: any, index: number) => {
          const isActive = item.slug === indicator;

          const IconMap: { [key: string]: React.ReactNode } = {
            'risk-score': (
              <RiskScore color={isActive ? '#71E57D' : '#E2E2E2'} />
            ),
            vulnerability: (
              <Vulnerability color={isActive ? '#71E57D' : '#E2E2E2'} />
            ),
            'flood-hazard': (
              <FloodHazard color={isActive ? '#71E57D' : '#E2E2E2'} />
            ),
            exposure: <Exposure color={isActive ? '#71E57D' : '#E2E2E2'} />,

            'government-response': (
              <GovtResponse color={isActive ? '#71E57D' : '#E2E2E2'} />
            ),
          };
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
                {IconMap[item?.slug] || (
                  <RiskScore color={isActive ? '#71E57D' : '#E2E2E2'} />
                )}
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
  );
}
