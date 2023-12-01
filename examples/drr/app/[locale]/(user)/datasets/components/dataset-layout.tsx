'use client';

// import { graphql } from '@/gql';
import { Datasets, FilterProps } from '@/types';
import { Breadcrumbs, Icon, Text, TextField } from 'opub-ui';

import { datasetsPageHeader } from '@/config/consts.ts';
import { Icons } from '@/components/icons';
import { DatasetCard } from './DatasetCard';
import { FilterBox } from './FilterBox';

export function Content({
  data,
  filters,
}: {
  data: Datasets[];
  filters: FilterProps[];
}) {
  const breadcrumbs = [
    {
      label: 'Assam Homepage',
      href: '/',
    },
    {
      label: 'Datasets',
      href: `/datasets`,
    },
  ];

  return (
    <div className="grid gap-4">
      <div className="container mt-6">
        <Text variant="heading2xl">{datasetsPageHeader}</Text>
      </div>

      <div className="container">
        <div className="mt-2 mb-6 flex gap-8 bg-surfaceHighlightSubdued border-b-1 items-center pt-3 pb-4 pl-8 pr-8">
          <Text variant="headingSm" as="h1" alignment="center" color="subdued">
            Showing 3007 datasets
          </Text>
          <div className="w-7/12">
            <TextField
              prefix={<Icon source={Icons.search} />}
              placeholder="Search"
              name="Search"
              label="Search"
              type="search"
              labelHidden
            />
          </div>

          <Text variant="headingSm" as="h1" alignment="center" color="subdued">
            SORT BY :
          </Text>
        </div>
      </div>

      <div className="container flex gap-14">
        <div className=" w-1/5">
          <FilterBox filters={filters} />
        </div>
        <div className="flex w-4/5 flex-col gap-4 rounded shadow-card border-solid p-6">
          {data.map((dataset, index) => (
            <DatasetCard
              key={index}
              title={dataset?.title || 'NA'}
              source={dataset?.source || 'NA'}
              description={dataset?.description || 'NA'}
              lastUpdated={dataset?.metaData?.lastUpdated || 'NA'}
              updateFrequency={dataset?.metaData?.updateFrequency || 'NA'}
              period={dataset?.metaData?.period}
              fileTypes={dataset?.metaData?.fileTypes}
              tags={dataset?.metaData?.tags}
              slug={dataset?.slug || 'NA'}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
