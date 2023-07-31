'use client';

import Image from 'next/image';
import {
  Breadcrumbs,
  Divider,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Text,
} from 'opub-ui';

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

        <div className="">
          <Tabs defaultValue="overview">
            <TabList fitted>
              <Tab value="overview">
                <Text variant="headingLg" as="h2">
                  Scheme Narrative
                </Text>
              </Tab>
              <Tab value="explorer">
                <Text variant="headingLg" as="h2">
                  Scheme Explorer
                </Text>
              </Tab>
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
        </div>
      </div>
    </>
  );
};
