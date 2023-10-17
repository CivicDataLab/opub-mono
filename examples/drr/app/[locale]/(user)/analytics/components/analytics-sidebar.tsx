'use client';

import React from 'react';
import { Checkbox } from 'opub-ui';
import { ANALYTICS_INDICATORS} from '@/config/graphql/analaytics-queries';

import { cn } from '@/lib/utils';
import styles from './AnalyticsDashboard.module.scss';
import { useQuery } from '@tanstack/react-query';
import { GraphQL } from '@/lib/api';

const indicators = [
  {
    label: 'Need for Preparedness',
    value: 'need-for-preparedness',
    nested: [
      {
        label: 'Hazard',
        value: 'hazard',
      },
    ],
  },
  {
    label: 'Exposure - Demographic',
    value: 'exposure',
  },
  {
    label: 'Vulnerability - Losses & Damages',
    value: 'vulnerability',
  },
  {
    label: 'Coping Capacity - Infrastructure',
    value: 'infrastructure',
  },
  {
    label: 'Coping Capacity - Governance',
    value: 'governance',
  },
];
export function AnalyticsDashboardSidebar() {

  const { data } = useQuery([`indicators`], () =>
  GraphQL('analytics', ANALYTICS_INDICATORS)
);

  return (
    <aside
      className={cn(
        'pt-5 pr-2 overflow-hidden bg-surfaceDefault shadow-basicMd',
        'hidden z-1 shadow-inset basis-[320px] shrink-0 md:block',
        styles.Collapse
      )}
    >
      <div className="px-4 py-1">
        {data?.indicators.map((indicator, index) =>
            <Checkbox
              key={index}
              value={indicator?.slug || 'NA'}
              name="checkbox"
              title="Select an indicator"
            >
              {indicator.name}
            </Checkbox>
        )}
      </div>
    </aside>
  );
}
