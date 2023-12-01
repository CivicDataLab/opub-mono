import React from 'react';
import { ContentCard, ProgressCard } from '../../components/Card';
import { IOverview } from './scheme-layout';
import { Icon, Text } from 'opub-ui';
import { BarChart } from 'opub-viz';
import Link from 'next/link';
import Icons from '@/components/icons';

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
        <div className="flex flex-col justify-between md:basis-1/3 grow p-4 bg-surfaceSubdued rounded-1 border-1 border-solid border-borderSubdued">
          <Text variant="bodyLg" fontWeight="medium">
            {data.label}
          </Text>
          <>
            <BarChart xAxis={data.data.xAxis} series={series} />
          </>
          {/* <Text variant="bodyMd">{data.description}</Text> */}
          {link && (
            <Link
              href={`?tab=explorer`}
              className="rounded-1 flex items-center justify-between text-textInteractive hover:underline"
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
    <section className="p-3 md:p-6 bg-surfaceDefault rounded-2 shadow-basicMd">
      <Text variant="headingXl" as="h3">
        {heading}
      </Text>
      <div className="mt-4 md:mt-6 flex flex-wrap gap-2 md:gap-4">
        <>{children}</>
      </div>
    </section>
  );
};
