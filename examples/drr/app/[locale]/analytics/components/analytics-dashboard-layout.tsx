'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import InfoCircle from '@/public/InfoCircle';
import Vulnerability from '@/public/Vulnerability';
import { useQuery } from '@tanstack/react-query';

import {
  ANALYTICS_DISTRICT_CHART_DATA,
  ANALYTICS_REVENUE_TABLE_DATA,
  GET_FACTORS,
} from '@/config/graphql/analaytics-queries';
import { GraphQL } from '@/lib/api';
import { cn } from '@/lib/utils';
import { SidebarLayout } from './sidebar-layout';
import { SidebarDefaultLayout } from './SidebarDefaultLayout';
import { useAddedRegions } from './store';
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

  //---useRouter implementation-----

  // const [selectedIndicator, setSelectedIndicator] = useState<string>("");

  // const router = useRouter();

  // const handleButtonClick = (indicator: string) => {
  //   // Update URL query parameter 'indicator'
  //   router.push({
  //     pathname: router.pathname,
  //     query: { ...router.query, indicator },
  //   });

  //   setSelectedIndicator(indicator);
  // };

  //---------

  //----
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

  // console.log("CHAR DATA: ", chartData.data);

  const regions = useAddedRegions((state) => state.regions);

  const revenueData = useQuery(
    [`revenue_table_data_${regions}`],
    () =>
      GraphQL('analytics', ANALYTICS_REVENUE_TABLE_DATA, {
        indcFilter: { slug: 'composite-score' },
        dataFilter: { dataPeriod: '2023_08' },
        // geoFilter: { code: regions[0].value },
        geoFilter: { code: '116' },
      }),
    {
      // enabled: regions.length ? true : false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  const revenueTableDataAll = useQuery(
    [`revenue_table_data_All`],
    () =>
      GraphQL('analytics', ANALYTICS_REVENUE_TABLE_DATA, {
        indcFilter: { slug: 'exposure' },
        dataFilter: { dataPeriod: '2022_08' },
        geoFilter: null,
      }),
    {
      // enabled: regions.length ? true : false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  const factorData = useQuery(
    [`get_factors`],
    () => GraphQL('analytics', GET_FACTORS),
    {
      // enabled: regions.length ? true : false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  console.log('REVENUE DATA ALL: ', revenueTableDataAll.data);

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
                  href={`?indicator=${item.slug}&time-period=${time_period}`}
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
        {regions.length ? (
          revenueData.isFetched && (
            <SidebarLayout
              revenueData={
                revenueData?.data?.revCircleViewTableData?.table_data
              }
            />
          )
        ) : (
          <SidebarLayout
            revenueData={
              revenueTableDataAll?.data?.revCircleViewTableData?.table_data
            }
          />
        )}
        {/* // revenueTableDataAll.isFetched && (
            //   <SidebarDefaultLayout
            //     chartData={
            //       revenueTableDataAll?.data?.revCircleViewTableData?.table_data
            //     }
            //   />
            // )} */}
      </div>
    </React.Fragment>
  );
}
