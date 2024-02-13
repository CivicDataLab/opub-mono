'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import Hazard from '@/public/Hazard';
import { Button, Divider, Icon, ProgressBar, Text } from 'opub-ui';

import { cn, deSlugify } from '@/lib/utils';
import { Icons } from '@/components/icons';
import { RevenueCircle } from './revenue-circle-accordion';
import styles from './styles.module.scss';

interface IndicatorProps {
  title: string;
  value: number;
}

export function SidebarLayout({ revenueData }: any) {
  const searchParams = useSearchParams();
  const indicator = searchParams.get('indicator') || 'risk-score';

  const districtData = revenueData.filter((item: any) =>
    Object.hasOwnProperty.call(item, 'district')
  );
  const revenueCircleData = revenueData.filter((item: any) =>
    Object.hasOwnProperty.call(item, 'revenue circle')
  );

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
      <div className=" mt-5 flex flex-col">
        <Text variant="heading2xl" fontWeight="regular">
          {districtData[0]?.district.toUpperCase()} District
        </Text>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <Hazard />
        {deSlugify(indicator)}
      </div>
      <section className="mt-7">
        <Text variant="bodyLg" fontWeight="bold">
          DISTRICT SCORE
        </Text>
        <div className="mb-2 mt-2">
          <Text variant="headingLg" fontWeight="regular">
            {districtData[0]?.district}
          </Text>
        </div>
        <div className="flex items-center ">
          <div className=" mr-3 basis-2/4">
            <ProgressBar
              size="small"
              color="critical"
              value={(districtData[0]?.[indicator] / 6) * 100}
            />
          </div>
          <Text variant="heading2xl">{districtData[0]?.[indicator]}</Text>/6
        </div>
      </section>
      <RevenueCircle
        revenueCircleData={revenueCircleData}
        indicator={indicator}
      />
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
