import React from 'react';
import dynamic from 'next/dynamic';
import { useWindowSize } from '@/hooks/use-window-size';
import { useQueryState } from 'next-usequerystate';
import {
  Button,
  Combobox,
  Select,
  SelectorCard,
  ShareDialog,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Text,
  toast,
  Tray,
  useScreenshot,
} from 'opub-ui';
import { ErrorBoundary } from 'react-error-boundary';

import { ckan } from '@/config/site';
import { useFetch } from '@/lib/api';
import { cn, copyURLToClipboard, exportAsImage } from '@/lib/utils';
import { BarView } from './BarView';
import { Indicators } from './Indicators';
import { IChartData } from './scheme-layout';

const MapChart = dynamic(
  () => import('opub-ui/viz').then((mod) => mod.MapChart),
  {
    ssr: false,
  }
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
    const [indicatorName, setIndicatorName] = React.useState('indicator');
    const [trayOpen, setTrayOpen] = React.useState(false);

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
    }, [indicatorData, indicator, setIndicator, scheme]);

    // TODO: improve this section by adding better API
    // set indicator name
    React.useEffect(() => {
      if (indicatorData) {
        const indicatorObjsArr: any = Object.values(
          indicatorData[scheme as string]
        );
        indicatorObjsArr.forEach((objsArr: any) => {
          const indicatorObj = objsArr.find((e: any) => e.slug === indicator);

          if (indicatorObj) {
            setIndicatorName(indicatorObj.label);
            return;
          }
        });
      }
    }, [indicatorData, indicator, scheme]);

    return (
      <div
        className={cn(
          'flex grid-cols-[242px_1fr] flex-col gap-4 rounded-05 md:grid md:bg-surfaceDefault md:p-6 md:shadow-elementCard'
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
        <div className="block md:hidden">
          <SelectorCard
            title="Selected Indicator"
            selected={indicatorName}
            buttonText="Switch Indicator"
            onClick={() => setTrayOpen(true)}
          />
          <Tray open={trayOpen} onOpenChange={setTrayOpen} size="extended">
            {isLoading ? (
              <div className="p-4">
                <Text variant="headingMd">Loading Indicators...</Text>
              </div>
            ) : indicatorData ? (
              <Indicators
                data={indicatorData[scheme as string] || null}
                indicator={indicator || 'nhaoe'}
                indicatorRef={indicatorRef}
                setIndicator={(e: string) => {
                  setIndicator(e);
                  setTrayOpen(false);
                }}
              />
            ) : (
              <div className="p-4">
                <Text variant="headingMd">No indicators available</Text>
              </div>
            )}
          </Tray>
        </div>

        <div className="flex h-full items-center justify-center" ref={ref}>
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
  const { width } = useWindowSize();

  const { data: mapFile, isLoading: mapLoading } = useFetch(
    `${district}-mapFile`,
    `/files/${district}.json`
  );

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
  }, [indicatorRef]);

  const currentData: any =
    chartData[states.selectedIndicator].years[states.selectedYear];

  const barDataObj: any = React.useMemo(() => {
    return {
      Khagorijan: 15452.0,
      Batadraba: 19506.0,
      Kaliabor: 9102.0,
      Rupahihut: 22841.0,
      Lowkhowa: 19017.0,
      Kathiatoli: 38942.0,
      Raha: 17224.0,
      Dolongghat: 5108.0,
      Barhampur: 9450.0,
      Pakhimoria: 8232.0,
      Bajiagaon: 20247.0,
      'Pachim Kaliabor': 14392.0,
      Juria: 40642.0,
    };
  }, []);

  React.useEffect(() => {
    if (!currentData) return;

    setSelectedBlocks(Object.keys(barDataObj));
  }, [currentData, barDataObj]);

  React.useEffect(() => {
    if (selectedBlocks) {
      const filteredData: any = {};
      Object.keys(barDataObj).forEach((key) => {
        if (selectedBlocks.includes(key)) {
          filteredData[key] = barDataObj[key];
        }
      });
      setBarData({
        xAxis: Object.keys(filteredData),
        values: Object.values(filteredData),
      });
    }
  }, [selectedBlocks, currentData, barDataObj]);

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

  let barView = null;
  if (barData) barView = <BarView data={barData} />;
  if (selectedBlocks.length < 2)
    barView = (
      <div className="mt-5 flex items-center justify-center">
        <Text variant="headingLg" as="span">
          Please select atleast 2 blocks to compare
        </Text>
      </div>
    );

  const tabs = [
    {
      label: 'Bar View',
      value: 'bar',
      content: barView,
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
          <MapChart
            features={mapFile.features}
            mapZoom={7.4}
            zoomOnClick={false}
            mapProperty="enabled"
            mapDataFn={mapDataFn}
            fillOpacity={1}
            className="h-[512px] w-full"
          />
        ) : (
          <div className="flex items-center justify-center">Loading...</div>
        ),
    },
  ];

  const isMobile = width ? width < 768 : false;

  return (
    <div className="h-full grow">
      <Tabs
        defaultValue={'map'}
        onValueChange={(value) => states.setTab(value as any)}
        value={states.selectedTab}
      >
        <TabList fitted={isMobile}>
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
              {tab.label}
            </Tab>
          ))}
        </TabList>
        <div
          className="bg-background border-default h-full rounded-05 bg-surfaceHighlightSubdued pt-4"
          ref={contentRef}
        >
          <Filters
            states={states}
            chartData={chartData}
            barOptions={currentData.bardata.xAxis}
            setSelectedBlocks={setSelectedBlocks}
            tab={states.selectedTab}
            selectedBlocks={selectedBlocks}
            isMobile={isMobile}
          />

          {tabs.map((tab) => (
            <TabPanel value={tab.value} key={tab.value}>
              <div className="relative mt-5 min-h-[512px] overflow-y-auto">
                {tab.content}
              </div>
            </TabPanel>
          ))}
        </div>
      </Tabs>
      <div
        className={cn(
          'mt-3 flex justify-end gap-4',
          isMobile &&
            'md:mt6 mt-4 flex flex-wrap items-center justify-end gap-4 rounded-2 bg-surfaceDefault px-3 py-4 shadow-elementCard'
        )}
      >
        <Button
          kind="secondary"
          variant="interactive"
          onClick={() => {
            copyURLToClipboard();
            toast('Copied to clipboard', {
              action: {
                label: 'Dismiss',
                onClick: () => {},
              },
            });
          }}
        >
          Copy Link
        </Button>
        <Button
          kind="primary"
          variant="interactive"
          onClick={() => {
            exportAsImage(contentRef.current, 'explorer');
          }}
        >
          Download
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
  isMobile: boolean;
}) => {
  const options = Object.keys(Object.values(chartData)[0].years).map(
    (year) => ({
      label: year,
      value: year,
    })
  );

  return (
    <div className="flex flex-col gap-2 px-4 md:gap-4">
      {tab === 'bar' && (
        <Combobox
          name="blocks"
          list={barOptions}
          selectedValue={selectedBlocks}
          key={selectedBlocks.toString()}
          label="Select Blocks to Compare"
          placeholder="Select Blocks"
          onChange={(values: any) => {
            setSelectedBlocks(values);
          }}
          displaySelected
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
          className="w-full md:w-fit"
        />
      </div>
    </div>
  );
};
