import React from 'react';
import { Select, Tab, TabList, TabPanel, Tabs, Text } from 'opub-ui';
import { BarChart, MapChart } from 'opub-viz';
import { ErrorBoundary } from 'react-error-boundary';

import { ckan } from '@/config/site';
import { useFetch } from '@/lib/api';
import { cn } from '@/lib/utils';
import { Indicators } from './Indicators';
import { IChartData } from './scheme-layout';

export const Explorer = ({
  scheme,
  chartData,
  district,
}: {
  scheme?: string;
  chartData: IChartData;
  district: string;
}) => {
  const years = Object.values(chartData)[0].years;
  const [selectedYear, setYear] = React.useState(Object.keys(years)[0]);
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
      const initialSlug =
        indicatorData[scheme as string]['District Performance'][0].slug;
      setIndicator(initialSlug);
    }
  }, [indicatorData]);

  return (
    <div className={cn('grid grid-cols-[244px_1fr] gap-4')}>
      {isLoading ? (
        <div className="p-4">
          <Text variant="headingMd">Loading...</Text>
        </div>
      ) : indicatorData ? (
        <Indicators
          data={indicatorData}
          scheme={scheme || ''}
          indicatorRef={indicatorRef}
          disable={selectedTab === 'table'}
          setIndicator={setIndicator}
        />
      ) : (
        <div className="p-4">
          <Text variant="headingMd">No indicators available</Text>
        </div>
      )}

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

const Content = ({
  indicatorRef,
  chartData,
  states,
  district,
}: {
  indicatorRef: any;

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
  const { data: mapFile, isLoading: mapLoading } = useFetch(
    `${district}-mapFile`,
    `/files/${district}.json`
  );

  const contentRef = React.useRef(null);

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

  if (!chartData[states.selectedIndicator]) {
    return (
      <div className="flex items-center justify-center h-full">
        <Text variant="headingLg" as="h2">
          No data available for this indicator
        </Text>
      </div>
    );
  }
  const currentData: any =
    chartData[states.selectedIndicator].years[states.selectedYear];

  const tabs = [
    {
      label: 'Map View',
      value: 'map',
      content: (
        <MapChart
          mapFile={mapFile}
          data={currentData.mapdata.map(
            (e: {
              name: string;
              value: string;
              label: string;
              disp_val: string;
            }) => {
              return {
                name: String(e.name),
                value: e.value,
                label: e.label,
                labelVal: e.disp_val,
              };
            }
          )}
          mapName="assam-block"
          nameProperty="BLOCK_LGD"
          height="500px"
          colors={['#c9f0fa', '#abd9e9', '#74add1', '#4575b4', '#313695']}
          loading={mapLoading}
        />
      ),
    },
    {
      label: 'Bar View',
      value: 'bar',
      content: (
        <div>
          <BarChart
            yAxis={currentData.bardata.xAxis}
            data={currentData.bardata.values}
            height="500px"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="grow h-full overflow-x-auto">
      <Tabs
        defaultValue={'map'}
        onValueChange={(value) => states.setTab(value as any)}
        value={states.selectedTab}
      >
        <TabList>
          {[
            {
              label: 'Map View',
              value: 'map',
            },
            {
              label: 'Bar View',
              value: 'bar',
            },
          ].map((tab) => (
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
          <div className="flex">
            <Select
              name="year"
              label="Year"
              labelHidden
              onChange={states.setYear}
              value={states.selectedYear}
              options={Object.keys(Object.values(chartData)[0].years).map(
                (year) => ({
                  label: year,
                  value: year,
                })
              )}
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
