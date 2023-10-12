import { Indicators } from './Indicators';
import { IChartData } from './scheme-layout';
import { ckan } from '@/config/site';
import { useFetch } from '@/lib/api';
import { cn, copyURLToClipboard, exportAsImage } from '@/lib/utils';
import {
  Button,
  Combobox,
  ComboboxMulti,
  Select,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Text,
  useToast,
} from 'opub-ui';
import { BarChart } from 'opub-viz';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useQueryState } from 'next-usequerystate';
import dynamic from 'next/dynamic';
import { BarView } from './BarView';

const LeafletChoropleth = dynamic(
  () => import('opub-viz').then((mod) => mod.LeafletChoropleth),
  { ssr: false }
);
export const Explorer = React.forwardRef(
  (
    {
      scheme,
      chartData,
      district,
    }: {
      scheme?: string;
      chartData: IChartData;
      district: string;
    },
    ref: any
  ) => {
    const years = Object.values(chartData)[0].years;
    const [selectedYear, setYear] = React.useState(Object.keys(years)[0]);
    const [selectedTab, setTab] = React.useState<'map' | 'bar'>('bar');
    const [indicator, setIndicator] = useQueryState('indicator');

    const { data: indicatorData, isLoading } = useFetch(
      'indicators',
      ckan.indicators
    );
    const indicatorRef = React.useRef(null);

    React.useEffect(() => {
      if (indicatorData || indicator) {
        const initialSlug =
          indicator ||
          indicatorData[scheme as string]['District Performance'][0].slug;
        setIndicator(initialSlug);
      }
    }, [indicatorData, indicator]);

    return (
      <div
        className={cn(
          'md:grid grid-cols-[242px_1fr] gap-4 rounded-05 bg-surfaceDefault shadow-elementCard p-6'
        )}
      >
        <div className="hidden md:block">
          {isLoading ? (
            <div className="p-4">
              <Text variant="headingMd">Loading...</Text>
            </div>
          ) : indicatorData ? (
            <Indicators
              data={indicatorData[scheme as string] || null}
              indicator={indicator || 'nhaoe'}
              indicatorRef={indicatorRef}
              setIndicator={setIndicator}
            />
          ) : (
            <div className="p-4">
              <Text variant="headingMd">No indicators available</Text>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center h-full" ref={ref}>
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
                selectedIndicator: indicator || 'nhaoe',
              }}
            />
          </ErrorBoundary>
        </div>
      </div>
    );
  }
);

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
  const [barData, setBarData] = React.useState<{
    xAxis: string[];
    values: number[];
  }>();
  const [selectedBlocks, setSelectedBlocks] = React.useState<string[]>([]);

  const { data: mapFile, isLoading: mapLoading } = useFetch(
    `${district}-mapFile`,
    `/files/${district}.json`
  );

  const { toast } = useToast();
  const contentRef: any = React.useRef(null);

  React.useEffect(() => {
    // change height of indicator list based on content height
    if (indicatorRef.current && contentRef.current) {
      setTimeout(() => {
        // it takes some time to render the content
        const indicatorList: any = indicatorRef.current;
        const content: any = contentRef.current;
        if (content === null) return;

        const contentHeight = content.offsetHeight;
        indicatorList.style.maxHeight = `${contentHeight - 100}px`;
      }, 20);
    }
  }, []);

  const currentData: any =
    chartData[states.selectedIndicator].years[states.selectedYear];

  React.useEffect(() => {
    if (!currentData) return;
    setSelectedBlocks(currentData.bardata.xAxis);
  }, []);

  React.useEffect(() => {
    if (selectedBlocks) {
      const filteredData = currentData.bardata.xAxis.filter((e: any) =>
        selectedBlocks.includes(e)
      );

      setBarData({ ...currentData.bardata, xAxis: filteredData });
    }
  }, [selectedBlocks]);

  if (!chartData[states.selectedIndicator]) {
    return (
      <Text variant="headingLg" as="h2">
        No data available for this indicator
      </Text>
    );
  }

  const mapDataFn = (
    value: boolean,
    type: 'default' | 'hover' | 'selected' = 'default'
  ) => {
    return value
      ? `var(--mapareadistrict-${type})`
      : 'var(--mapareadistrict-disabled)';
  };

  const tabs = [
    {
      label: 'Bar View',
      value: 'bar',
      content: barData ? <BarView data={barData} /> : null,
    },
    {
      label: 'Map View',
      value: 'map',
      content:
        // <MapChart
        //   mapFile={mapFile}
        //   data={currentData.mapdata.map(
        //     (e: {
        //       name: string;
        //       value: string;
        //       label: string;
        //       disp_val: string;
        //     }) => {
        //       return {
        //         name: String(e.name),
        //         value: e.value,
        //         label: e.label,
        //         labelVal: e.disp_val,
        //       };
        //     }
        //   )}
        //   mapName="assam-block"
        //   nameProperty="BLOCK_LGD"
        //   height="500px"
        //   colors={['#c9f0fa', '#abd9e9', '#74add1', '#4575b4', '#313695']}
        //   loading={mapLoading}
        // />
        !mapLoading ? (
          <LeafletChoropleth
            features={mapFile.features}
            mapZoom={7.4}
            zoomOnClick={false}
            mapProperty="enabled"
            mapDataFn={mapDataFn}
            fillOpacity={1}
            className="w-full h-[512px]"
            // mouseover={handleMouseOver}
            // mouseout={handleMouseOut}
          />
        ) : (
          <div className="flex justify-center items-center">Loading...</div>
        ),
    },
  ];

  return (
    <div className="grow h-full">
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
          className="rounded-05 bg-background h-full pt-4 bg-surfaceHighlightSubdued border-default"
          ref={contentRef}
        >
          <Filters
            states={states}
            chartData={chartData}
            barOptions={currentData.bardata.xAxis}
            setSelectedBlocks={setSelectedBlocks}
            tab={states.selectedTab}
            selectedBlocks={selectedBlocks}
          />

          {tabs.map((tab) => (
            <TabPanel value={tab.value} key={tab.value}>
              <div className="relative overflow-y-auto mt-5 min-h-[512px]">
                {tab.content}
              </div>
            </TabPanel>
          ))}
        </div>
      </Tabs>
      <div className="mt-3 flex justify-end gap-4">
        <Button
          onClick={() => {
            copyURLToClipboard();
            toast({
              title: 'Copied to clipboard!',
            });
          }}
        >
          <Text variant="bodyMd" as="span">
            Copy Link
          </Text>
        </Button>
        <Button
          onClick={() => {
            exportAsImage(contentRef.current, 'explorer');
          }}
        >
          <Text variant="bodyMd" as="span">
            Download
          </Text>
        </Button>
      </div>
    </div>
  );
};

const Filters = ({
  states,
  chartData,
  barOptions,
  setSelectedBlocks,
  tab,
  selectedBlocks,
}: {
  states: any;
  chartData: IChartData;
  barOptions: any;
  setSelectedBlocks: any;
  tab: 'map' | 'bar';
  selectedBlocks: string[];
}) => {
  const options = Object.keys(Object.values(chartData)[0].years).map(
    (year) => ({
      label: year,
      value: year,
    })
  );

  return (
    <div className="flex flex-col gap-4 px-4">
      {tab === 'bar' && (
        <ComboboxMulti
          name="blocks"
          list={barOptions}
          defaultValues={selectedBlocks}
          key={selectedBlocks.toString()}
          label="Select Blocks to Compare"
          placeholder="Select Blocks"
          onChange={(values: any) => {
            setSelectedBlocks(values);
          }}
          verticalContent
        />
      )}

      <div className="flex">
        <Select
          label="Select FY"
          labelInline
          name="year"
          onChange={states.setYear}
          value={states.selectedYear}
          options={options}
        />
      </div>
    </div>
  );
};
