'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Exposure,
  FloodHazard,
  GovtResponse,
  RiskScore,
  Vulnerability,
} from '@/public/FactorIcons';
import { InfoSquare } from '@/public/InfoCircle';
import * as Accordion from '@radix-ui/react-accordion';
import { useQuery } from '@tanstack/react-query';
import { Button, Divider, Icon, ProgressBar, Text } from 'opub-ui';

import { RiskColorMap } from '@/config/consts';
import { ANALYTICS_TIME_TRENDS } from '@/config/graphql/analaytics-queries';
import { GraphQL } from '@/lib/api';
import { cn, deSlugify, formatDateString } from '@/lib/utils';
import { Icons } from '@/components/icons';
import { RevenueCircle, ScoreInfo } from './revenue-circle-accordion';
import styles from './styles.module.scss';
import { TimeTrends } from './time-trends';

export function SidebarLayout({ data, indicator, boundary }: any) {
  const searchParams = useSearchParams();
  const indicatorIcon = searchParams.get('indicator') || 'risk-score';
  const timePeriod = searchParams.get('time-period') || '2023_08';
  const formattedTimePeriod = formatDateString(timePeriod);
  const color = '#000000';
  const region = searchParams.get('region') || '1';

  const DEFAULT_PERIOD = '3M';

  const items = [
    {
      value: '3M',
      label: 'Past 3 months',
    },
    {
      value: '1Y',
      label: 'Past 1 year',
    },
    {
      value: 'ALL',
      label: 'All Data',
    },
  ];

  const [period, setPeriod] = React.useState(items[0].value || DEFAULT_PERIOD);

  const chartData = useQuery(
    [`chartData_${boundary}_${indicator}_${timePeriod}_${region}_${period}`],
    () =>
      GraphQL('analytics', ANALYTICS_TIME_TRENDS, {
        indcFilter: { slug: indicatorIcon },
        dataFilter: { dataPeriod: timePeriod, period: period },
        geoFilter: { code: region?.split(',') },
      }),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  const IconMap: { [key: string]: React.ReactNode } = {
    'risk-score': <RiskScore color={color} />,
    vulnerability: <Vulnerability color={color} />,
    'flood-hazard': <FloodHazard color={color} />,
    exposure: <Exposure color={color} />,
    'government-response': <GovtResponse color={color} />,
  };

  const districtData = data.filter((item: any) =>
    Object.hasOwnProperty.call(item, 'district')
  );
  // To filter out revenue circles from the district data boundary
  const revenueCircleData = data.filter((item: any) =>
    Object.hasOwnProperty.call(item, 'revenue circle')
  );

  const GeographyMap: { [key: string]: string } = {
    district: 'District',
    'revenue-circle': 'Revenue Circle',
  };

  const DataBasedOnBoundary = boundary === 'district' ? districtData : data;
  const RegionName =
    boundary === 'district'
      ? districtData[0]?.district
      : data[0]?.['revenue-circle'];

  return (
    <aside
      className={cn(
        'p-4',
        'bg-surfaceDefault shadow-basicMd',
        'shadow-inset z-1 hidden shrink-0 basis-[500px] md:block',
        'overflow-y-auto border-r-1 border-solid border-borderSubdued'
      )}
    >
      <header className="mb-5 mt-4 flex items-center justify-between">
        <Text
          variant="heading2xl"
          fontWeight="regular"
          className="flex items-center gap-2"
        >
          {IconMap[indicatorIcon || 'risk-score']}
          {deSlugify(indicatorIcon)}
        </Text>
        <Button variant="success" kind="secondary">
          Download Report
        </Button>
      </header>
      <Divider className="mt-2" />
      {(data.length === 1 || districtData.length === 1) && (
        <div className=" mb-2 mt-5 flex flex-col">
          <Text variant="heading2xl" fontWeight="regular">
            {RegionName} {GeographyMap[boundary]}
          </Text>
        </div>
      )}
      <div className="flex items-center justify-between self-stretch">
        <div className="mt-4 flex items-center gap-4">
          <Text variant="bodyMd" color="subdued" fontWeight="regular">
            Cumulative till {formattedTimePeriod}
          </Text>
          <InfoSquare color="#6A6A6A" />
        </div>
      </div>

      <section className="mt-4">
        {DataBasedOnBoundary.map((data: any, index: any) => (
          <div key={index} className="mb-4">
            <Text variant="headingXl" fontWeight="regular">
              {data[boundary]}
            </Text>
            <div className="flex flex-col gap-1">
              <div className="flex items-center">
                <div className=" mr-3 basis-2/4">
                  <ProgressBar
                    size="small"
                    customColor={RiskColorMap[data[indicator]]}
                    value={(data[indicator] / 6) * 100}
                  />
                </div>
                <Text variant="heading2xl">{data?.[indicator]}</Text>/6
              </div>
              <OtherFactorScores
                data={data}
                boundary={boundary}
                indicator={indicator}
              />
            </div>
          </div>
        ))}
      </section>
      <Accordion.Root type="single" defaultValue="time-trends" collapsible>
        <Accordion.Item value="revenue-circle" className="mt-4">
          {districtData.length === 1 && (
            <div className="mt-7">
              <div className={styles.SidebarAccordionTitle}>
                <Text variant="bodyLg" fontWeight="bold">
                  REVENUE CIRCLE SCORE
                </Text>
                <Accordion.Trigger
                  className={cn(styles.SidebarAccordionIcon, 'ml-auto')}
                >
                  <Icon
                    className={cn(styles.AccordionChevron)}
                    source={Icons.down}
                    size={70}
                  />
                </Accordion.Trigger>
              </div>
              <Accordion.Content
                className={cn(styles.RevenueBox, 'px-2 pb-4 md:px-4 ')}
              >
                <RevenueCircle
                  revenueCircleData={revenueCircleData}
                  indicator={indicator}
                />
              </Accordion.Content>
            </div>
          )}
        </Accordion.Item>
        <Accordion.Item value="time-trends" className="mt-4">
          <div className="mt-5">
            <div className={styles.SidebarAccordionTitle}>
              <Text variant="bodyLg" fontWeight="bold">
                TIME TRENDS
              </Text>
              <Accordion.Trigger
                className={cn(styles.SidebarAccordionIcon, 'ml-auto')}
              >
                <Icon
                  className={cn(styles.AccordionChevron)}
                  source={Icons.down}
                  size={70}
                />
              </Accordion.Trigger>
            </div>

            <Accordion.Content
              className={cn(styles.TrendsBox, 'px-2 pb-4 md:px-4 ')}
            >
              <div className="mt-4 flex items-center gap-2">
                {items.map(({ label, value: itemValue }) => {
                  const isActiveValue = itemValue === period;
                  return (
                    <button
                      key={itemValue}
                      type="button"
                      className={cn(
                        styles.TabItem,
                        isActiveValue && styles.TabItemActive
                      )}
                      onClick={() => {
                        setPeriod(itemValue);
                      }}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
              {chartData.isFetched ? (
                <TimeTrends
                  chartData={chartData?.data?.getTimeTrends}
                  indicator={indicatorIcon}
                  boundary={boundary}
                />
              ) : null}
            </Accordion.Content>
          </div>
        </Accordion.Item>
      </Accordion.Root>
    </aside>
  );
}

export function OtherFactorScores({ data, boundary, indicator }: any) {
  const clonedData = structuredClone(data);
  delete clonedData[boundary];
  delete clonedData[`${boundary}-code`];
  delete clonedData[indicator];

  const FactorVariables = Object.keys(clonedData);

  return FactorVariables.map((scoreType) => (
    <div key={scoreType} className="ml-3">
      <ScoreInfo
        indicator={indicator}
        label={`${deSlugify(scoreType)} Score`}
        value={data?.[scoreType]}
      />
    </div>
  ));
}
