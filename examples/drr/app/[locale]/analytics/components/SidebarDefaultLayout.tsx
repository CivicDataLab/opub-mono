'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Ellipse,
  Exposure,
  FloodHazard,
  GovtResponse,
  RiskScore,
  Vulnerability,
} from '@/public/FactorIcons';
import { Button, Divider, ProgressBar, Text } from 'opub-ui';

import { RiskColorMap } from '@/config/consts';
import { cn, deSlugify } from '@/lib/utils';

export function SidebarDefaultLayout({
  chartData,
  indicatorDescriptions,
  indicator,
  boundary,
}: any) {
  const list: { title: string; description: string }[] = [];

  const searchParams = useSearchParams();
  const indicatorIcon = searchParams.get('indicator');
  const color = '#000000';

  const IconMap: { [key: string]: React.ReactNode } = {
    'risk-score': <RiskScore color={color} />,
    vulnerability: <Vulnerability color={color} />,
    'flood-hazard': <FloodHazard color={color} />,
    exposure: <Exposure color={color} />,
    'government-response': <GovtResponse color={color} />,
  };

  if (indicatorDescriptions) {
    indicatorDescriptions.map(
      (item: {
        name: string;
        long_description?: string;
        short_description: string;
      }) => {
        list.push({
          title: item?.name,
          description:
            item?.short_description || item?.long_description || 'NA',
        });
      }
    );
  }

  return (
    <aside
      className={cn(
        'p-4 pr-8',
        'bg-surfaceDefault shadow-basicMd',
        'shadow-inset z-1 hidden shrink-0 basis-[500px] md:block',
        'border-r-1 border-solid border-borderSubdued',
        'overflow-y-auto'
      )}
    >
      <div className="mb-5 mt-4 flex items-center justify-between">
        <Text
          variant="heading2xl"
          fontWeight="regular"
          className="flex items-center gap-2"
        >
          {IconMap[indicatorIcon || 'risk-score']}
          {deSlugify(indicator)}
        </Text>
        <Button variant="success" kind="secondary">
          Download Report
        </Button>
      </div>

      <Divider className="mt-2" />
      <div className="mb-5 mt-5 flex flex-col">
        <Text variant="headingMd" fontWeight="bold" className=" mt-3">
          HIGH RISK DISTRICTS
        </Text>
        {chartData && (
          <div className="flex flex-col pt-3">
            {chartData
              .slice(0, 5)
              .map(
                (
                  item: { [x: string]: string },
                  index: React.Key | null | undefined
                ): any => (
                  <DistrictBar
                    key={index}
                    district={item[boundary]}
                    value={item[indicator] as unknown as number}
                  />
                )
              )}
          </div>
        )}
        <Text variant="headingMd" fontWeight="bold" className="mt-4">
          LEARN MORE
        </Text>
        <div className="mt-2">
          {list.map((indicator, index) => (
            <IndicatorDescription
              key={index}
              title={indicator.title}
              desc={indicator.description}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}

export const DistrictBar = ({
  district,
  value,
}: {
  district: string;
  value: number;
}) => {
  return (
    <div className="mb-1 flex items-center gap-2 pl-20">
      <div className=" basis-1/4">
        <Text variant="bodySm" fontWeight="medium">
          {district}
        </Text>
      </div>

      <div className=" basis-2/4">
        <ProgressBar
          size="small"
          customColor={RiskColorMap[value]}
          value={(value / 6) * 100}
        />
      </div>
    </div>
  );
};
export const IndicatorDescription = ({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) => {
  const IconMap: { [key: string]: React.ReactNode } = {
    'risk-score': <RiskScore color={'#000000'} />,
    vulnerability: <Vulnerability color={'#000000'} />,
    'flood-hazard': <FloodHazard color={'#000000'} />,
    exposure: <Exposure color={'#000000'} />,
    'government-response': <GovtResponse color={'#000000'} />,
  };
  return (
    <div className="flex flex-col">
      <div className="mb-2 mt-3 flex items-center">
        {IconMap[title.toLowerCase().replace(/\s+/g, '-')] || (
          <Ellipse color="#000000" />
          // null
        )}
        <Text fontWeight="bold" variant="headingMd" className="pl-2">
          {title}
        </Text>
      </div>
      <div>{desc}</div>
    </div>
  );
};
