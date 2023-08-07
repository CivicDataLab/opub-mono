import React from 'react';
import mapFile from '@/public/files/assam.json';
import {
  ComboboxMulti,
  Icon,
  Input,
  RadioGroup,
  RadioItem,
  ScrollArea,
  Select,
  Separator,
  Tab,
  TabList,
  TabPanel,
  Table,
  Tabs,
  Text,
} from 'opub-ui';
import { BarChart, MapChart } from 'opub-viz';

import { ckan } from '@/config/site';
import { useFetch } from '@/lib/api';
import Icons from '@/components/icons';
import {
  columnContentTypes,
  columns,
  explorer,
  tableData,
} from '../scheme.config';

export const Explorer = ({ scheme }: { scheme?: string }) => {
  const { data, isLoading } = useFetch('indicators', ckan.indicators);
  const indicatorRef = React.useRef(null);

  return (
    <div className="grid grid-cols-[244px_1fr] gap-4">
      <Indicators
        data={data}
        scheme={scheme || ''}
        loading={isLoading}
        indicatorRef={indicatorRef}
      />
      <Content indicatorRef={indicatorRef} />
    </div>
  );
};

interface IndicatorsProps {
  Targets: {
    label: string;
    slug: string;
  }[];
  'District Profile': {
    label: string;
    slug: string;
  }[];
  'District Performance': {
    label: string;
    slug: string;
  }[];
}

const Indicators = ({
  data,
  scheme,
  loading,
  indicatorRef,
}: {
  data: { [key: string]: IndicatorsProps };
  scheme: string;
  loading: boolean;
  indicatorRef: any;
}) => {
  if (loading)
    return (
      <div className="p-4">
        <Text variant="headingMd">Loading...</Text>
      </div>
    );

  const indicators = data[scheme];

  return (
    <div className="flex flex-col gap-4">
      <Text variant="headingLg">Indicators</Text>
      <Input
        name="indicator-search"
        label="Indicator Search"
        labelHidden
        prefix={<Icon source={Icons.search} />}
        placeholder="Search"
      />
      <div>
        <RadioGroup
          onChange={(val) => {
            console.log(val);
          }}
          name="radio1"
          defaultValue={indicators['Targets'][0].slug}
        >
          <ScrollArea>
            <div
              className="flex flex-col gap-8 max-h-[680px]"
              ref={indicatorRef}
            >
              <IndicatorContent
                heading="Targets"
                list={indicators['Targets']}
              />
              <IndicatorContent
                heading="District Profile"
                list={indicators['District Profile']}
              />
              <IndicatorContent
                heading="District Performance"
                list={indicators['District Performance']}
              />
            </div>
          </ScrollArea>
        </RadioGroup>
      </div>
    </div>
  );
};

const IndicatorContent = ({
  list,
  heading,
}: {
  heading: string;
  list: {
    label: string;
    slug: string;
  }[];
}) => {
  return (
    <section>
      <div className="mb-3">
        <Text variant="headingSm">{heading}</Text>
        <Separator className="mt-3" />
      </div>
      {list.map((child) => {
        return (
          <RadioItem key={child.label} value={child.slug}>
            {child.label}
          </RadioItem>
        );
      })}
    </section>
  );
};

// temp data for map chart
const dataFile = mapFile.features.map((feature: any) => {
  return {
    name: feature.properties.district,
    value: Math.round(Math.random() * 1000),
  };
});

const Content = ({ indicatorRef }: { indicatorRef: any }) => {
  const [selectedTab, setSelectedTab] = React.useState('map');

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
  }, [selectedTab]);

  const tabs = [
    {
      label: 'Map View',
      value: 'map',
      constent: (
        <MapChart
          mapFile={mapFile}
          data={dataFile}
          mapName="assam"
          nameProperty="district"
          height="500px"
        />
      ),
    },
    {
      label: 'Bar View',
      value: 'bar',
      constent: (
        <BarChart
          xAxis={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
          data={[120, 210, 150, 80, 70, 110, 130]}
          height="500px"
        />
      ),
    },
    {
      label: 'Table View',
      value: 'table',
      constent: (
        <Table
          columns={columns}
          rows={tableData}
          columnContentTypes={columnContentTypes}
        />
      ),
    },
  ];

  return (
    <div className="grow h-full">
      <Tabs
        defaultValue={explorer.tabs[0].value}
        onValueChange={setSelectedTab}
        value={selectedTab}
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
            <ComboboxMulti
              name="block"
              label="Block"
              labelHidden
              defaultList={['Block 1', 'Block 2', 'Block 3', 'Block 4']}
              defaultValues={['Block 1']}
              className="w-full"
              placeholder='Select "Block"'
              verticalContent
            />
            <Select
              name="sort"
              label="Sort By"
              labelHidden
              options={[
                { label: 'Ascending Order', value: 'asc' },
                { label: 'Descending Order', value: 'desc' },
              ]}
              className="w-1/3 grow"
            />
            <Select
              name="year"
              label="Year"
              labelHidden
              options={[
                { label: '2019', value: '2019' },
                { label: '2020', value: '2020' },
              ]}
              className="w-1/3 grow"
            />
          </div>

          {tabs.map((tab) => (
            <TabPanel value={tab.value} key={tab.value}>
              <div className="relative overflow-y-auto mt-5">
                {tab.constent}
              </div>
            </TabPanel>
          ))}
        </div>
      </Tabs>
    </div>
  );
};
