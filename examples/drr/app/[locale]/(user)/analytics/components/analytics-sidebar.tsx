'use client';

import React from 'react';
import { useRouter , usePathname ,  useSearchParams } from 'next/navigation';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@radix-ui/react-collapsible';
import { useQuery } from '@tanstack/react-query';
import { Icon, Text } from 'opub-ui';
import { IconButton } from 'opub-ui/src';

import {
  ANALYTICS_INDICATORS_BY_CATEGORY,
  ANALYTICS_TIME_PERIODS,
} from '@/config/graphql/analaytics-queries';
import { GraphQL } from '@/lib/api';
import { cn, deSlugify, formatDateString, slugify } from '@/lib/utils';
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

export function AnalyticsDashboardSidebar({
  isCollapsed,
}: {
  isCollapsed: Boolean;
}) {

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams()
  const indicator = searchParams.get('indicator');
  const subIndicator = searchParams.get('sub-indicator');
  const timePeriod = searchParams.get('time-period');
  const [timePeriodRadioValue, setTimePeriodRadioValue] =
    React.useState(timePeriod);

  const { data }: Data = useQuery(
    [`indicatorsByCategory`],
    () => GraphQL('analytics', ANALYTICS_INDICATORS_BY_CATEGORY),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  const timePeriodData = useQuery(
    [`timePeriods`],
    () => GraphQL('analytics', ANALYTICS_TIME_PERIODS),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  let convertedData: IndicatorMapType | undefined = {};

  //* To Get the Composite Score on the top of the data sequence
  const categories = data && data?.indicatorsByCategory;
  let structuredData: typeof data;
  if (categories) {
    let compositeScoreIndex = -1;
    // Find the index of the "Composite Score" category
    for (let i = 0; i < categories.length; i++) {
      if ('Composite Score' in categories[i]) {
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

    //* To Get the Indicators in a particular format so that they can be used in URL formation check line no . 176 to 180

    /* 
    Sample on how convertedData would look 
    {
      'Damages and Losses': [
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
    for (let item of categories) {
      let category = Object.keys(item)[0];

      convertedData[category] = [];

      // Flag to track the first nested key-value pair
      let isFirst = true;

      for (let subCategory in item[category]) {
        let indicator = item[category][subCategory];

        let convertedItem = {
          indicator: isFirst
            ? indicator
            : item[category][Object.keys(item[category])[0]],
          'sub-indicator': isFirst ? null : indicator,
        };

        // Set the flag to false after the first iteration
        isFirst = false;

        convertedData[category].push(convertedItem);
      }
    }
  }

  return (
    <aside
      className={cn(
        'pr-0 overflow-hidden bg-surfaceDefault shadow-basicMd',
        'hidden z-1 shadow-inset basis-[320px] shrink-0 md:block',
        isCollapsed && 'basis-[32px]',
        'border-r-1 border-solid border-borderSubdued',
        styles.Collapse
      )}
    >
      <div className="pt-16">
        <span
          className={cn(
            ' pl-0 rounded justify-end items-center',
            isCollapsed && 'hidden'
          )}
        >
          {/* <div className="flex pl-5 pt-1 pr-4 pb-0.5 items-start gap-1.5 mb-6 ">
            <IconButton color="highlight" icon={Icons.iconHelpSquare}>
              Help Square
            </IconButton>
            <Text className="text-textHighlight pt-1" variant="headingMd">
              Tutorial Mode
            </Text>
          </div> */}
        </span>
        <Collapsible defaultOpen className={cn(isCollapsed && 'hidden')}>
          <div className="pl-4 bg-surfaceSelected max-w-full min-w-max bg-surfaceNeutral border-b-1 border-solid border-borderSubdued mb-5">
            <CollapsibleTrigger className={styles.CollapseTrigger}>
              <Text className="text-textSubdued" fontWeight="bold">
                Select an indicator
              </Text>
              <Icon color="subdued" source={Icons.minus} />
            </CollapsibleTrigger>
          </div>

          <CollapsibleContent className="pb-4 max-w-full data-[state=open]:mt-[-12px]">
            <div
              className={cn(
                'px-4 h-full pt-px bg-baseCyanSolid1',
                isCollapsed && 'hidden'
              )}
            >
              {structuredData && (
                <IndicatorCheckboxList
                  indicators={convertedData}
                  data={structuredData}
                />
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible
          defaultOpen
          className={cn(isCollapsed && 'hidden', 'mb-6 ')}
        >
          <div className="pl-4 bg-surfaceSelected max-w-full bg-surfaceNeutral border-b-1 border-solid border-borderSubdued mb-5">
            <CollapsibleTrigger className={styles.CollapseTrigger}>
              <Text className="text-textSubdued" fontWeight="bold">
                Select a time period
              </Text>
              <Icon color="subdued" source={Icons.minus} />
            </CollapsibleTrigger>
          </div>

          <CollapsibleContent className="pb-4 px-2 max-w-full data-[state=open]:mt-[-12px]">
            <div className="px-4 h-full pt-4">
              {timePeriodData?.data?.getDataTimePeriods.map((item, index) => (
                <RadioButton
                  changed={() => {
                    router.push( subIndicator ? `${pathname}?indicator=${indicator}&sub-indicator=${subIndicator}&time-period=${item?.value}` : `${pathname}?indicator=${indicator}&time-period=${item?.value}`);
                    setTimePeriodRadioValue(item?.value);
                  }}
                  key={`${index}_${item?.value}`}
                  id={`${item?.value}_index`}
                  isSelected={item?.value === timePeriodRadioValue}
                  label={formatDateString(item?.value)}
                  value={item?.value}
                />
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        <div className="flex flex-col gap-4 p-0 pb-4 mb-8">
          <div
            className={cn(
              'flex rounded gap-1.5 pl-4 pr-52 pt-1 pb-0.5 items-center',
              isCollapsed && 'hidden'
            )}
          >
            <IconButton
              color="highlight"
              icon={Icons.iconShare}
              className={cn(
                'bg-surfaceHighlightDefault p-2 hover:bg-surfaceHighlightHovered',
                isCollapsed && 'hidden'
              )}
            >
              Share
            </IconButton>
            <Text className="text-textHighlight" variant="headingMd">
              Share
            </Text>
          </div>

          <div
            className={cn(
              'flex rounded gap-1.5 items-center pl-4 pr-52 pt-1 pb-0.5',
              isCollapsed && 'hidden'
            )}
          >
            <IconButton
              color="highlight"
              icon={Icons.download}
              className={cn(
                'bg-surfaceHighlightDefault p-2 hover:bg-surfaceHighlightHovered',
                isCollapsed && 'hidden'
              )}
            >
              Download
            </IconButton>
            <Text className="text-textHighlight" variant="headingMd">
              Download
            </Text>
          </div>
          <div
            className={cn(
              'flex rounded gap-1.5 items-center pl-4 pr-40 pt-1 pb-0.5',
              isCollapsed && 'hidden'
            )}
          >
            <IconButton
              color="highlight"
              icon={Icons.iconChartBar}
              className={cn(
                'bg-surfaceHighlightDefault p-2 hover:bg-surfaceHighlightHovered',
                isCollapsed && 'hidden'
              )}
            >
              View Charts
            </IconButton>
            <Text className="text-textHighlight flex" variant="headingMd">
              View Charts
            </Text>
          </div>
        </div>
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
  const timePeriod = searchParams.get('time-period');
  const [radioValue, setRadioValue] = React.useState(indicatorParam);

  return data?.indicatorsByCategory?.map((indicator, index: Number) => {
    const categoryName = Object.keys(indicator)[0];
    const children = indicator[categoryName];
    return (
      <Collapsible
        defaultOpen={
          indicators &&
          indicators[categoryName][0]['indicator'] === indicatorParam
        }
        key={`${index}`}
        className="rounded-1"
      >
        <div className=" bg-surfaceHighlightSubdued max-w-full min-w-max bg-surfaceNeutral rounded-1 border-t-0 border-1 border-solid border-borderSubdued mb-5">
          <CollapsibleTrigger className={styles.CollapseTrigger}>
            <Text
              className="text-textDefault"
              fontWeight="bold"
              key={`${index}`}
            >
              {categoryName}
            </Text>
            <Icon source={Icons.down} />
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent className="pb-4 px-2 max-w-full min-w-max data-[state=open]:mt-[-12px]">
          <div className="flex flex-col">
            {Object.entries(children).map(([key, value], index) => (
              <>
                <RadioButton
                  changed={() => {
                    if (indicators) {
                      indicators[categoryName][index]['sub-indicator']
                        ? router.push(
                            `/analytics/?indicator=${indicators[categoryName][index]['indicator']}&sub-indicator=${indicators[categoryName][index]['sub-indicator']}&time-period=${timePeriod}`
                          )
                        : router.push(
                            `/analytics/?indicator=${indicators[categoryName][index]['indicator']}&time-period=${timePeriod}`
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
                {key === 'Composite Score' && (
                  <Text className="text-variablesIconInteractive mx-8">
                    *Mitigation & Preparedness
                  </Text>
                )}
              </>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  });
};
