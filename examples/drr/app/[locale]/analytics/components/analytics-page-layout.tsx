'use client';

import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Select, Text } from 'opub-ui';
import MultiSelect from 'react-select';

import {
  ANALYTICS_GEOGRAPHY_DATA,
  ANALYTICS_REVENUE_CHART_DATA,
  ANALYTICS_REVENUE_MAP_DATA,
} from '@/config/graphql/analaytics-queries';
import { GraphQL } from '@/lib/api';
import { MapComponent } from './map-component';
import { useAddedRegions } from './store';

export function Content({
  timePeriod,
  indicator,
}: {
  timePeriod: string;
  indicator: string;
}) {
  const [boundary, setBoundary] = React.useState<any>('revenue-circle');
  const regions = useAddedRegions((state) => state.regions);
  const setRegion = useAddedRegions((state) => state.setRegions);

  const districtMultiSelectData = useQuery(
    [`chart_data_${regions}`],
    () =>
      GraphQL('analytics', ANALYTICS_REVENUE_CHART_DATA, {
        indcFilter: { slug: 'composite-score' },
        dataFilter: { dataPeriod: '2022_11' },
        geoFilter: { code: regions ? regions[0].value : [] },
      }),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  // console.log("districtMultiSelectData", districtMultiSelectData);

  const geographyMap: any = {
    'revenue-circle': 'REVENUE CIRCLE',
    district: 'DISTRICT',
  };

  const revenueMapData = useQuery(
    [`revenue_map_data_${indicator}_${timePeriod}`],
    () =>
      GraphQL('analytics', ANALYTICS_REVENUE_MAP_DATA, {
        indcFilter: { slug: indicator },
        dataFilter: { dataPeriod: timePeriod },
      }),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  const geographiesData = useQuery(
    [`geographies_data_${boundary}`],
    () =>
      GraphQL('analytics', ANALYTICS_GEOGRAPHY_DATA, {
        filters: { type: geographyMap[boundary] },
      }),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  const DropdownOptions: { label: string; value: string }[] = [];

  if (geographiesData) {
    geographiesData.data?.geography.forEach((geography) => {
      DropdownOptions.push({
        label: geography.name,
        value: geography.code ? geography.code : 'NA',
      });
    });
  }

  return (
    <React.Fragment>
      <div className="mb-4 flex items-center justify-between gap-4">
        <Select
          defaultValue="revenue-circle"
          label="Select Boundary"
          value={boundary}
          name="boundary-select"
          onChange={setBoundary}
          options={[
            {
              label: 'Revenue Circle',
              value: 'revenue-circle',
            },
            {
              label: 'District',
              value: 'district',
            },
          ]}
        />
        <div className="flex flex-col gap-2">
          <label>
            <Text>Select one or more Region</Text>
          </label>
          <MultiSelect
            className="z-max w-[450px]"
            name="select-1"
            isMulti
            value={regions || []}
            onChange={setRegion}
            // onChange={(selected) => setRegion(selected)}
            options={DropdownOptions}
          />
        </div>
      </div>
      {/* {regions && (
        <MapComponent
          indicator={indicator}
          regions={regions}
          revenueDataloading={revenueMapData?.isFetching}
          revenueData={revenueMapData?.data?.revCircleMapData}
        />
      )} */}
    </React.Fragment>
  );
}
function fetchData(regions: any) {
  throw new Error('Function not implemented.');
}
