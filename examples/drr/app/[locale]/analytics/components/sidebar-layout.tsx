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
import Hazard from '@/public/Hazard';
import { InfoSquare } from '@/public/InfoCircle';
import { Button, Divider, ProgressBar, Text } from 'opub-ui';

import { RiskMap } from '@/config/consts';
import { cn, deSlugify, formatDateString } from '@/lib/utils';
import { RevenueCircle, ScoreInfo } from './revenue-circle-accordion';

export function SidebarLayout({ data, indicator, boundary }: any) {
  const searchParams = useSearchParams();
  const indicatorIcon = searchParams.get('indicator');
  const timePeriod = searchParams.get('time-period') || '2023_08';
  const formattedTimePeriod = formatDateString(timePeriod);
  const color = '#000000';

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
        'overflow-hidden bg-surfaceDefault shadow-basicMd',
        'shadow-inset z-1 hidden shrink-0 basis-[500px] md:block',
        'border-r-1 border-solid border-borderSubdued'
      )}
    >
      <header className="mb-5 mt-4 flex items-center justify-between">
        <Text variant="heading2xl" fontWeight="regular">
          Data Insights
        </Text>
        <Button variant="success" kind="secondary">
          Download Report
        </Button>
      </header>
      <Divider className="mt-2" />
      {data.length === 1 ||
        (districtData.length === 1 && (
          <div className=" mt-5 flex flex-col">
            <Text variant="heading2xl" fontWeight="regular">
              {RegionName} {GeographyMap[boundary]}
            </Text>
          </div>
        ))}
      <div className="flex items-center justify-between self-stretch">
        <div className="mt-3 flex items-center gap-2">
          <Text
            variant="headingMd"
            fontWeight="bold"
            className="mb-4 flex items-center gap-2"
          >
            {IconMap[indicatorIcon || 'risk-score']}
            {deSlugify(indicator)}
          </Text>
        </div>
        <div className="flex items-center gap-4">
          <Text variant="bodyMd" color="subdued" fontWeight="regular">
            Cumulative till {formattedTimePeriod}
          </Text>
          <InfoSquare color="#6A6A6A" />
        </div>
      </div>

      <section className="mt-7">
        {boundary === 'district' && (
          <Text variant="bodyLg" fontWeight="bold">
            DISTRICT SCORE
          </Text>
        )}
        {DataBasedOnBoundary.map((data: any, index: any) => (
          <div key={index}>
            <div className="mb-2 mt-2">
              <Text variant="headingLg" fontWeight="regular">
                {data[boundary]}
              </Text>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center">
                <div className=" mr-3 basis-2/4">
                  <ProgressBar
                    size="small"
                    customColor={RiskMap[data[indicator]]}
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
      {districtData.length === 1 && (
        <RevenueCircle
          revenueCircleData={revenueCircleData}
          indicator={indicator}
        />
      )}
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
    <div className='ml-3'>
      <ScoreInfo
        key={scoreType}
        indicator={indicator}
        label={`${deSlugify(scoreType)} Score`}
        value={data?.[scoreType]}
      />
    </div>
  ));
}
