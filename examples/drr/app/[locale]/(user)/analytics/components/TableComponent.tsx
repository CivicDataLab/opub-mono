import { Table } from 'opub-ui/src';
import styles from './styles.module.scss';

export function TableComponent({ rowData, columnData }: any) {
  console.log("🚀 ~ file: TableComponent.tsx:5 ~ TableComponent ~ rowData:", rowData)
  return (
    <Table
      columnContentTypes={['text', 'text', 'text', 'text', 'text', 'text']}
      columns={columnData}
      rows={rowData}
      className={styles.Table}
    />
  );
}
