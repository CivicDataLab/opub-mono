import { Indicators } from './Indicators';
import { IChartData } from './scheme-layout';
import { ckan } from '@/config/site';
import { useFetch } from '@/lib/api';
import { cn } from '@/lib/utils';
import { Select, Tab, TabList, TabPanel, Tabs, Text } from 'opub-ui';
import { BarChart, MapChart } from 'opub-viz';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

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
  const [selectedTab, setTab] = React.useState<'map' | 'bar'>('bar');

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
    <div
      className={cn(
        'grid grid-cols-[242px_1fr] gap-4 rounded-05 bg-surfaceDefault shadow-elementCard p-6'
      )}
    >
      {isLoading ? (
        <div className="p-4">
          <Text variant="headingMd">Loading...</Text>
        </div>
      ) : indicatorData ? (
        <Indicators
          data={indicatorData}
          scheme={scheme || ''}
          indicatorRef={indicatorRef}
          setIndicator={setIndicator}
        />
      ) : (
        <div className="p-4">
          <Text variant="headingMd">No indicators available</Text>
        </div>
      )}

      <div className="flex items-center justify-center h-full">
        <ErrorBoundary
          fallback={
            <Text variant="headingLg" as="h2">
              Error loading Explorer
            </Text>
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
    setTab: (tab: 'map' | 'bar') => void;
    setYear: (year: string) => void;
    selectedTab: 'map' | 'bar';
    selectedYear: string;
    selectedIndicator: string;
  };
}) => {
  const { data: mapFile, isLoading: mapLoading } = useFetch(
    `${district}-mapFile`,
    `/files/${district}.json`
  );

  const contentRef = React.useRef(null);

  // React.useEffect(() => {
  //   // change height of indicator list based on content height
  //   if (indicatorRef.current && contentRef.current) {
  //     setTimeout(() => {
  //       // it takes some time to render the content
  //       const indicatorList = indicatorRef.current;
  //       const content: any = contentRef.current;
  //       const contentHeight = content.offsetHeight;

  //       indicatorList.style.maxHeight = `${contentHeight - 50}px`;
  //     }, 20);
  //   }
  // }, [states.selectedTab]);

  if (!chartData[states.selectedIndicator]) {
    return (
      <Text variant="headingLg" as="h2">
        No data available for this indicator
      </Text>
    );
  }
  const currentData: any =
    chartData[states.selectedIndicator].years[states.selectedYear];

  const tabs = [
    {
      label: 'Bar View',
      value: 'bar',
      content: (
        <div>
          <BarChart
            yAxis={currentData.bardata.xAxis}
            data={currentData.bardata.values}
            height="512px"
          />
        </div>
      ),
    },
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
              label: 'Bar View',
              value: 'bar',
            },
            {
              label: 'Map View',
              value: 'map',
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
          className="rounded-05 bg-background h-full p-4 bg-surfaceHighlightSubdued border-default"
          ref={contentRef}
        >
          <div className="flex">
            <Select
              label="Select FY"
              labelInline
              name="year"
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
