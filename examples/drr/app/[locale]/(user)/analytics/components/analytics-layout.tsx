'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Button,
  IconButton,
  RadioGroup,
  RadioItem,
  Select,
  Separator,
  Text,
} from 'opub-ui';

import { DistrictColumnData, RevenueColumnData } from '@/config/consts.ts';
import {
  ANALYTICS_DISTRICT_MAP_DATA,
  ANALYTICS_GEOGRAPHIES,
  ANALYTICS_CHART_DATA,
  ANALYTICS_REVENUE_MAP_DATA,
  ANALYTICS_REVENUE_TABLE_DATA,
  ANALYTICS_TABLE_DATA,
} from '@/config/graphql/analaytics-queries';
import { GraphQL } from '@/lib/api';
import { deSlugify, formatDateString } from '@/lib/utils';
import { Icons } from '@/components/icons';
import { ChartComponent } from './ChartComponent';
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

export function Content({
  subIndicator,
  timePeriod,
  indicator,
}: {
  subIndicator: string;
  timePeriod: string;
  indicator: string;
}) {
  const [boundary, setBoundary] = React.useState('revenue-circle');
  const [isMapVisible, setIsMapVisible] = React.useState(true);

  const toggleVisibility = () => {
    setDropdownValue('')
    setIsMapVisible((prev) => !prev);
  };
  const [dropDownValue, setDropdownValue] = React.useState('');
  const [tableData, setTableData] = React.useState([]);
  const [revenueTableData, setRevenueTableData] = React.useState([]);

  const geographyMap: any = {
    'revenue-circle': 'REVENUE CIRCLE',
    district: 'DISTRICT',
  };

  interface DropdownOptionProps {
    label: string;
    value:  string;
    selected?: boolean;
    disabled: boolean;
  }

  const DropdownOptions : DropdownOptionProps[] = [
    {
      label:
        boundary === 'district' ? 'Select District' : 'Select Revenue Circle',
      value: '',
      selected: true,
      disabled: true,
    },
  ];

  const { data } = useQuery(
    [`district_table_data_${indicator}_${timePeriod}_${dropDownValue}`],
    () =>
      GraphQL('analytics', ANALYTICS_TABLE_DATA, {
        indcFilter: { slug: indicator },
        dataFilter: { dataPeriod: timePeriod },
        ...(dropDownValue !== '' &&
          boundary === 'district' && { geoFilter: { code: dropDownValue } }),
      }),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  const revenueData = useQuery(
    [`revenue_table_data_${indicator}_${timePeriod}_${dropDownValue}`],
    () =>
      GraphQL('analytics', ANALYTICS_REVENUE_TABLE_DATA, {
        indcFilter: { slug: indicator },
        dataFilter: { dataPeriod: timePeriod },
        ...(dropDownValue !== '' &&
          boundary === 'revenue-circle' && {
            geoFilter: { code: dropDownValue },
          }),
      }),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  React.useEffect(() => {
    if (data) {
      setTableData(data.districtViewTableData?.table_data);
    }
    if (revenueData.data) {
      setRevenueTableData(revenueData.data?.revCircleViewTableData?.table_data);
    }
  }, [data, revenueData?.data]);

  const indicatorForMapData = subIndicator ? subIndicator : indicator;
  const revenueMapData = useQuery(
    [`revenue_map_data_${indicatorForMapData}_${timePeriod}`],
    () =>
      GraphQL('analytics', ANALYTICS_REVENUE_MAP_DATA, {
        indcFilter: { slug: indicatorForMapData },
        dataFilter: { dataPeriod: timePeriod },
      }),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  const districtMapData = useQuery(
    [`district_map_data_${indicatorForMapData}_${timePeriod}_${dropDownValue}`],
    () =>
      GraphQL('analytics', ANALYTICS_DISTRICT_MAP_DATA, {
        indcFilter: { slug: indicatorForMapData },
        dataFilter: { dataPeriod: timePeriod },
        ...(dropDownValue !== '' && { geoFilter: { code: dropDownValue } }),
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
      GraphQL('analytics', ANALYTICS_GEOGRAPHIES, {
        filters: { type: geographyMap[boundary] },
      }),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  if (geographiesData) {
    geographiesData.data?.geography.forEach((geography) => {
      DropdownOptions.push({
        label: geography.name,
        value: geography.code ? geography.code : 'NA',
        disabled: false,
      });
    });
  }

  const chartData = useQuery(
    [`chart_data_${indicatorForMapData}_${timePeriod}`],
    () =>
      GraphQL('analytics', ANALYTICS_CHART_DATA, {
        indcFilter: { slug: indicatorForMapData },
        dataFilter: { dataPeriod: timePeriod },
      }),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  const columns =
    boundary === 'district' && dropDownValue === ''
      ? DistrictColumnData
      : RevenueColumnData;

  const columnDataIndex = columns.findIndex(
    (obj) => Object.keys(obj)[0] === indicator
  );

  return (
    <>
      <span className="flex items-center justify-between">
        <span className="mt-4 mb-6 flex items-center gap-4">
          <Text variant="heading2xl" fontWeight="bold">
            Assam DRR Analytics: Map Dashboard
          </Text>
          <div className="bg-actionsSecondaryBasicDefault rounded-1 border-1 border-solid border-borderHighlightDefault">
            <IconButton color="highlight" icon={Icons.iconShare}>
              Share
            </IconButton>
          </div>

          {/* <div className="bg-actionsSecondaryBasicDefault rounded-1 border-1 border-solid border-borderHighlightDefault">
            <IconButton color="highlight" icon={Icons.download}>
              Download
            </IconButton>
          </div> */}
        </span>

        <Button
          size="medium"
          className="bg-actionsPrimaryBasicDefault w-[336px] hover:bg-actionsPrimaryBasicDefault"
          onClick={toggleVisibility}
        >
          {`${isMapVisible ? 'View Charts' : 'View Maps'}`}
        </Button>
      </span>

      <div className="w-full flex flex-col gap-4">
        <div className="bg-surfaceDefault shadow-basicMd p-4">
          <div className="flex flex-col gap-2 mb-4">
            <Text className=" text-textSubdued" variant="headingLg">
              {deSlugify(indicator)}
            </Text>
            <Text className="text-textSubdued" variant="bodyLg">
              {timePeriod && `${formatDateString(timePeriod)}`} 
            </Text>
          </div>
          <Separator />
          <div className="flex gap-5 items-end">
            <IconButton
              onClick={() => setDropdownValue('')}
              color="highlight"
              icon={Icons.home}
            >
              Home
            </IconButton>
            <RadioGroup
              onChange={(val, name) => {
                setDropdownValue('')
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
          </div>
          <Select
            label={'Select District'}
            className={`w-[380px] mt-2 ${isMapVisible ? 'visible' : 'hidden'}`}
            name={'select_district'}
            labelHidden
            value={dropDownValue}
            onChange={setDropdownValue}
            options={DropdownOptions}
          />
          <div
            className={`flex mt-4 min-h-[600px] ${
              isMapVisible ? 'visible' : 'hidden'
            }`}
          >
            <MapComponent
              revenueDataloading={revenueMapData?.isFetching}
              revenueData={revenueMapData?.data?.revCircleMapData}
              districtDataloading={districtMapData?.isFetching}
              districtData={districtMapData?.data?.districtMapData}
              boundary={boundary}
              dropDownValue={dropDownValue}
            />
          </div>
          <div
            className={`flex mt-2 min-h-[600px] ${
              isMapVisible ? 'hidden' : 'visible'
            }`}
          >
            <ChartComponent
              chartDataloading={chartData?.isFetching}
              chartData={chartData?.data?.revCircleChartData}
              districtsData={geographiesData?.data?.geography}
            />
          </div>
        </div>
        <div className="h-fit-content">
          {tableData.length &&
            revenueTableData.length &&
            revenueData.isFetched && (
              <TableComponent
                columnData={columns[columnDataIndex][indicator]}
                rowData={boundary === 'district' ? tableData : revenueTableData}
              />
            )}
        </div>
      </div>
    </>
  );
}
