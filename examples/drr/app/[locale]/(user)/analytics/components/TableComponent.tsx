import { Table } from 'opub-ui/src';
import styles from './styles.module.scss';

export function TableComponent({ rowData, columnData }: any) {
  return (
    <Table
      columnContentTypes={['text', 'text', 'text', 'text', 'text', 'text']}
      columns={columnData}
      sortColumns={["revenue-circle" , "district"]}
      rows={rowData}
      className={styles.Table}
    />
  );
}
