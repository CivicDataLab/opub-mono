import { Datasets, FilterProps } from '@/types';

import { elasticSearch } from '@/config/site';
import { getData } from '@/lib/api';
import { Content } from './components/dataset-layout';

export default async function Home() {
  const datasetData = await getData(elasticSearch.datasets);

  const filters : FilterProps[] = Object.keys(datasetData?.aggregations).map((key) => ({
    [key]: datasetData?.aggregations[key]?.all?.buckets.map((bucket: { key: string; }) => bucket.key),
  }));
  
  const data: Datasets[] = datasetData?.hits?.hits?.map((item: any) => {
    return {
      title: item._source?.dataset_title,
      slug: item._source?.slug,
      source: item._source?.source,
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

    return <Content count={datasetData?.hits?.total?.value} data={data} filters={filters}/>;
}
