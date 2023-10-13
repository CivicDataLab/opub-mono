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
      accessorKey: 'govt_resp',
      header: 'Coping Capacity: gov',
    },
    {
      accessorKey: 'demo_vul',
      header: 'Demo Vulnerability',
    },
    {
      accessorKey: 'fld_proneness',
      header: 'Flood Proneness',
    },
    {
      accessorKey: 'flood_damages',
      header: 'Flood Damages',
    },
    {
      accessorKey: 'infr_access',
      header: 'Infra Access',
    },
    {
      accessorKey: 'prep_need',
      header: 'Need for Preparedness',
    },
  ];


  return (
    <div className="w-full h-full bg-surface">
      <div className="flex">
        <MapComponent />
      </div>
      <Table
        columnContentTypes={['text', 'text', 'text', 'text', 'text', 'text']}
        columns={columnData}
        rows={data?.districtViewTableData}
      />
    </div>
  );
}
