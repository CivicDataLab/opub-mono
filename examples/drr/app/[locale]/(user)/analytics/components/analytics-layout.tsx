'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { RadioGroup, RadioItem, Select, Separator, Text } from 'opub-ui';

import { DistrictColumnData, RevenueColumnData } from '@/config/consts.ts';
import {
  ANALYTICS_REVENUE_TABLE_DATA,
  ANALYTICS_TABLE_DATA,
} from '@/config/graphql/analaytics-queries';
import { GraphQL } from '@/lib/api';
import { deSlugify } from '@/lib/utils';
import { MapComponent } from './ChoroplethMap';
import { FrimsDataTable } from './FrimsDataTable';
import { TableComponent } from './TableComponent';

const Boundaries = [
  {
    name: 'Revenue Circle Boundaries',
    id: 'revenue-circle',
  },
  {
    name: 'District Boundaries',
    id: 'district',
  },
];

export function Content({ indicator }: { indicator: string }) {
  const [boundary, setBoundary] = React.useState('revenue-circle');

  const DropdownOptions = [
    {
      label:
        boundary === 'district' ? 'Select District' : 'Select Revenue Circle',
      value:
        boundary === 'district' ? 'Select District' : 'Select Revenue Circle',
      disabled: true,
    },
    {
      label: 'Kokrajhar',
      value: 'kokrajhar',
    },
    {
      label: 'Dhubri',
      value: 'dhubri',
    },
    {
      label: 'Goalpara',
      value: 'goalpara',
    },
  ];

  const { data } = useQuery([`district_table_data_${indicator}`], () =>
    GraphQL('analytics', ANALYTICS_TABLE_DATA, {
      indcFilter: { slug: indicator },
    })
  );

  const revenueData = useQuery([`revenue_table_data_${indicator}`], () =>
    GraphQL('analytics', ANALYTICS_REVENUE_TABLE_DATA, {
      indcFilter: { slug: indicator },
    })
  );

  const columns =
    boundary === 'district' ? DistrictColumnData : RevenueColumnData;

  const columnDataIndex = columns.findIndex(
    (obj) => Object.keys(obj)[0] === indicator
  );

  return (
    <>
      <div className="mt-4 mb-6">
        <Text variant="heading3xl"> DRR Dashboard : Analytical Map</Text>
      </div>

      <div className="w-full flex flex-col gap-4">
        <div className="bg-surfaceDefault shadow-basicMd p-4">
          <div className="flex flex-col gap-2 mb-4">
            <Text className=" text-textSubdued" variant="headingLg">
              {deSlugify(indicator)}
            </Text>
            <Text className="text-textSubdued" variant="bodyLg">
              Time Period : September 2022
            </Text>
          </div>
          <Separator />
          <RadioGroup
            onChange={(val, name) => {
              setBoundary(val);
            }}
            name={boundary}
            defaultValue={'revenue-circle'}
          >
            <div className="flex gap-2 mt-2">
              {Boundaries.map((item, index) => (
                <RadioItem key={index} value={item.id}>
                  {item.name}
                </RadioItem>
              ))}
            </div>
          </RadioGroup>
          <Select
            label="Select District"
            className="w-[380px] mt-2"
            name="select-1"
            labelHidden
            value=""
            onChange={function Yu() {}}
            options={DropdownOptions}
          />
          <div className="flex mt-4 min-h-[400px]">
            <MapComponent boundary={boundary} />
          </div>
        </div>
        <div className="h-fit-content">
          <TableComponent
            columnData={columns[columnDataIndex][indicator]}
            rowData={
              boundary === 'district'
                ? data?.districtViewTableData?.table_data
                : revenueData?.data?.revCricleViewTableData?.table_data
            }
          />
        </div>
      </div>
    </>
  );
}
