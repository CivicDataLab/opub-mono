import React from 'react';
import Link from 'next/link';
import { Icon, Text } from 'opub-ui';
import { BarChart } from 'opub-ui/viz';

import Icons from '@/components/icons';
import { ContentCard, ProgressCard } from '../../components/Card';
import { IOverview } from './scheme-layout';

export const Overview = React.forwardRef(
  ({ data }: { data?: IOverview }, ref: any) => {
    if (!data) return null;

    return (
      <div className="flex flex-col gap-4" ref={ref}>
        <Card heading={data.targetTitle}>
          {data.targets.map((target, index) => {
            return <SelectCard type={target.type} key={index} data={target} />;
          })}
        </Card>

        <Card heading={data.profileTitle}>
          {data.profiles &&
            data.profiles.map((profile, index) => {
              return (
                <SelectCard key={index} type={profile.type} data={profile} />
              );
            })}
        </Card>

        <Card heading={data.performanceTitle}>
          {data.performances.map((performance, index) => {
            return (
              <SelectCard
                type={performance.type}
                key={index}
                data={performance}
              />
            );
          })}
        </Card>
      </div>
    );
  }
);

function SelectCard({ type, data, link }: any) {
  const series = [
    {
      name: 'Bar Chart',
      data: data.data?.values || [],
      type: 'bar',
    },
  ];

  switch (type) {
    case 'number':
      return (
        <ContentCard
          value={data.value}
          label={data.label}
          className="bg-surfaceSubdued"
          // description={data.description}
        />
      );
    case 'progress':
      return (
        <ProgressCard
          value={data.value}
          label={data.label}
          min={data.min}
          max={data.max}
          className="bg-surfaceSubdued"
          // description={data.description}
        />
      );
    case 'bar':
      return (
        <div className="flex grow flex-col justify-between rounded-1 border-1 border-solid border-borderSubdued bg-surfaceSubdued p-4 md:basis-1/3">
          <Text variant="bodyLg" fontWeight="medium">
            {data.label}
          </Text>
          <>
            <BarChart
              options={{
                xAxis: {
                  type: 'category',
                  data: data.data.xAxis,
                },
                yAxis: {
                  type: 'value',
                },
                series: series,
              }}
            />
          </>
          {/* <Text variant="bodyMd">{data.description}</Text> */}
          {link && (
            <Link
              href={`?tab=explorer`}
              className="flex items-center justify-between rounded-1 text-textInteractive hover:underline"
            >
              <Text variant="bodyMd" fontWeight="medium" color="inherit">
                View on Explorer
              </Text>
              <Icon source={Icons.right} />
            </Link>
          )}
        </div>
      );
    default:
      return null;
  }
}

const Card = ({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) => {
  return (
    <section className="rounded-2 bg-surfaceDefault p-3 shadow-basicMd md:p-6">
      <Text variant="headingXl" as="h3">
        {heading}
      </Text>
      <div className="mt-4 flex flex-wrap gap-2 md:mt-6 md:gap-4">
        <>{children}</>
      </div>
    </section>
  );
};
