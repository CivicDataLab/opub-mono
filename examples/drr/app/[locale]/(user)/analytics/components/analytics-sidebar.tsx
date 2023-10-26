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

import { ANALYTICS_INDICATORS_BY_CATEGORY } from '@/config/graphql/analaytics-queries';
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

const IndicatorMap: IndicatorMapType = {
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
  ],
  'Exposure Indicators': [
    {
      indicator: 'exposure',
      'sub-indicator': null,
    },
    {
      indicator: 'exposure',
      'sub-indicator': 'population',
    },
    {
      indicator: 'exposure',
      'sub-indicator': 'sex-ratio',
    },
  ],
  'Vulnerability Indicators': [
    {
      indicator: 'vulnerability',
      'sub-indicator': null,
    },
  ],
  'Flood Hazard Indicators': [
    {
      indicator: 'flood-hazard',
      'sub-indicator': null,
    },
    {
      indicator: 'flood-hazard',
      'sub-indicator': 'elevation',
    },
    {
      indicator: 'flood-hazard',
      'sub-indicator': 'inundation',
    },
    {
      indicator: 'flood-hazard',
      'sub-indicator': 'rainfall',
    },
    {
      indicator: 'flood-hazard',
      'sub-indicator': 'river-water-level',
    },
  ],
  'Governance Response Indicators': [
    {
      indicator: 'governance-response',
      'sub-indicator': null,
    },
  ],
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
        'pr-2 overflow-hidden bg-surfaceDefault shadow-basicMd',
        'hidden z-1 shadow-inset basis-[320px] shrink-0 md:block',
        styles.Collapse
      )}
    >
      <div className="px-4 pt-12 bg-baseCyanSolid1 border-r-1 border-solid">
        {structuredData && <IndicatorCheckboxList data={structuredData} />}
      </div>
    </aside>
  );
}

export const IndicatorCheckboxList = ({ data }: { data: IndicatorData }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const indicatorParam = searchParams.get('indicator');

  const [radioValue, setRadioValue] = React.useState(indicatorParam);

  return data?.indicatorsByCategory?.map((indicator, index: React.Key) => {
    const categoryName = Object.keys(indicator)[0];
    const children = indicator[categoryName];

    //* To not have Collapisble for Main Indicator i.e. Composite Score
    return categoryName === 'Main' ? (
      <div className="flex flex-col gap-3">
        {Object.entries(children).map(([key, value]) => (
          // <RadioGroup
          //   onChange={(val, name) => {
          //     router.push(`/analytics/?indicator=${val}`);
          //   }}
          //   name={key}
          //   aria-checked={indicatorParam === value ? 'true' : 'false'}
          //   key={key}
          //   // defaultValue={value}
          // >
          //   <RadioItem value={value}>{key}</RadioItem>
          //   {/* <RadioItem value="23">Radio 2</RadioItem> */}
          // </RadioGroup>
          <RadioButton
            changed={() => {
              router.push(`/analytics/?indicator=${value}`),
                setRadioValue(value);
            }}
            key={key}
            id={value}
            isSelected={value === radioValue}
            label={key}
            value={value}
          />
        ))}
      </div>
    ) : (
      <Collapsible
        defaultOpen
        key={index}
        className="rounded-1"
      >
        <div className=" bg-surfaceHighlightSubdued max-w-full min-w-max bg-surfaceNeutral rounded-1 border-t-0 border-1 border-solid border-borderSubdued">
          <CollapsibleTrigger className={styles.CollapseTrigger}>
            <Text key={index} >{categoryName}</Text>
            <Icon source={Icons.down} />
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent className="pb-4 px-2 max-w-full min-w-max">
          <div className="flex flex-col">
            {Object.entries(children).map(([key, value], index) => (
              <RadioButton
                changed={() => {
                  IndicatorMap[categoryName][index]['sub-indicator']
                    ? router.push(
                        `/analytics/?indicator=${IndicatorMap[categoryName][index]['indicator']}&sub-indicator=${IndicatorMap[categoryName][index]['sub-indicator']}`
                      )
                    : router.push(
                        `/analytics/?indicator=${IndicatorMap[categoryName][index]['indicator']}`
                      ),
                    setRadioValue(value);
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
