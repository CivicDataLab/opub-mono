import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { Icon, ProgressBar, Text, Tooltip } from 'opub-ui';

import { RiskColorMap } from '@/config/consts';
import { cn, deSlugify } from '@/lib/utils';
import { Icons } from '@/components/icons';
import styles from './styles.module.scss';

interface RevenueProps {
  revenueCircleData: any;
  indicator: string;
}

export const RevenueCircle = ({
  revenueCircleData,
  indicator,
}: RevenueProps) => {
  const clonedRevenueCircleData = structuredClone(revenueCircleData[0]);
  delete clonedRevenueCircleData['revenue circle'];
  delete clonedRevenueCircleData['revenue-circle-code'];
  delete clonedRevenueCircleData[indicator];

  const FactorVariables = Object.keys(clonedRevenueCircleData);

  return (
    <Accordion.Root type="single" collapsible>
      {revenueCircleData.map((item: any, index: number) => (
        <Accordion.Item
          key={`revenue-circle-${index}`}
          value={`revenue-circle-${index}`}
          className="mt-4"
        >
          <div className="flex items-center gap-3">
            <Text
              variant="headingMd"
              fontWeight="regular"
              className="basis-1/3"
            >
              {item?.['revenue circle']}
            </Text>
            <ProgressBar
              size="small"
              customColor={RiskColorMap[item?.[indicator]]}
              value={(item?.[indicator] / 6) * 100}
            />

            <Accordion.Trigger className={cn(styles.AccordionItem, 'ml-auto')}>
              <Tooltip
                content={
                  <div className="flex flex-col px-2 py-1">
                    <Text variant="headingXl">{item?.[indicator]} / 6 </Text>
                    <Text>HIGH RISK</Text>
                  </div>
                }
              >
                <Icon
                  className={cn(styles.AccordionChevron)}
                  source={Icons.down}
                  size={20}
                />
              </Tooltip>
            </Accordion.Trigger>
          </div>

          <Accordion.Content className="px-3 pb-4 md:px-6">
            {FactorVariables.map(
              (scoreType) =>
                item?.[scoreType] !== undefined && (
                  <ScoreInfo
                    key={scoreType}
                    indicator={indicator}
                    label={`${deSlugify(scoreType)} Score`}
                    value={item?.[scoreType]}
                  />
                )
            )}
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
};

interface ScoreProps {
  label: string;
  value: string;
  indicator: string;
}

export const ScoreInfo = ({ label, value, indicator }: ScoreProps) => (
  <div className="mt-2">
    {label} :{' '}
    {indicator === 'risk-score' ? (
      <strong className="pl-2">{value}/6</strong>
    ) : (
      <strong className="pl-2">{parseFloat(value).toFixed(2)}</strong>
    )}
  </div>
);
