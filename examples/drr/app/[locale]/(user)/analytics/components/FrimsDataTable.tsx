import React from 'react';
import { Separator, Text } from 'opub-ui';
import { Table } from 'opub-ui/src';

export function FrimsDataTable({ boundary , rowData }: { boundary:string; rowData: any }) {

  const DataColumns = [
    {
      accessorKey: boundary,
      header: boundary === 'revenue-circle' ? 'Revenue Circle' : 'District',
    },
    {
      accessorKey: 'population-affected',
      header: 'Population Affected',
    },
  ];

  return (
    <div className='flex flex-col'>
      <Text className={"mb-2"} variant="bodyLg">Population affected (FRIMS)</Text>
      <Separator className='mb-2'/>
      <Table
        columnContentTypes={['text', 'text', 'text']}
        columns={DataColumns}
        rows={rowData}
        hideFooter
      />
    </div>
  );
}
