'use client';

import React from 'react';
import Hazard from '@/public/Hazard';
import { Button, Divider, ProgressBar, Text } from 'opub-ui';

import { cn, deSlugify } from '@/lib/utils';

export function SidebarDefaultLayout({ chartData , indicator , boundary }: any) {

  const formattedIndicator = indicator && deSlugify(indicator).toUpperCase();

  const list = [
    {
      title: 'Risk Score',
      desc: 'One or two line description about the Risk score - what it means, how is it calculated.',
    },
    {
      title: 'Hazard',
      desc: 'One or two line description about the Risk score - what it means, how is it calculated.',
    },
    {
      title: 'Exposure',
      desc: 'One or two line description about the Risk score - what it means, how is it calculated.',
    },
    {
      title: 'Vulnerability',
      desc: 'One or two line description about the Risk score - what it means, how is it calculated.',
    },
  ];

  return (
    <aside
      className={cn(
        'p-4 pr-8',
        'overflow-hidden bg-surfaceDefault shadow-basicMd',
        'shadow-inset z-1 hidden shrink-0 basis-[500px] md:block',
        'border-r-1 border-solid border-borderSubdued',
        'overflow-y-auto'
      )}
    >
      <div className="mb-5 mt-4 flex items-center justify-between">
        <Text variant="heading2xl" fontWeight="regular">
          Data Insights
        </Text>
        <Button variant="success" kind="secondary">
          Download Report
        </Button>
      </div>

      <Divider className="mt-2" />
      <div className="mb-5 mt-5 flex flex-col">
        <Text
          variant="headingMd"
          fontWeight="bold"
          className="mb-4 flex items-center gap-2"
        >
          <Hazard /> {formattedIndicator}
        </Text>
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
              desc={indicator.desc}
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
        <ProgressBar size="small" color="critical" value={(value / 6) * 100} />
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
  return (
    <div className="flex flex-col">
      <div className="mb-2 mt-3 flex items-center">
        <Hazard />
        <Text fontWeight="bold" variant="headingMd" className="pl-2">
          {title}
        </Text>
      </div>
      <div>{desc}</div>
    </div>
  );
};
