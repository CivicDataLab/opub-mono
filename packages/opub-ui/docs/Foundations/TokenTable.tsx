import { Button } from '../../src/components/Button';
import { DataTable } from '../../src/components/DataTable';
import { useToast } from '../../src/components/Toast';
import { createColumnHelper } from '@tanstack/react-table';

export const TokenTable = ({ data, exampleFormat }: any) => {
  const { toast } = useToast();

  function copyToClipboard(text: string) {
    const elem = document.createElement('textarea');
    elem.value = text;
    document.body.appendChild(elem);
    elem.select();
    document.execCommand('copy');
    document.body.removeChild(elem);
  }

  type Token = {
    name: string;
    value: string;
    example: any;
  };

  const columnHelper = createColumnHelper<Token>();

  const columns = [
    columnHelper.accessor('name', {
      cell: (info) => {
        const value = info.getValue();
        return (
          <Button
            onClick={() => {
              copyToClipboard(convertToCssVariable(value));

              toast({
                title: `copied ${value} as css variable`,
              });
            }}
            kind="tertiary"
          >
            {value}
          </Button>
        );
      },
      header: () => 'Token',
    }),
    columnHelper.accessor('value', {
      cell: (info) => info.getValue(),
      header: () => 'Value',
    }),
    columnHelper.accessor('example', {
      cell: (info) => {
        return exampleFormat(info);
      },
      header: () => 'Example',
    }),
  ];

  return (
    <div>
      <DataTable
        rows={data}
        columns={columns}
        hideSelection
        addToolbar
        hideViewSelector
        defaultRowCount={50}
      />
    </div>
  );
};

export function convertToCssVariable(name: string) {
  return `var(--${name.split('/').join('-').toLowerCase()})`;
}