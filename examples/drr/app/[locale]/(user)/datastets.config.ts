'use client';

import { useQuery } from '@tanstack/react-query';

import { ALL_DATASETS_QUERY } from '@/config/graphql/queries';
import { GraphQL } from '@/lib/api';


export const Datasets = () : any => {
const { data } = useQuery([`all_datasets`], () => GraphQL(ALL_DATASETS_QUERY));
  return data?.all_datasets?.map((item) => {
      item && {
        title: item.title,
        slug: item.slug,
        source: item.catalog.organization.title,
        description: item.description,
        organization: {
          logo: item.catalog.organization?.logo || 'NA',
          homepage: item.catalog.organization.homepage || 'NA',
        },
        metaData: {
          lastUpdated: item.modified || 'NA',
          updateFrequency: item.update_frequency || 'NA',
          period: [item.period_from, item.period_to],
          fileTypes: [
            ...item.resource_set.map((file) =>
              file.file_details ? file.file_details?.format : 'NA'
            ),
          ],
          tags: [...item.tags.map((tag) => (tag ? tag.name : 'NA'))],
          licenses: (item.datasetaccessmodel_set || []).map((item) =>
            item?.data_access_model?.license?.title !== ''
              ? item.data_access_model.license.title
              : 'NA'
          ),
        },
        resources: (item.resource_set || []).map((resource) => ({
          fileName: resource.file_details?.source_file_name || 'NA',
          size: 'NA',
          updated: resource.modified,
        })),
      }
  });
};
