'use client';

import React from 'react';
import { type TypedDocumentNode } from '@graphql-typed-document-node/core';
import { useQuery } from '@tanstack/react-query';
import { parseAsString, useQueryState } from 'next-usequerystate';
import { Select, Text } from 'opub-ui';
import MultiSelect from 'react-select';

import {
  ANALYTICS_DISTRICT_MAP_DATA,
  ANALYTICS_GEOGRAPHY_DATA,
  ANALYTICS_REVENUE_MAP_DATA,
} from '@/config/graphql/analaytics-queries';
import { GraphQL } from '@/lib/api';
import { MapComponent } from './map-component';

export function Content({
  timePeriod,
  indicator,
}: {
  timePeriod: string;
  indicator: string;
}) {
  const [region, setRegion] = React.useState<any>([]);
  const [boundary, setBoundary] = useQueryState(
    'boundary',
    parseAsString.withDefault('district')
  );

  const geographyMap: any = {
    'revenue-circle': 'REVENUE CIRCLE',
    district: 'DISTRICT',
  };

  const mapQuery: TypedDocumentNode<any, any> =
    boundary === 'district'
      ? ANALYTICS_DISTRICT_MAP_DATA
      : ANALYTICS_REVENUE_MAP_DATA;

  const mapData = useQuery(
    [`mapQuery_${boundary}_${indicator}_${timePeriod}`],
    () =>
      GraphQL('analytics', mapQuery, {
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
        filters: { type: geographyMap[boundary || 'district'] },
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
          value={boundary || 'district'}
          name="boundary-select"
          onChange={(e) => {
            setBoundary(e, { shallow: false });
          }}
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
            value={region}
            onChange={setRegion}
            options={DropdownOptions}
          />
        </div>
      </div>
      <MapComponent
        indicator={indicator}
        regions={region}
        mapDataloading={mapData?.isFetching}
        mapData={
          boundary === 'district'
            ? mapData?.data?.districtMapData
            : mapData?.data?.revCircleMapData
        }
      />
    </React.Fragment>
  );
}
