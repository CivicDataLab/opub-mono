'use client';

import React from 'react';
import { Divider, Icon, ProgressBar, Text } from 'opub-ui';

import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';

interface IndicatorProps {
  title: string;
  value: number;
  icon: any;
}

export function SidebarLayout({ revenueData }: any) {
  const transformData = (data: any) => {
    return [
      {
        title: 'Risk Score',
        value: data[0]['composite-score'],
        icon: Icons.info,
      },
      {
        title: 'Hazard',
        value: data[0]['flood-hazard'],
        icon: Icons.link,
      },
      {
        title: 'Exposure',
        value: data[0]['exposure'],
        icon: Icons.overview,
      },
      {
        title: 'Vulnerability',
        value: data[0]['vulnerability'],
        icon: Icons.info,
      },
    ];
  };

  const transformedData = transformData(revenueData);
  const REVENUE_CIRCLE = 'CHARIDUAR'
  const DISTRICT = 'SONITPUR'

  return (
    <aside
      className={cn(
        'p-4',
        'overflow-hidden bg-surfaceDefault shadow-basicMd',
        'hidden z-1 shadow-inset basis-[500px] shrink-0 md:block',
        'border-r-1 border-solid border-borderSubdued'
      )}
    >
      <Text variant="headingMd" fontWeight="bold">
        DATA INSIGHTS
      </Text>
      <Divider className="mt-2" />
      <div className=" flex flex-col mt-5">
        <Text fontWeight="bold" variant="headingLg">
          {REVENUE_CIRCLE} Revenue Circle
        </Text>
        <Text variant="headingMd">{DISTRICT} District</Text>
      </div>

      {transformedData.map((obj, index) => {
        return <Indicators key={`indicator_${index}`} data={obj} />;
      })}
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
      <div className="flex items-center mt-5 mb-2">
        <Icon source={data.icon} color="default" size={6} />
        <Text fontWeight="bold" variant="headingMd" className=" pl-2">
          {data.title}
        </Text>
      </div>
      <Text fontWeight="regular" variant="headingSm">
        This region carries damage due to flood related disasters
      </Text>
      <div className="flex gap-4 mt-4 mb-3">
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