'use client';

import React from 'react';
import {useSearchParams } from 'next/navigation';
import { Divider, ProgressBar, Text } from 'opub-ui';

import { cn, deSlugify } from '@/lib/utils';

export function SidebarDefaultLayout({ chartData }: any) {
  const searchParams = useSearchParams();
  const indicator = searchParams.get('indicator');

  const formattedIndicator = indicator && deSlugify(indicator).toUpperCase();
  const revenueData = indicator && chartData['2022_11'][indicator];

  return (
    <aside
      className={cn(
        'p-4',
        'pr-0 overflow-hidden bg-surfaceDefault shadow-basicMd',
        'hidden z-1 shadow-inset basis-[500px] shrink-0 md:block',
        'border-r-1 border-solid border-borderSubdued',
        'overflow-y-auto'
      )}
    >
      <Text variant="headingMd" fontWeight="bold">
        DATA INSIGHTS : {formattedIndicator}
      </Text>
      <Divider className="mt-2" />
      <div className="flex flex-col mt-5 mb-5">
        <Text variant="headingMd" fontWeight="bold" className="mb-4">
          {formattedIndicator} FOR ALL REVENUE CIRCLES
        </Text>
        {revenueData && (
          <div className="flex flex-col border border-solid border-textHighlight">
            {Object.entries(revenueData).map(([district, value]) => (
              <DistrictBar
                key={district}
                district={district}
                value={value as number}
              />
            ))}
          </div>
        )}
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
    <div className="flex items-center gap-2 mb-1 pl-6">
      <div className=" basis-1/4">
        <Text variant="bodySm">{district}</Text>
      </div>

      <div className=" basis-2/4">
        <ProgressBar size="small" color="critical" value={(value / 6) * 100} />
      </div>
    </div>
  );
};