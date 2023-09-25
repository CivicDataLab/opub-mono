import { Datasets, FilterProps } from '@/types';

import { elasticSearch } from '@/config/site';
import { getData } from '@/lib/api';
import { Content } from './components/dataset-layout';

export default async function Home() {
  const filters: FilterProps[] = [
    {
      Category: [
        'Exposure',
        'Flood Hazard',
        'Vulnerability - Losses & Damages',
        'Coping Capacity - Infrastructure',
        'Coping Capacity - Governance',
      ],
    },
    {
      'Reference Period': ['2023', '2022', '2021', '2020'],
    },
    {
      'Administrative Division': ['Revenue Circle', 'District', 'State'],
    },
  ];

  const datasetData = await getData(elasticSearch.datasets);
  const data: Datasets[] = datasetData?.hits?.hits?.map((item: any) => {
    return {
      title: item._source?.dataset_title,
      slug: item._source?.slug,
      source: item._source?.catalog_title,
      description: item._source?.dataset_description,
      organization: {
        logo: item?.org_logo || 'NA',
      },
      metaData: {
        lastUpdated: item._source?.last_updated || 'NA',
        updateFrequency: item._source?.update_frequency || 'NA',
        period: [item._source?.period_from, item._source?.period_to],
        fileTypes: item?._source?.format || '',
        tags: item._source?.tags,
        licenses: item._source?.license,
      },
    };
  });

  return <Content data={data} filters={filters} />;
}
