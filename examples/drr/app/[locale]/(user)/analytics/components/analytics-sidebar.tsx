'use client';

import React from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@radix-ui/react-collapsible';
import { useQuery } from '@tanstack/react-query';
import { Checkbox, Icon, Text } from 'opub-ui';

import { ANALYTICS_INDICATORS_BY_CATEGORY } from '@/config/graphql/analaytics-queries';
import { GraphQL } from '@/lib/api';
import { cn } from '@/lib/utils';
import Icons from '@/components/icons';
import styles from './AnalyticsDashboard.module.scss';

type IndicatorsByCategory = {
  [category: string]: {
    [indicator: string]: string;
  };
};

type IndicatorData = {
  indicatorsByCategory: IndicatorsByCategory[];
};

type Data = {
  data: IndicatorData | undefined;
};

export function AnalyticsDashboardSidebar() {
  const { data }: Data = useQuery([`indicators`], () =>
    GraphQL('analytics', ANALYTICS_INDICATORS_BY_CATEGORY)
  );

  //* To Get the Composite Score on the top of the data sequence
  const categories = data && data?.indicatorsByCategory;
  let structuredData: typeof data;
  if (categories) {
    let compositeScoreIndex = -1;
    // Find the index of the "Composite Score" category
    for (let i = 0; i < categories.length; i++) {
      if ('Main' in categories[i]) {
        compositeScoreIndex = i;
        break;
      }
    }
    if (compositeScoreIndex !== -1) {
      // Create a new array with "Composite Score" first
      const orderedCategories = [categories[compositeScoreIndex]];

      // Add the remaining categories in order
      for (let i = 0; i < categories.length; i++) {
        if (i !== compositeScoreIndex) {
          orderedCategories.push(categories[i]);
        }
      }

      // Create a new object with the ordered categories
      structuredData = {
        indicatorsByCategory: orderedCategories,
      };
    }
  }

  return (
    <aside
      className={cn(
        'pt-5 pr-2 overflow-hidden bg-surfaceDefault shadow-basicMd',
        'hidden z-1 shadow-inset basis-[320px] shrink-0 md:block',
        styles.Collapse
      )}
    >
      <div className="px-4 py-1">
        {structuredData && <IndicatorCheckboxList data={structuredData} />}
      </div>
    </aside>
  );
}

export const IndicatorCheckboxList = ({ data }: { data: IndicatorData }) => {
  return data?.indicatorsByCategory?.map((indicator, index: React.Key) => {
    const categoryName = Object.keys(indicator)[0];
    const children = indicator[categoryName];

    //* To not have Collapisble for Main Indicator i.e. Composite Score
    return categoryName === 'Main' ? (
      <div className="mt-4 flex flex-col gap-3">
        {Object.entries(children).map(([key, value]) => (
          <Checkbox
            key={key}
            value={value || 'NA'}
            name="checkbox"
            title="Select an indicator"
          >
            {key}
          </Checkbox>
        ))}
      </div>
    ) : (
      <Collapsible
        defaultOpen
        key={index}
        className="border-borderSubdued border-1 border-solid rounded-1"
      >
        <div className="max-w-full min-w-max bg-surfaceNeutral rounded-1 border-t-0 border-1 border-solid border-borderSubdued">
          <CollapsibleTrigger className={styles.CollapseTrigger}>
            {/* <Checkbox
              key={index}
              value={categoryName}
              name="checkbox"
              title="Select an indicator"
            >
              {categoryName}
            </Checkbox> */}
            <Text key={index}>{categoryName}</Text>
            <Icon source={Icons.down} />
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent className="pb-4 px-2 max-w-full min-w-max">
          <div className="mt-4 flex flex-col gap-3">
            {Object.entries(children).map(([key, value]) => (
              <Checkbox
                key={key}
                value={value || 'NA'}
                name="checkbox"
                title="Select an indicator"
              >
                {key}
              </Checkbox>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  });
};
