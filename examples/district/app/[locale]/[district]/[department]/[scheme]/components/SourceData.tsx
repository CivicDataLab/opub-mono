import { downloadTable } from '../scheme.config';
import { IndicatorsCheckbox } from './IndicatorsCheckbox';
import { ITable } from './scheme-layout';
import Icons from '@/components/icons';
import { ckan } from '@/config/site';
import { useFetch } from '@/lib/api';
import { cn } from '@/lib/utils';
import { createColumnHelper } from '@tanstack/react-table';
import { Button, Icon, Select, Table, Text } from 'opub-ui/src';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export const SourceData = ({
  tableData,
  scheme,
}: {
  tableData: ITable;
  scheme?: string;
}) => {
  const [selectedYear, setYear] = React.useState(Object.keys(tableData)[0]);
  const [selectedIndicators, setIndicators] = React.useState({
    'District Performance': [],
    'District Profile': [],
    Targets: [],
  });

  const { data: indicatorData, isLoading } = useFetch(
    'indicators',
    ckan.indicators
  );

  const indicatorRef = React.useRef(null);
  const contentRef = React.useRef(null);
  React.useEffect(() => {
    // change height of indicator list based on content height
    if (indicatorRef.current && contentRef.current) {
      setTimeout(() => {
        // it takes some time to render the content
        const indicatorList: any = indicatorRef.current;
        const content: any = contentRef.current;
        if (content === null) return;

        const contentHeight = content.offsetHeight;
        indicatorList.style.maxHeight = `${contentHeight - 200}px`;
      }, 20);
    }
  }, []);

  // replace slug with value in indicatorData
  const indicatorDataWithValues = React.useMemo(() => {
    if (!indicatorData) return null;
    const data: any = {
      'District Performance': [],
      'District Profile': [],
      Targets: [],
    };
    const schemeData = indicatorData[scheme as string];
    Object.keys(schemeData).forEach((key) => {
      const indicators = schemeData[key];
      data[key] = indicators.map((indicator: any) => {
        return {
          label: indicator.label,
          value: indicator.label,
        };
      });
    });

    return data;
  }, [indicatorData]);

  const columns: any = [
    {
      header: 'Block',
      accessorKey: 'Block',
    },
  ];
  const columnContentTypes: any = ['text'];
  const columnHelper = createColumnHelper();

  const allSelectedIndicators: any = Object.values(selectedIndicators).flat();

  // Create columns based on the first row
  allSelectedIndicators.forEach((key: any) => {
    columns.push(columnHelper.accessor(key, { header: key }));
    columnContentTypes.push('numeric');
  });

  return (
    <div>
      <div
        className={cn(
          'grid grid-cols-[242px_1fr] gap-4 rounded-05 bg-surfaceDefault shadow-elementCard p-6'
        )}
      >
        {isLoading ? (
          <div className="p-4">
            <Text variant="headingMd">Loading...</Text>
          </div>
        ) : indicatorData ? (
          <IndicatorsCheckbox
            data={indicatorDataWithValues}
            indicatorRef={indicatorRef}
            selectedIndicators={selectedIndicators}
            setIndicators={setIndicators}
          />
        ) : (
          <div className="p-4">
            <Text variant="headingMd">No indicators available</Text>
          </div>
        )}

        <ErrorBoundary
          fallback={
            <div className="flex items-center justify-center h-full">
              <Text variant="headingLg" as="h2">
                Error loading Explorer
              </Text>
            </div>
          }
        >
          <div className="grow h-full overflow-x-auto p-1" ref={contentRef}>
            <div className="flex mb-4">
              <Select
                name="year"
                label="Year"
                labelHidden
                onChange={setYear}
                value={selectedYear}
                options={Object.keys(tableData).map((year) => ({
                  label: year,
                  value: year,
                }))}
              />
            </div>
            <Table
              columns={columns}
              rows={tableData[selectedYear]}
              columnContentTypes={columnContentTypes}
              key={selectedYear}
              sortColumns={columns.map(
                (e: { accessorKey: any }) => e.accessorKey
              )}
            />
            <div className="mt-3 flex justify-end">
              <Button
                onClick={() => {
                  downloadTable(
                    columns,
                    tableData[selectedYear],
                    'source-data'
                  );
                }}
                icon={<Icon source={Icons.download} />}
              >
                Download File
              </Button>
            </div>
          </div>
        </ErrorBoundary>
      </div>
    </div>
  );
};
