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
import { departments } from '../../department.config';
import { Explorer } from './Explorer';
import { Overview } from './Overview';

export const Content = ({
  data,
  schemeData,
  params,
}: {
  data: {
    breadcrumbs: {
      label: string;
      href: string;
    }[];
    lastUpdaed: string;
    schemeInfo: string[];
    tabs: {
      label: string;
      value: string;
      icon: string;
    }[];
  };
  schemeData: {
    title: string;
    logo: string;
  };
  params: { scheme: string; department: string };
}) => {
  const breadcrumbs = [
    ...data.breadcrumbs,
    {
      label: departments[params.department].title || 'Department',
      href: params.department,
    },
    { label: schemeData.title, href: params.scheme },
  ];

  return (
    <>
      <Breadcrumbs crumbs={breadcrumbs} />

      <div className="mt-4">
        <div className="flex gap-4 flex-wrap md:flex-nowrap">
          <Image
            src={schemeData.logo}
            alt=""
            width={168}
            height={92}
            className="object-contain"
          />
          <div>
            <Text variant="heading2xl" as="h1" className="mt-4">
              {schemeData.title}
            </Text>
            <Text
              variant="headingSm"
              as="p"
              color="subdued"
              fontWeight="medium"
              className="my-4"
            >
              Last Updated: {data.lastUpdaed}
            </Text>

            <div className="flex flex-col gap-3">
              {data.schemeInfo.map((info, index) => (
                <Text variant="bodyLg" as="p" key={index}>
                  {info}
                </Text>
              ))}
            </div>
          </div>
        </div>

        <Divider className="my-6" />

        <TabLayout tabs={data.tabs} />
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
          <Overview />
        </TabPanel>
        <TabPanel value="explorer">
          <Explorer />
        </TabPanel>
      </div>
    </Tabs>
  );
};
