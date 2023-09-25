'use client';

import { Breadcrumbs, Tab, TabList, TabPanel, Tabs, Text } from 'opub-ui';

import { datasetsExplorerPageHeader } from '@/config/consts';
import { DatasetInfoCard } from './DatasetInfoCard';
import { DatasetResources } from './DatasetResources';
import { MetadataCard } from './MetadataCard';
import { GraphQL } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { DATASET_BY_SLUG } from '@/config/graphql/queries';

export function Content({slug}: {slug: string}) {

  const { data } = useQuery([`dataset_by_slug_${slug}`], () =>
  GraphQL(DATASET_BY_SLUG , {
    dataset_slug: slug
  })
);

  console.log("Dataset by slug: " , data)

  // const breadcrumbs = [
  //   {
  //     label: 'Assam Homepage',
  //     href: '/',
  //   },
  //   {
  //     label: 'Datasets',
  //     href: `/datasets`,
  //   },
  //   {
  //     label: `${data?.title || 'NA'}`,
  //     href: `${data?.slug || 'NA'}`,
  //   },
  // ];

  // const tabContent = [
  //   {
  //     label: 'Data Resources',
  //     value: 'data-resources',
  //     content:
  //       data?.resources?.length !== 0 ? (
  //         <DatasetResources resources={data?.resources ?? []} />
  //       ) : (
  //         <Text>Not Found</Text>
  //       ),
  //   },
  //   {
  //     label: 'Visualizations',
  //     value: 'visualizations',
  //     content: <Text>Coming Soon</Text>,
  //   },
  // ];

  // const tabList = [
  //   {
  //     label: 'Data Resources',
  //     value: 'data-resources',
  //   },
  //   {
  //     label: 'Visualizations',
  //     value: 'visualizations',
  //   },
  // ];

  return (
    <p>Hello Dataset explorer</p>
    // <div className="grid gap-4">
    //   <Text className="ps-6 pt-4" variant="headingLg">
    //     {datasetsExplorerPageHeader}
    //   </Text>
    //   <div className="bg-surface py-3.5 ps-6">
    //     <Breadcrumbs crumbs={breadcrumbs} />
    //   </div>
    //   <div className="container flex flex-col gap-6">
    //     <DatasetInfoCard
    //       title={data?.title}
    //       description={data?.description}
    //       source={data?.source}
    //       homepage={data?.organization?.homepage || '#'}
    //       logo = {data?.organization?.logo}
    //     />

    //     <div className="flex gap-1">
    //       <div className="px-8 bg-surface rounded-1 shadow-card flex gap-1 grow">
    //         <Tabs className="min-w-full" defaultValue="data-resources">
    //           <TabList>
    //             {tabList.map((tab) => (
    //               <Tab value={tab.value} key={tab.value}>
    //                 <div className="flex items-center gap-3">
    //                   <Text variant="bodyMd" fontWeight="medium">
    //                     {tab.label}
    //                   </Text>
    //                 </div>
    //               </Tab>
    //             ))}
    //           </TabList>
    //           {tabContent.map((tab) => (
    //             <TabPanel value={tab.value} key={tab.value}>
    //               <div className="relative overflow-y-auto mt-5">
    //                 {tab.content}
    //               </div>
    //             </TabPanel>
    //           ))}
    //         </Tabs>
    //       </div>
    //       <MetadataCard
    //         lastUpdated={data?.metaData.lastUpdated || 'NA'}
    //         updateFrequency={data?.metaData.updateFrequency || 'NA'}
    //         fileTypes={data?.metaData.fileTypes}
    //         tags={data?.metaData.tags ?? []}
    //         licenses={data?.metaData.licenses}
    //       />
    //     </div>
    //   </div>
    // </div>
  );
}
