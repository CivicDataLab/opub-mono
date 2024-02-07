'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { Divider, Icon, ProgressBar, Text } from 'opub-ui';

import { cn, deSlugify } from '@/lib/utils';
import { Icons } from '@/components/icons';

export function SidebarDefaultLayout({ chartData }: any) {
  const searchParams = useSearchParams();
  const indicator = searchParams.get('indicator');

  const formattedIndicator = indicator && deSlugify(indicator).toUpperCase();
  const revenueData = indicator && chartData['2022_11'][indicator];

  const list = [
    {
      title: 'Risk Score',
      desc: 'One or two line description about the Risk score - what it means, how is it calculated.',
      icon: Icons.construction,
    },
    {
      title: 'Hazard',
      desc: 'One or two line description about the Risk score - what it means, how is it calculated.',
      icon: Icons.link,
    },
    {
      title: 'Exposure',
      desc: 'One or two line description about the Risk score - what it means, how is it calculated.',
      icon: Icons.overview,
    },
    {
      title: 'Vulnerability',
      desc: 'One or two line description about the Risk score - what it means, how is it calculated.',
      icon: Icons.info,
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
      <Text variant="headingMd" fontWeight="bold">
        DATA INSIGHTS : {formattedIndicator}
      </Text>
      <Divider className="mt-2" />
      <div className="mb-5 mt-5 flex flex-col">
        <Text variant="headingMd" fontWeight="bold" className="mb-4">
          {formattedIndicator} FOR ALL REVENUE CIRCLES
        </Text>
        {revenueData && (
          <div className="flex h-96 flex-col overflow-y-auto border-1 border-solid border-baseGraySlateSolid10 pt-3">
            {/* {Object.entries(revenueData).map(([district, value]) => ( */}
            {chartData.map((item, index) => (
              <DistrictBar
                key={index}
                district={item['revenue-circle']}
                value={item['composite-score']}
              />
            ))}
          </div>
        )}

        <div className="mt-5">
          {list.map((indicator, index) => (
            <IndicatorDescription
              key={index}
              title={indicator.title}
              desc={indicator.desc}
              icon={indicator.icon}
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
  icon,
}: {
  title: any;
  desc: any;
  icon: any;
}) => {
  return (
    <div className="flex flex-col">
      <div className="mb-2 mt-5 flex items-center gap-3">
        <Icon source={icon} color="default" size={6} />
        <Text fontWeight="bold" variant="headingMd" className="pl-2">
          {title}
        </Text>
      </div>
      <div>{desc}</div>
    </div>
  );
};
