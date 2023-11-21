'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@radix-ui/react-collapsible';
import { useQuery } from '@tanstack/react-query';
import { Icon, RadioGroup, RadioItem, Text } from 'opub-ui';

import {
  ANALYTICS_INDICATORS,
  ANALYTICS_INDICATORS_BY_CATEGORY,
} from '@/config/graphql/analaytics-queries';
import { GraphQL } from '@/lib/api';
import { cn } from '@/lib/utils';
import Icons from '@/components/icons';
import styles from './AnalyticsDashboard.module.scss';
import RadioButton from './RadioButton';

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

type IndicatorMapType = {
  [key: string]: Array<{
    indicator: string;
    'sub-indicator': string | null;
  }>;
};

export function AnalyticsDashboardSidebar() {
  const { data }: Data = useQuery([`indicatorsByCategory`], () =>
    GraphQL('analytics', ANALYTICS_INDICATORS_BY_CATEGORY)
  );

  const indicatorsData = useQuery([`indicators`], () =>
    GraphQL('analytics', ANALYTICS_INDICATORS)
  );

  //* To Get the Indicators in a particular format so that they can be used in URL formation check line no . 163 to 168

  /* 
    Sample on how convertedData would look 
    {
      'Damages and Losses Indicators': [
        {
          indicator: 'damages-and-losses',
          'sub-indicator': null,
        },
        {
          indicator: 'damages-and-losses',
          'sub-indicator': 'population-affected',
        },
        {
          indicator: 'damages-and-losses',
          'sub-indicator': 'crop-area-affected',
        },
      ]
    }
  */

  const indicators = indicatorsData && indicatorsData?.data?.indicators;
  let convertedData: IndicatorMapType | undefined = undefined;
  if (indicators) {
    indicators.forEach((item) => {
      const category = item.category;
      const slug = item.slug;
      const parentName = item.parent ? item.parent.name : null;

      if (convertedData && !convertedData[category || 'Indicator']) {
        convertedData[category || 'Indicator'] = [];
      }

      let subIndicator = null;
      if (parentName && parentName !== 'Composite Score') {
        subIndicator = slug;
      }

      convertedData &&
        convertedData[category || 'Indicator'].push({
          indicator: slug || 'NA',
          'sub-indicator': subIndicator || 'NA',
        });
    });
  }

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
        'pr-2 overflow-hidden bg-surfaceDefault shadow-basicMd',
        'hidden z-1 shadow-inset basis-[320px] shrink-0 md:block',
        styles.Collapse
      )}
    >
      <div className="px-4 h-full pt-12 bg-baseCyanSolid1 border-r-1 border-solid">
        {structuredData && (
          <IndicatorCheckboxList
            indicators={convertedData}
            data={structuredData}
          />
        )}
      </div>
    </aside>
  );
}

export const IndicatorCheckboxList = ({
  data,
  indicators,
}: {
  data: IndicatorData;
  indicators: IndicatorMapType | undefined;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const indicatorParam = searchParams.get('indicator');

  const [radioValue, setRadioValue] = React.useState(indicatorParam);

  return data?.indicatorsByCategory?.map((indicator, index: React.Key) => {
    const categoryName = Object.keys(indicator)[0];
    const children = indicator[categoryName];
    return (
      <Collapsible defaultOpen key={index} className="rounded-1">
        <div className=" bg-surfaceHighlightSubdued max-w-full min-w-max bg-surfaceNeutral rounded-1 border-t-0 border-1 border-solid border-borderSubdued mb-5">
          <CollapsibleTrigger className={styles.CollapseTrigger}>
            <Text className="text-textDefault" fontWeight="bold" key={index}>
              {categoryName}
            </Text>
            <Icon source={Icons.down} />
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent className="pb-4 px-2 max-w-full min-w-max">
          <div className="flex flex-col">
            {Object.entries(children).map(([key, value], index) => (
              <RadioButton
                changed={() => {
                  if (indicators) {
                    indicators[categoryName][index]['sub-indicator']
                      ? router.push(
                          `/analytics/?indicator=${indicators[categoryName][index]['indicator']}&sub-indicator=${indicators[categoryName][index]['sub-indicator']}`
                        )
                      : router.push(
                          `/analytics/?indicator=${indicators[categoryName][index]['indicator']}`
                        ),
                      setRadioValue(value);
                  }
                }}
                key={key}
                id={value}
                isSelected={value === radioValue}
                label={key}
                value={key}
              />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  });
};
