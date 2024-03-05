'use client';

import React from 'react';
import { type TypedDocumentNode } from '@graphql-typed-document-node/core';
import { parseDate } from '@internationalized/date';
import { useQuery } from '@tanstack/react-query';
import {
  parseAsArrayOf,
  parseAsString,
  useQueryState,
} from 'next-usequerystate';
import { Checkbox, MonthPicker, Select, Text } from 'opub-ui';
import MultiSelect from 'react-select';

import {
  ANALYTICS_DISTRICT_MAP_DATA,
  ANALYTICS_GEOGRAPHY_DATA,
  ANALYTICS_REVENUE_MAP_DATA,
  ANALYTICS_TIME_PERIODS,
} from '@/config/graphql/analaytics-queries';
import { GraphQL } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import { MapComponent } from './map-component';

export function Content({
  timePeriod,
  indicator,
}: {
  timePeriod: string;
  indicator: string;
}) {
  interface Option {
    isDisabled?: boolean;
    value: string;
    label: string;
    group?: string;
  }

  interface FormattedDataItem {
    label: string;
    options: Option[];
  }

  type DropdownOption = {
    [x: string]: string;
    label: string;
    value: string;
  };

  const [boundary, setBoundary] = useQueryState(
    'boundary',
    parseAsString.withDefault('district')
  );

  const [timePeriodSelected, setTimePeriod] = useQueryState(
    'time-period',
    parseAsString.withDefault(timePeriod)
  );

  const [region, setRegion] = useQueryState(
    'region',
    parseAsArrayOf(parseAsString)
  );

  const [selectedGroup, setSelectedGroup] = React.useState<string[]>([]);

  const mapQuery: TypedDocumentNode<any, any> =
    boundary === 'district'
      ? ANALYTICS_DISTRICT_MAP_DATA
      : ANALYTICS_REVENUE_MAP_DATA;

  const mapData = useQuery(
    [`mapQuery_${boundary}_${indicator}_${timePeriodSelected}`],
    () =>
      GraphQL('analytics', mapQuery, {
        indcFilter: { slug: indicator },
        dataFilter: { dataPeriod: timePeriodSelected },
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
        geoFilter: { type: boundary },
      }),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  const timePeriods = useQuery(
    [`timePeriods`],
    () => GraphQL('analytics', ANALYTICS_TIME_PERIODS),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );
  let minDate, maxDate;
  if (timePeriods.data) {
    const datesArray = timePeriods?.data?.getDataTimePeriods.map((date) => {
      const [year, month] = date.value.split('_');
      return new Date(parseInt(year), parseInt(month));
    });
    const timestamps = datesArray.map((date) => date.getTime());
    // Find the minimum and maximum timestamps
    const minTimestamp = Math.min(...timestamps);
    const maxTimestamp = Math.max(...timestamps);

    // Convert the timestamps back to dates
    minDate = formatDate(minTimestamp, true);
    maxDate = formatDate(maxTimestamp, true);
  }

  const DistrictDropdownOptions: DropdownOption[] = [];
  let RevCircleDropdownOptions: FormattedDataItem[] = [];

  if (geographiesData.data && !geographiesData.isFetching) {
    if (boundary === 'revenue-circle') {
      RevCircleDropdownOptions = Object.keys(
        geographiesData?.data?.getDistrictRevCircle
      ).map((key) => {
        return {
          label: key,
          options: geographiesData?.data?.getDistrictRevCircle[key].map(
            (item: { [x: string]: string; code: string }) => {
              return {
                value: item.code,
                label: item['revenue-circle'],
                group: key,
              };
            }
          ),
        };
      });
    } else {
      geographiesData.data?.getDistrictRevCircle?.forEach(
        (geography: { district: string; code: string }) => {
          DistrictDropdownOptions.push({
            label: geography.district,
            value: geography.code ? geography.code : 'NA',
          });
        }
      );
    }
  }

  const filteredOptions = (boundary: string) => {
    if (boundary === 'revenue-circle') {
      RevCircleDropdownOptions.forEach((item) => {
        if (
          !selectedGroup.includes(item?.label || '') &&
          selectedGroup.length > 0
        ) {
          item.options.forEach((option) => {
            option.isDisabled = true;
          });
        }
      });

      const filteredOptions = RevCircleDropdownOptions.flatMap(
        (item: { options: any[] }) =>
          item.options.filter(
            (option) =>
              region?.includes(option.value) &&
              (selectedGroup.length === 0 ||
                selectedGroup.includes(option.group || ''))
          )
      );
      return filteredOptions;
    }
    const filteredDistrictOptions = DistrictDropdownOptions?.filter((option) =>
      region?.includes(option.value)
    );
    return filteredDistrictOptions;
  };

  return (
    <React.Fragment>
      <div className="mb-2 flex items-center justify-between gap-4">
        <Select
          defaultValue="revenue-circle"
          label="Select Boundary"
          value={boundary || 'district'}
          className="basis-[200px] self-end"
          name="boundary-select"
          onChange={(e) => {
            setBoundary(e, { shallow: false });
            setRegion([]);
            setSelectedGroup([]);
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
        <div className="flex grow flex-col">
          <div className="flex items-center justify-between">
            <Text>Select one or more Region</Text>
            <Checkbox
              name="All Regions"
              checked={region && region.length > 0 ? false : true}
              //onChange={handleCheckboxChange}
            >
              All Regions
            </Checkbox>
          </div>
          <MultiSelect
            className="z-max"
            name="select-1"
            isMulti
            value={filteredOptions(boundary)}
            onChange={(selectedOptions) => {
              const selectedValues = selectedOptions.map(
                (option) => option.value
              );
              const selectedGroups = selectedOptions.map(
                (option) => option?.group ?? ''
              );
              setSelectedGroup(selectedGroups);
              setRegion(selectedValues, { shallow: false });
            }}
            options={
              boundary === 'revenue-circle'
                ? RevCircleDropdownOptions
                : DistrictDropdownOptions
            }
          />
        </div>
        <div className="self-end">
          <MonthPicker
            name="month"
            defaultValue={parseDate('2023-08-01')}
            label="Select Month"
            minValue={parseDate(minDate || '2023-01-04')}
            maxValue={parseDate(maxDate || '2023-01-04')}
            onChange={(date) => {
              setTimePeriod(
                `${date.year}_${date.month < 10 ? `0${date.month}` : `${date.month}`}`,
                { shallow: false }
              );
            }}
          />
        </div>
      </div>
      <MapComponent
        indicator={indicator}
        regions={filteredOptions(boundary)}
        mapDataloading={mapData?.isFetching}
        setRegion={setRegion}
        mapData={
          boundary === 'district'
            ? mapData?.data?.districtMapData
            : mapData?.data?.revCircleMapData
        }
      />
    </React.Fragment>
  );
}
