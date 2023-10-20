'use client';

import { useQuery } from '@tanstack/react-query';
import { Breadcrumbs, Tab, TabList, TabPanel, Tabs, Text } from 'opub-ui';

import { datasetsExplorerPageHeader } from '@/config/consts';
import { DATASET_BY_SLUG } from '@/config/graphql/dataset-queries';
import { GraphQL } from '@/lib/api';
import { DatasetInfoCard } from './DatasetInfoCard';
import { DatasetResources } from './DatasetResources';
import { MetadataCard } from './MetadataCard';
import { formatDate } from '@/lib/utils';

export function Content({ slug }: { slug: string }) {
  const { data } = useQuery([`dataset_by_slug_${slug}`], () =>
    GraphQL('datasets' , DATASET_BY_SLUG, {
      dataset_slug: slug,
    })
  );

  const explorerData = data?.dataset_by_slug;

  const breadcrumbs = [
    {
      label: 'Assam Homepage',
      href: '/',
    },
    {
      label: 'Datasets',
      href: `/datasets`,
    },
    {
      label: `${explorerData?.title || 'NA'}`,
      href: slug,
    },
  ];

  const tabContent = [
    {
      label: 'Data Resources',
      value: 'data-resources',
      content:
        explorerData?.resource_set?.length !== 0 ? (
          explorerData?.resource_set.map((resource) => (
            <DatasetResources
              fileName={resource?.file_details?.source_file_name || 'NA'}
              modified={resource?.modified}
              size={resource?.byte_size || 0}
            />
          ))
        ) : (
          <Text>Not Found</Text>
        ),
    },
    {
      label: 'Visualizations',
      value: 'visualizations',
      content: <Text>Coming Soon</Text>,
    },
  ];

  const tabList = [
    {
      label: 'Data Resources',
      value: 'data-resources',
    },
    {
      label: 'Visualizations',
      value: 'visualizations',
    },
  ];

  return (
    <div className="grid gap-4">
      <Text className="ps-6 pt-4" variant="headingLg">
        {datasetsExplorerPageHeader}
      </Text>
      <div className="bg-surface py-3.5 ps-6">
        <Breadcrumbs crumbs={breadcrumbs} />
      </div>
      <div className="container flex flex-col gap-6">
        <DatasetInfoCard
          title={explorerData?.title || 'NA'}
          description={explorerData?.description || 'NA'}
          source={explorerData?.catalog?.organization?.title || 'NA'}
          homepage={explorerData?.catalog?.organization?.homepage || '#'}
          logo={explorerData?.catalog?.organization?.logo || '/logo/nhm.png'}
        />

        <div className="flex gap-1">
          <div className="px-8 bg-surface rounded-1 shadow-card flex gap-1 grow">
            <Tabs className="min-w-full" defaultValue="data-resources">
              <TabList>
                {tabList.map((tab) => (
                  <Tab value={tab.value} key={tab.value}>
                    <div className="flex items-center gap-3">
                      <Text variant="bodyMd" fontWeight="medium">
                        {tab.label}
                      </Text>
                    </div>
                  </Tab>
                ))}
              </TabList>
              {tabContent.map((tab) => (
                <TabPanel value={tab.value} key={tab.value}>
                  <div className="relative overflow-y-auto mt-5">
                    {tab.content}
                  </div>
                </TabPanel>
              ))}
            </Tabs>
          </div>
          <MetadataCard
            lastUpdated={formatDate(explorerData?.modified) || 'NA'}
            updateFrequency={explorerData?.update_frequency || 'NA'}
            fileTypes={explorerData?.resource_set.map(
              (item) => item?.file_details?.format || 'NA'
            )}
            tags={(explorerData?.tags || []).map((item) => item?.name || 'NA')}
            licenses={(explorerData?.datasetaccessmodel_set || []).map(
              (item) => item.data_access_model.license.title || 'NA'
            )}
          />
        </div>
      </div>
    </div>
  );
}
