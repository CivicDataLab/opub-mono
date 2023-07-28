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

      <div className="">
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
          <Tabs defaultValue="narrative">
            <TabList fitted>
              <Tab value="narrative">
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
            <TabPanel value="narrative">
              <div>Scheme Narrative</div>
            </TabPanel>
            <TabPanel value="explorer">
              <div>Scheme Explorer</div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </>
  );
};
