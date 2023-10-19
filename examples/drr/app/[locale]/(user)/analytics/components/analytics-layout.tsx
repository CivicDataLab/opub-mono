'use client';

import { useQuery } from '@tanstack/react-query';
import { Table } from 'opub-ui';

import { ANALYTICS_TABLE_DATA } from '@/config/graphql/analaytics-queries';
import { GraphQL } from '@/lib/api';
import { MapComponent } from './ChoroplethMap';

export function Content() {
  const { data } = useQuery([`district_table_data`], () =>
    GraphQL('analytics', ANALYTICS_TABLE_DATA)
  );

  const columnData = [
    {
      accessorKey: 'district',
      header: 'District',
    },
    {
      accessorKey: 'composite-score',
      header: 'Composite Score',
    },
    {
      accessorKey: 'damages-and-losses',
      header: 'Damages and Losses',
    },
    {
      accessorKey: 'vulnerability',
      header: 'Vulnerability',
    },
    {
      accessorKey: 'governance-response',
      header: 'Governance response',
    },
    {
      accessorKey: 'flood-hazard',
      header: 'Flood Hazard',
    },
    {
      accessorKey: 'exposure',
      header: 'Exposure',
    },
  ];

  return (
    <div className="w-full h-full grid gap-4 grid-rows-2">
      <MapComponent />
      <Table
        columnContentTypes={['text', 'text', 'text', 'text', 'text', 'text']}
        columns={columnData}
        rows={data?.districtViewTableData}
      />
    </div>
  );
}
