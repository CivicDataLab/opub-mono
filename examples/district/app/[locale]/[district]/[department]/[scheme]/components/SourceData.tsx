import { downloadTable } from '../scheme.config';
import { IndicatorsCheckbox } from './IndicatorsCheckbox';
import { ITable } from './scheme-layout';
import { ckan } from '@/config/site';
import { useFetch } from '@/lib/api';
import { cn, copyURLToClipboard } from '@/lib/utils';
import { createColumnHelper } from '@tanstack/react-table';
import {
  Button,
  Select,
  Table,
  Text,
  Tray,
  Pill,
  SelectorCard,
  toast,
} from 'opub-ui';
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
  const [selectedIndicators, setSelectedIndicators] = React.useState<any>({
    'District Performance': [],
    'District Profile': [],
    Targets: [],
  });
  const [trayOpen, setTrayOpen] = React.useState(false);

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
        const indicatorHeight = contentHeight - 230;
        indicatorList.style.maxHeight = `${
          indicatorHeight <= 480 ? 480 : indicatorHeight
        }px`;
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
  }, [indicatorData, scheme]);

  React.useEffect(() => {
    // set first 5 District Performance indicators as selected by default
    if (indicatorDataWithValues) {
      const firstFive = indicatorDataWithValues['District Performance'].slice(
        0,
        5
      );
      setSelectedIndicators((prev: any) => {
        return {
          ...prev,
          'District Performance': firstFive.map((item: any) => item.value),
        };
      });
    }
  }, [indicatorDataWithValues]);

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

  function removePill(str: string) {
    let key: string, index: number;
    // find the key (indicator category) and index of the pill
    Object.keys(selectedIndicators).forEach((k: any) => {
      const i = selectedIndicators[k].indexOf(str);
      if (i !== -1) {
        key = k;
        index = i;
      }
    });

    // remove the pill
    setSelectedIndicators((prev: any) => {
      const data = { ...prev };
      data[key].splice(index, 1);
      return data;
    });
  }

  return (
    <div>
      <div className="block md:hidden mb-4">
        <SelectorCard
          title="Selected Indicators"
          selected={
            <>
              {allSelectedIndicators.length > 0 ? (
                <div className="flex flex-col gap-1">
                  {allSelectedIndicators.map((item: any) => (
                    <Pill
                      key={item}
                      variant="info"
                      truncate
                      onRemove={removePill}
                      returnValue={item}
                    >
                      {item}
                    </Pill>
                  ))}
                </div>
              ) : (
                <Text variant="bodyMd">No indicator selected</Text>
              )}
            </>
          }
          buttonText="Edit Indicators"
          onClick={() => setTrayOpen(true)}
        />
        <Tray open={trayOpen} onOpenChange={setTrayOpen} size="extended">
          {isLoading ? (
            <div className="p-4">
              <Text variant="headingMd">Loading Indicators...</Text>
            </div>
          ) : indicatorData ? (
            <IndicatorsCheckbox
              data={indicatorDataWithValues}
              indicatorRef={indicatorRef}
              selectedIndicators={selectedIndicators}
              setIndicators={setSelectedIndicators}
            />
          ) : (
            <div className="p-4">
              <Text variant="headingMd">No indicators available</Text>
            </div>
          )}
        </Tray>
      </div>
      <div
        className={cn(
          'md:grid grid-cols-[242px_1fr] gap-4 p-3 md:p-5 rounded-05 bg-surfaceHighlightSubdued md:bg-surfaceDefault shadow-elementCard'
        )}
      >
        <div className="hidden md:block">
          {isLoading ? (
            <div className="p-4">
              <Text variant="headingMd">Loading...</Text>
            </div>
          ) : indicatorData ? (
            <IndicatorsCheckbox
              data={indicatorDataWithValues}
              indicatorRef={indicatorRef}
              selectedIndicators={selectedIndicators}
              setIndicators={setSelectedIndicators}
            />
          ) : (
            <div className="p-4">
              <Text variant="headingMd">No indicators available</Text>
            </div>
          )}
        </div>

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
                label="Select FY"
                labelInline
                onChange={setYear}
                value={selectedYear}
                options={Object.keys(tableData).map((year) => ({
                  label: year,
                  value: year,
                }))}
                className="w-full md:w-fit"
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
            <div className="mt-3 justify-end gap-4 hidden md:flex">
              <Button
                kind="secondary"
                variant="interactive"
                onClick={() => {
                  copyURLToClipboard();
                  toast('Copied to clipboard', {
                    action: {
                      label: 'Dismiss',
                      onClick: () => {},
                    },
                  });
                }}
              >
                Copy Link
              </Button>
              <Button
                kind="primary"
                variant="interactive"
                onClick={() => {
                  downloadTable(
                    columns,
                    tableData[selectedYear],
                    'source-data'
                  );
                }}
              >
                Download
              </Button>
            </div>
          </div>
        </ErrorBoundary>
      </div>
      <div className="md:hidden mt-4 md:mt6 py-4 px-3 rounded-2 shadow-elementCard flex items-center justify-end gap-4 flex-wrap bg-surfaceDefault">
        <Button
          kind="secondary"
          variant="interactive"
          onClick={() => {
            copyURLToClipboard();
            toast('Copied to clipboard', {
              action: {
                label: 'Dismiss',
                onClick: () => {},
              },
            });
          }}
        >
          Copy Link
        </Button>
        <Button
          kind="primary"
          variant="interactive"
          onClick={() => {
            downloadTable(columns, tableData[selectedYear], 'source-data');
          }}
        >
          Download
        </Button>
      </div>
    </div>
  );
};
