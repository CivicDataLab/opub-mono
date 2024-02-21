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

import { ANALYTICS_FACTORS } from '@/config/graphql/analaytics-queries';
import { GraphQL } from '@/lib/api';
import { cn } from '@/lib/utils';
import styles from './styles.module.scss';

export function FactorList() {
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
    <div
      className={cn(
        'absolute left-2 top-[140px] z-10 flex flex-col gap-3',
        styles.FactorList
      )}
    >
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
