import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { Button, Divider, Icon, ProgressBar, Text } from 'opub-ui';

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
  return (
    <section className="mt-7">
      <Text variant="bodyLg" fontWeight="bold">
        REVENUE CIRCLE SCORE
      </Text>
      <Accordion.Root type="single" collapsible>
        {revenueCircleData.map((item: any, index: number) => (
          <Accordion.Item
            key={`revenue-circle-${index}`}
            value={`revenue-circle-${index}`}
            className="mt-4"
          >
            <Text variant="headingLg" fontWeight="regular">
              {item?.['revenue circle']}
            </Text>
            <div className="flex items-center">
              <div className=" mr-3 basis-2/4">
                <ProgressBar
                  size="small"
                  color="critical"
                  value={(item?.[indicator] / 6) * 100}
                />
              </div>
              <Text variant="heading2xl">{item?.[indicator]}</Text>
              /6
              <Accordion.Trigger
                className={cn(styles.AccordionItem, 'ml-auto')}
              >
                <Icon
                  className={cn(styles.AccordionChevron)}
                  source={Icons.down}
                  size={80}
                />
              </Accordion.Trigger>
            </div>
            <Accordion.Content className="px-3 pb-4 md:px-6">
              {['flood-hazard', 'vulnerability', 'government-response'].map(
                (scoreType) =>
                  item?.[scoreType] !== undefined && (
                    <ScoreInfo
                      key={scoreType}
                      label={`${deSlugify(scoreType)} Score`}
                      value={item?.[scoreType]}
                    />
                  )
              )}
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </section>
  );
};

interface ScoreProps {
  label: string;
  value: string;
}

const ScoreInfo = ({ label, value }: ScoreProps) => (
  <div className="mt-2">
    {label} :<strong className="pl-2">{value}/6</strong>
  </div>
);
