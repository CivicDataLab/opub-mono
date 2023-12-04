'use client';

// import { graphql } from '@/gql';
import { Datasets, FilterProps } from '@/types';
import { Breadcrumbs, Icon, IconButton, Text, TextField } from 'opub-ui';

import { datasetsPageHeader } from '@/config/consts.ts';
import { Icons } from '@/components/icons';
import { DatasetCard } from './DatasetCard';
import { FilterBox } from './FilterBox';

export function Content({
  count,
  data,
  filters,
}: {
  count: number;
  data: Datasets[];
  filters: FilterProps[];
}) {
  const breadcrumbs = [
    {
      label: 'Assam Homepage',
      href: '/',
    },
    {
      label: 'Datasets',
      href: `/datasets`,
    },
  ];

  if (typeof document !== 'undefined') {
    setTimeout(() => {
      document.body.style.cssText = 'overflow: auto;';
    }, 1000);
  }
  const DownloadDatasetMap: { [key: string]: string } = {
    'Composite Score':
      'https://opub-backend.civicdatalab.in/get_dist_data/?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFiaGluYXZAY2l2aWNkYXRhbGFiLmluIiwiZGFtX3Jlc291cmNlIjo1LCJkYW1fcmVxdWVzdCI6NSwiZGFtIjo0LCJyZXNvdXJjZV9pZCI6NSwiZXhwIjoxNzE2OTcyNDYxLCJ0b2tlbl90aW1lIjoiMTIvMDEvMjAyMywgMDg6NDc6NDEiLCJpYXQiOjE3MDE0MjA0NjF9.wLKVYHzIYZ3sBh6R19WHSh__rjBR2yxei8O6kPOUtp8&format=CSV&type=file',
    Exposure:
      'https://opub-backend.civicdatalab.in/get_dist_data/?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFiaGluYXZAY2l2aWNkYXRhbGFiLmluIiwiZGFtX3Jlc291cmNlIjo1LCJkYW1fcmVxdWVzdCI6NSwiZGFtIjo0LCJyZXNvdXJjZV9pZCI6NSwiZXhwIjoxNzE2OTcyNDYxLCJ0b2tlbl90aW1lIjoiMTIvMDEvMjAyMywgMDg6NDc6NDEiLCJpYXQiOjE3MDE0MjA0NjF9.wLKVYHzIYZ3sBh6R19WHSh__rjBR2yxei8O6kPOUtp8&format=CSV&type=file',
    Vulnerability:
      'https://opub-backend.civicdatalab.in/get_dist_data/?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFiaGluYXZAY2l2aWNkYXRhbGFiLmluIiwiZGFtX3Jlc291cmNlIjoxMCwiZGFtX3JlcXVlc3QiOjcsImRhbSI6OSwicmVzb3VyY2VfaWQiOjEwLCJleHAiOjE3MTY5NzI2NjQsInRva2VuX3RpbWUiOiIxMi8wMS8yMDIzLCAwODo1MTowNCIsImlhdCI6MTcwMTQyMDY2NH0.WJ93XyotX5QMrA6Eg9v1EvWwvEgBgfLC-zyPZU5qQHE&format=CSV&type=file',
    'Losses and Damages':
      'https://opub-backend.civicdatalab.in/get_dist_data/?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFiaGluYXZAY2l2aWNkYXRhbGFiLmluIiwiZGFtX3Jlc291cmNlIjoxMSwiZGFtX3JlcXVlc3QiOjgsImRhbSI6MTAsInJlc291cmNlX2lkIjoxMSwiZXhwIjoxNzE2OTcyNzUxLCJ0b2tlbl90aW1lIjoiMTIvMDEvMjAyMywgMDg6NTI6MzEiLCJpYXQiOjE3MDE0MjA3NTF9.L97zqQYIR4wwOJspvJlSiUyCb1QjxRP1MbYfxO2fuhs&format=CSV&type=file',
    'Government Response':
      'https://opub-backend.civicdatalab.in/get_dist_data/?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFiaGluYXZAY2l2aWNkYXRhbGFiLmluIiwiZGFtX3Jlc291cmNlIjo4LCJkYW1fcmVxdWVzdCI6OSwiZGFtIjo3LCJyZXNvdXJjZV9pZCI6OCwiZXhwIjoxNzE2OTcyODAyLCJ0b2tlbl90aW1lIjoiMTIvMDEvMjAyMywgMDg6NTM6MjIiLCJpYXQiOjE3MDE0MjA4MDJ9.9f85V9aSDQrFVyR82Z0mhnOzFC1e1jYQviU3lZ03IPI&format=CSV&type=file',
    Hazard:
      'https://opub-backend.civicdatalab.in/get_dist_data/?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFiaGluYXZAY2l2aWNkYXRhbGFiLmluIiwiZGFtX3Jlc291cmNlIjo5LCJkYW1fcmVxdWVzdCI6MTAsImRhbSI6OCwicmVzb3VyY2VfaWQiOjksImV4cCI6MTcxNjk3Mjg1MCwidG9rZW5fdGltZSI6IjEyLzAxLzIwMjMsIDA4OjU0OjEwIiwiaWF0IjoxNzAxNDIwODUwfQ.Evvh7T03ER7XsJRovbg9r3ouqWoz8bE486Orw_lfp50&format=CSV&type=file',
    'Mean elevation':
      'https://opub-backend.civicdatalab.in/get_dist_data/?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFiaGluYXZAY2l2aWNkYXRhbGFiLmluIiwiZGFtX3Jlc291cmNlIjoxMiwiZGFtX3JlcXVlc3QiOjExLCJkYW0iOjExLCJyZXNvdXJjZV9pZCI6MTIsImV4cCI6MTcxNjk3MjkyMywidG9rZW5fdGltZSI6IjEyLzAxLzIwMjMsIDA4OjU1OjIzIiwiaWF0IjoxNzAxNDIwOTIzfQ.Hd5J6KB9G7-2FFpVEw2gGO8-hZuFXOhdSoOIzJP7OU8&format=CSV&type=file',
  };

  return (
    <div className="grid gap-4">
      <div className="container mt-6">
        <Text variant="heading2xl">{datasetsPageHeader}</Text>
      </div>

      <div className="container">
        <div className="mt-2 mb-6 flex gap-8 bg-surfaceHighlightSubdued border-b-1 items-center pt-3 pb-4 pl-8 pr-8">
          <Text variant="headingSm" as="h1" alignment="center" color="subdued">
            Showing {count} datasets
          </Text>
          <div className="w-7/12 flex gap-2 items-center">
            <div className="flex-1">
              <TextField
                placeholder="Search"
                name="Search"
                label="Search"
                type="search"
                labelHidden
              />
            </div>
            <IconButton
              className="bg-actionsSecondaryBasicDefault rounded-1 border-1 border-solid border-borderHighlightDefault"
              color={'highlight'}
              icon={Icons.search}
            >
              Search
            </IconButton>
          </div>

          {/* <Text variant="headingSm" as="h1" alignment="center" color="subdued">
            SORT BY :
          </Text> */}
        </div>
      </div>

      <div className="container flex gap-10">
        <div className=" w-1/5">
          <FilterBox filters={filters} />
        </div>
        <div className="flex w-4/5 flex-col gap-4 rounded shadow-card border-solid p-6">
          {data.map((dataset, index) => (
            <DatasetCard
              keyIndex={index}
              title={dataset?.title || 'NA'}
              source={dataset?.source || 'NA'}
              description={dataset?.description || 'NA'}
              lastUpdated={dataset?.metaData?.lastUpdated || 'NA'}
              updateFrequency={dataset?.metaData?.updateFrequency || 'NA'}
              period={dataset?.metaData?.period}
              fileTypes={dataset?.metaData?.fileTypes}
              tags={dataset?.metaData?.tags}
              slug={dataset?.slug || 'NA'}
              datasetDownloadLink={DownloadDatasetMap[dataset?.title]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
