import React from 'react';
import mapFile from '@/public/files/assam_block.json';
import { createColumnHelper } from '@tanstack/react-table';
import { Select, Tab, TabList, TabPanel, Table, Tabs, Text } from 'opub-ui';
import { BarChart, MapChart } from 'opub-viz';
import { ErrorBoundary } from 'react-error-boundary';

import { ckan, mapPosition } from '@/config/site';
import { useFetch } from '@/lib/api';
import { cn } from '@/lib/utils';
import { explorer } from '../scheme.config';
import { Indicators } from './Indicators';
import { IChartData, ITable } from './scheme-layout';

export const Explorer = ({
  scheme,
  tableData,
  chartData,
  district,
}: {
  scheme?: string;
  tableData: ITable;
  chartData: IChartData;
  district: string;
}) => {
  const [selectedYear, setYear] = React.useState('2022-2023');
  const [selectedIndicator, setIndicator] = React.useState('cpapr');
  const [selectedTab, setTab] = React.useState<'map' | 'table' | 'chart'>(
    'map'
  );

  const { data: indicatorData, isLoading } = useFetch(
    'indicators',
    ckan.indicators
  );
  const indicatorRef = React.useRef(null);

  React.useEffect(() => {
    if (indicatorData) {
      const initialSlug = indicatorData[scheme as string]['Targets'][0].slug;
      setIndicator(initialSlug);
    }
  }, [indicatorData]);

  return (
    <div className={cn('grid grid-cols-[244px_1fr] gap-4')}>
      <Indicators
        data={indicatorData}
        scheme={scheme || ''}
        loading={isLoading}
        indicatorRef={indicatorRef}
        disable={selectedTab === 'table'}
        setIndicator={setIndicator}
      />

      <ErrorBoundary
        fallback={
          <div className="flex items-center justify-center h-full">
            <Text variant="headingLg" as="h2">
              Error loading Explorer
            </Text>
          </div>
        }
      >
        <Content
          indicatorRef={indicatorRef}
          tableData={tableData}
          chartData={chartData}
          district={district}
          states={{
            setTab,
            setYear,
            selectedTab,
            selectedYear,
            selectedIndicator,
          }}
        />
      </ErrorBoundary>
    </div>
  );
};

// temp data for map chart
const dataFile = mapFile.features.map((feature: any) => {
  return {
    name: feature.properties.district,
    value: Math.round(Math.random() * 1000),
  };
});

const Content = ({
  indicatorRef,
  tableData,
  chartData,
  states,
  district,
}: {
  indicatorRef: any;
  tableData: ITable;
  chartData: IChartData;
  district: string;
  states: {
    setTab: (tab: 'map' | 'table' | 'chart') => void;
    setYear: (year: string) => void;
    selectedTab: 'map' | 'table' | 'chart';
    selectedYear: string;
    selectedIndicator: string;
  };
}) => {
  const contentRef = React.useRef(null);
  const currentData: any =
    chartData[states.selectedIndicator].years[states.selectedYear];

  const columns: any = [];
  const columnContentTypes: any = [];
  const columnHelper = createColumnHelper();
  Object.keys(tableData[states.selectedYear][0]).forEach((key: any) => {
    columns.push(columnHelper.accessor(key, { header: key }));
    columnContentTypes.push('numeric');
  });

  React.useEffect(() => {
    // change height of indicator list based on content height
    if (indicatorRef.current && contentRef.current) {
      setTimeout(() => {
        // it takes some time to render the content
        const indicatorList = indicatorRef.current;
        const content: any = contentRef.current;
        const contentHeight = content.offsetHeight;

        indicatorList.style.maxHeight = `${contentHeight - 50}px`;
      }, 20);
    }
  }, [states.selectedTab]);

  const tabs = [
    {
      label: 'Map View',
      value: 'map',
      content: (
        <MapChart
          mapFile={mapFile}
          data={currentData.mapdata.map(
            (e: { name: any; value: any; label: any }) => {
              return {
                name: String(e.name),
                value: e.value,
                label: e.label,
              };
            }
          )}
          mapName="assam-block"
          nameProperty="BLOCK_LGD"
          height="500px"
          scaleLimit={[1, 10]}
          zoom={5}
          center={mapPosition[district] || ['80%', '80%']}
        />
      ),
    },
    {
      label: 'Bar View',
      value: 'bar',
      content: (
        <BarChart
          xAxis={currentData.bardata.xAxis}
          data={currentData.bardata.values}
          height="500px"
        />
      ),
    },
    {
      label: 'Table View',
      value: 'table',
      content: (
        <Table
          columns={columns}
          rows={tableData[states.selectedYear]}
          columnContentTypes={columnContentTypes}
          key={states.selectedYear}
        />
      ),
    },
  ];

  return (
    <div className="grow h-full overflow-x-auto">
      <Tabs
        defaultValue={explorer.tabs[0].value}
        onValueChange={(value) => states.setTab(value as any)}
        value={states.selectedTab}
      >
        <TabList>
          {explorer.tabs.map((tab) => (
            <Tab value={tab.value} key={tab.value}>
              <div className="flex items-center gap-3">
                <Text variant="bodyMd" fontWeight="medium">
                  {tab.label}
                </Text>
              </div>
            </Tab>
          ))}
        </TabList>
        <div
          className="rounded-05 bg-background h-full p-4 md:p-6"
          ref={contentRef}
        >
          <div className="flex gap-4 flex-wrap">
            {/* <ComboboxMulti
              name="block"
              label="Block"
              labelHidden
              defaultList={['Block 1', 'Block 2', 'Block 3', 'Block 4']}
              defaultValues={['Block 1']}
              className="w-full"
              placeholder='Select "Block"'
              verticalContent
            /> */}
            {/* <Select
              name="sort"
              label="Sort By"
              labelHidden
              options={[
                { label: 'Ascending Order', value: 'asc' },
                { label: 'Descending Order', value: 'desc' },
              ]}
              className="w-1/3 grow"
            /> */}
            <Select
              name="year"
              label="Year"
              labelHidden
              onChange={states.setYear}
              value={states.selectedYear}
              options={Object.keys(tableData).map((year) => ({
                label: year,
                value: year,
              }))}
              // className="basis-1/3"
            />
          </div>

          {tabs.map((tab) => (
            <TabPanel value={tab.value} key={tab.value}>
              <div className="relative overflow-y-auto mt-5">{tab.content}</div>
            </TabPanel>
          ))}
        </div>
      </Tabs>
    </div>
  );
};