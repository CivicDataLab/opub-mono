'use client';

// import { graphql } from '@/gql';
import { FilterProps , Datasets } from '@/types';
import { Breadcrumbs, Icon, Text, TextField } from 'opub-ui';

import { datasetsPageHeader } from '@/config/consts';
import { Icons } from '@/components/icons';
import { DatasetCard } from './DatasetCard';
import { FilterBox } from './FilterBox';

export function Content({ data , filters }: { data: Datasets[] , filters: FilterProps[] }) {
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
      <Text className="ps-6 pt-4" variant="headingLg">
        {datasetsPageHeader}
      </Text>
      <div className="bg-surface py-3.5 ps-6">
        <Breadcrumbs crumbs={breadcrumbs} />
      </div>
      <div className="container flex gap-14">
        <FilterBox filters={filters} />
        <div className="flex w-full flex-col gap-6">
          <TextField
            prefix={<Icon source={Icons.search} />}
            placeholder="Search"
            name="Search"
            label="Search"
            type="search"
            labelHidden
          />
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
