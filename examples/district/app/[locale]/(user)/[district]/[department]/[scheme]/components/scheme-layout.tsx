'use client';

import React from 'react';
import Image from 'next/image';
import {
  Breadcrumbs,
  Divider,
  Icon,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Text,
} from 'opub-ui';

import Icons from '@/components/icons';
import { schemes } from '../scheme.config';
import { Explorer } from './Explorer';
import { Overview } from './Overview';

export interface IOverview {
  schemeTitle: string;
  schemeDesc: string;
  lastUpdate: string;
  targetTitle: string;
  targets: {
    value: number;
    label: string;
    description: string;
    type: string;
  }[];
  profileTitle: string;
  profiles: {
    label: string;
    description: string;
    image: string;
    data: {
      xAxis: string[];
      values: number[];
    };
  }[];
  performanceTitle: string;
  performances: {
    value: string;
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
      <Breadcrumbs crumbs={breadcrumbs} />

      <div className="mt-4">
        <div className="flex gap-4 flex-wrap justify-start  md:flex-nowrap">
          <Image
            src={schemes[data.scheme].logo}
            alt=""
            width={168}
            height={92}
            className="object-contain"
          />
          <div className="grow">
            <Text variant="heading2xl" as="h1">
              {schemeData.schemeTitle}
            </Text>
            <Text
              variant="headingSm"
              as="p"
              color="subdued"
              fontWeight="medium"
              className="my-4"
            >
              Last Updated: {data.schemeData.lastUpdate}
            </Text>

            <Text variant="bodyLg" as="p">
              {data.schemeData.schemeDesc}
            </Text>
          </div>
        </div>

        <Divider className="my-6" />

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
  const [value, setValue] = React.useState('overview');

  return (
    <Tabs onValueChange={setValue} value={value}>
      <TabList fitted>
        {tabs.map((tab) => (
          <Tab value={tab.value} key={tab.value}>
            <div className="flex items-center gap-3">
              <Icon
                source={Icons[tab.icon]}
                size={40}
                color={value === tab.value ? 'primary' : 'subdued'}
                stroke={1}
              />
              <Text
                variant="headingLg"
                as="h2"
                color={value === tab.value ? 'default' : 'subdued'}
              >
                {tab.label}
              </Text>
            </div>
          </Tab>
        ))}
      </TabList>
      <div className="rounded-05 bg-surface shadow-card p-4 md:p-6 mt-3">
        <TabPanel value="overview">
          <Overview data={tabs[0].data} />
        </TabPanel>
        <TabPanel value="explorer">
          <Explorer
            scheme={tabs[1].scheme}
            tableData={tabs[1].tableData as ITable}
            chartData={tabs[1].chartData as IChartData}
            district={tabs[1].district as string}
          />
        </TabPanel>
      </div>
    </Tabs>
  );
};
