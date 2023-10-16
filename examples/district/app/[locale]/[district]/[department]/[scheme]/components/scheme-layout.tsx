'use client';

import Icons from '@/components/icons';
import Image from 'next/image';
import {
  Button,
  Icon,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Text,
  useToast,
} from 'opub-ui';
import React from 'react';
import { BreadCrumb } from '../../../components';
import { schemes } from '../scheme.config';
import { Explorer } from './Explorer';
import { Overview } from './Overview';
import { SourceData } from './SourceData';
import { parseAsString, useQueryState } from 'next-usequerystate';
import { copyURLToClipboard, exportAsImage } from '@/lib/utils';

export interface IOverview {
  schemeTitle: string;
  schemeDesc: string;
  lastUpdated: string;
  targetTitle: string;
  targets: {
    value: number;
    label: string;
    description: string;
    type: string;
    min: number;
    max: number;
  }[];
  profileTitle: string;
  profiles: {
    label: string;
    description: string;
    image: string;
    type: string;
    data?: {
      xAxis: string[];
      values: number[];
    };
    value?: string;
  }[];
  performanceTitle: string;
  performances: {
    value: string;
    type: string;
    label: string;
    description: string;
  }[];
}

export interface ITable {
  [key: string]: {
    [key: string]: string;
  }[];
}
export interface IChartData {
  [key: string]: {
    indicatorTitle: string;
    years: {
      [key: string]: {
        bardata: {
          xAxis: string[];
          values: number[];
        };
        mapData: {
          name: string;
          value: number;
        }[];
      };
    };
  };
}

interface IProps {
  district: string;
  districtName: string;
  department: string;
  departmentName: string;
  scheme: string;
  schemeData: IOverview;
  tableData: ITable;
  chartData: IChartData;
}

export const Content = ({ data }: { data: IProps }) => {
  const { schemeData, tableData, chartData } = data;

  const breadcrumbs = [
    {
      label: 'Assam',
      href: '/',
    },
    {
      label: data.districtName,
      href: `/${data.district}`,
    },
    {
      label: data.departmentName,
      href: `/${data.district}/${data.department}`,
    },
    {
      label: schemeData.schemeTitle,
      href: `/${data.district}/${data.department}/${data.scheme}`,
    },
  ];

  return (
    <>
      <BreadCrumb
        crumbs={breadcrumbs}
        backUrl={`/${data.district}/${data.department}`}
      />

      <div className="mt-4">
        <div className="flex gap-4 flex-wrap justify-start md:flex-nowrap">
          <div className="flex">
            <Image
              src={schemes[data.scheme].logo}
              alt=""
              className="object-contain"
              width={88}
              height={88}
            />
          </div>
          <div className="grow">
            <Text variant="heading2xl" as="h1">
              {schemeData.schemeTitle}
            </Text>
            <Text
              variant="bodyMd"
              fontWeight="medium"
              color="subdued"
              as="p"
              className="mt-4"
            >
              Last Updated: {data.schemeData.lastUpdated}
            </Text>
          </div>
        </div>
        <Text variant="bodyLg" as="p" className="mt-4">
          {data.schemeData.schemeDesc}
        </Text>

        <TabLayout
          tabs={[
            {
              label: 'Scheme Overview',
              value: 'overview',
              icon: 'overview',
              data: data.schemeData,
            },
            {
              label: 'Scheme Explorer',
              value: 'explorer',
              icon: 'explorer',
              scheme: data.scheme,
              chartData: chartData,
              district: data.district,
            },
            {
              label: 'Source Data',
              value: 'source-data',
              icon: 'database-search',
              scheme: data.scheme,
              tableData: tableData,
              chartData: chartData,
              district: data.district,
            },
          ]}
        />
      </div>
    </>
  );
};

const TabLayout = ({
  tabs,
}: {
  tabs: {
    label: string;
    value: string;
    icon: string;
    data?: IOverview;
    scheme?: string;
    tableData?: ITable;
    chartData?: IChartData;
    district?: string;
  }[];
}) => {
  const [tabValue, setTabValue] = useQueryState(
    'tab',
    parseAsString.withDefault('overview')
  );
  const { toast } = useToast();
  const overviewRef: any = React.useRef(null);

  return (
    <Tabs onValueChange={setTabValue} value={tabValue} className="mt-10">
      <TabList
        fitted
        className="rounded-05 shadow-elementCard bg-surfaceDefault"
      >
        {tabs.map((tab) => (
          <Tab value={tab.value} key={tab.value} activeBorder={false}>
            <div className="flex items-center gap-3">
              <Icon
                source={Icons[tab.icon]}
                size={40}
                color={tabValue === tab.value ? 'highlight' : 'subdued'}
                stroke={1}
              />
              <Text
                variant="bodyLg"
                as="h2"
                fontWeight={tabValue === tab.value ? 'medium' : 'regular'}
                color={tabValue === tab.value ? 'inherit' : 'default'}
              >
                {tab.label}
              </Text>
            </div>
          </Tab>
        ))}
      </TabList>
      <div className="mt-6 px-3 py-4 bg-surfaceDefault">
        {tabValue === 'overview' && (
          <div className="mb-3 flex items-center justify-end gap-4 flex-wrap">
            <Button
              kind="secondary"
              variant="interactive"
              onClick={() => {
                copyURLToClipboard();
                toast({
                  title: 'Copied to clipboard',
                });
              }}
            >
              Copy Link
            </Button>
            <Button
              kind="secondary"
              variant="interactive"
              onClick={() => {
                exportAsImage(overviewRef.current, 'overview');
              }}
            >
              Download
            </Button>
          </div>
        )}
        <TabPanel value="overview">
          <Overview data={tabs[0].data} ref={overviewRef} />
        </TabPanel>
        <TabPanel value="explorer">
          <Explorer
            scheme={tabs[1].scheme}
            chartData={tabs[1].chartData as IChartData}
            district={tabs[1].district as string}
          />
        </TabPanel>
        <TabPanel value="source-data">
          <SourceData
            scheme={tabs[2].scheme}
            tableData={tabs[2].tableData as ITable}
          />
        </TabPanel>
      </div>
    </Tabs>
  );
};
