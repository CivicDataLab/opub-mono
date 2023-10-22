import React from 'react';
import { Separator, Table, Text } from 'opub-ui';

const DataColumns = [
  {
    accessorKey: 'district',
    header: 'District',
  },
  {
    accessorKey: 'population-affected',
    header: 'Population Affected',
  },
];

export function FrimsDataTable({ rowData }: { rowData: any }) {
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
