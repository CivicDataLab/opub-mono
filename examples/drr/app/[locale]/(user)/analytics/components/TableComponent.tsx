import { Table } from 'opub-ui/src';

export function TableComponent({ rowData, columnData }: any) {
  return (
    <Table
      columnContentTypes={['text', 'text', 'text', 'text', 'text', 'text']}
      columns={columnData}
      rows={rowData}
    />
  );
}
