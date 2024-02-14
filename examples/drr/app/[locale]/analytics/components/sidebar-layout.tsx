'use client';

import React from 'react';
import Hazard from '@/public/Hazard';
import { Button, Divider, Icon, ProgressBar, Text } from 'opub-ui';

import { cn, deSlugify } from '@/lib/utils';
import { RevenueCircle } from './revenue-circle-accordion';

interface IndicatorProps {
  title: string;
  value: number;
}

export function SidebarLayout({ data , indicator , boundary }: any) {

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
      <div className="mt-3 flex items-center gap-2">
        <Hazard />
        {deSlugify(indicator)}
      </div>
      <section className="mt-7">
        {boundary === 'district' && (
          <Text variant="bodyLg" fontWeight="bold">
            DISTRICT SCORE
          </Text>
        )}
        {DataBasedOnBoundary.map((data: any) => (
          <div>
            <div className="mb-2 mt-2">
              <Text variant="headingLg" fontWeight="regular">
                {data[boundary]}
              </Text>
            </div>
            <div className="flex items-center ">
              <div className=" mr-3 basis-2/4">
                <ProgressBar
                  size="small"
                  color="critical"
                  value={(data[indicator] / 6) * 100}
                />
              </div>
              <Text variant="heading2xl">{data?.[indicator]}</Text>/6
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

export const Indicators = ({ data }: { data: IndicatorProps }) => {
  function getRiskLevel(value: number) {
    switch (value) {
      case 1:
      case 2:
        return 'LOW RISK';
      case 3:
      case 4:
        return 'MED RISK';
      case 5:
      case 6:
        return 'HIGH RISK';
      default:
        return 'UNKNOWN RISK';
    }
  }

  return (
    <div>
      <div className="mb-2 mt-5 flex items-center">
        <Hazard />
        <Text fontWeight="bold" variant="headingMd" className=" pl-2">
          {data.title}
        </Text>
      </div>
      <Text fontWeight="regular" variant="headingSm">
        This region carries damage due to flood related disasters
      </Text>
      <div className="mb-3 mt-4 flex gap-4">
        <div className=" basis-2/3">
          <ProgressBar
            value={(data.value / 6) * 100}
            color="critical"
            size="medium"
          />
        </div>
        <div className="flex flex-col">
          <Text>
            <strong className="text-400">{data.value}</strong>/6
          </Text>
          <Text variant="bodySm"> {getRiskLevel(data.value)} </Text>
        </div>
      </div>
      <div className="flex gap-5">
        <Text variant="bodySm">Calculated : May 2023</Text>
        <Text variant="bodySm">Link to Source Datasets</Text>
      </div>
    </div>
  );
};
