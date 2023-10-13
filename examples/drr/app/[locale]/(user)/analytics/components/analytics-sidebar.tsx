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

//   const { data } = useQuery([`indicators`], () =>
//   GraphQL('analytics', ANALYTICS_INDICATORS)
// );

  return (
    <aside
      className={cn(
        'pt-5 pr-2 overflow-hidden bg-surface',
        'hidden z-1 shadow-inset basis-[320px] shrink-0 md:block',
        styles.Collapse
      )}
    >
      <div className="px-4 py-1">
        {indicators.map((indicator, index) =>
          indicator?.nested ? (
            <React.Fragment>
              <Checkbox
                key={index}
                value={indicator.value}
                name="checkbox"
                title="Select an indicator"
              >
                {indicator.label}
              </Checkbox>
              {indicator?.nested.map((nestedIndicator, nestedIndex) => (
                <div className="px-2">
                  <Checkbox
                    key={nestedIndex}
                    value={nestedIndicator.value}
                    name="checkbox"
                  >
                    {nestedIndicator.label}
                  </Checkbox>
                </div>
              ))}
            </React.Fragment>
          ) : (
            <Checkbox
              key={index}
              value={indicator.value}
              name="checkbox"
              title="Select an indicator"
            >
              {indicator.label}
            </Checkbox>
          )
        )}
      </div>
    </aside>
  );
}
