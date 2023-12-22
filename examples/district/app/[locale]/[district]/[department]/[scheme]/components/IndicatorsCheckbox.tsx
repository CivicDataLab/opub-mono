import { indicatorFilter } from '../scheme.config';
import Icons from '@/components/icons';
import {
  Checkbox,
  CheckboxGroup,
  Icon,
  ScrollArea,
  Divider,
  Text,
  SearchInput,
} from 'opub-ui';
import React from 'react';

interface IndicatorsProps {
  Targets: {
    label: string;
    value: string;
  }[];
  'District Profile': {
    label: string;
    value: string;
  }[];
  'District Performance': {
    label: string;
    value: string;
  }[];
}

export const IndicatorsCheckbox = ({
  data,
  indicatorRef,
  setIndicators,
  selectedIndicators,
}: {
  data: IndicatorsProps;
  indicatorRef: any;
  setIndicators: any;
  selectedIndicators: any;
}) => {
  const [search, setSearch] = React.useState('');
  const [filtered, setFiltered] = React.useState<any>(data ? data : null);

  React.useEffect(() => {
    // filter indicators based on search
    if (search === '') {
      setFiltered(data);
      return;
    }

    const filteredData = {
      'District Performance': [],
      'District Profile': [],
      Targets: [],
    };
    indicatorFilter(data, search, filteredData);
    setFiltered(filteredData);
  }, [search, data]);

  function onChange(selected: any, key: string) {
    setIndicators((prev: any) => {
      return {
        ...prev,
        [key]: selected,
      };
    });
  }

  function onSelectAll(selected: boolean) {
    setIndicators((prev: any) => {
      const data: any = {
        'District Performance': [],
        'District Profile': [],
        Targets: [],
      };
      Object.keys(prev).forEach((key) => {
        data[key] = selected
          ? filtered[key].map((item: any) => item.value)
          : [];
      });
      return data;
    });
  }

  return (
    <div className="flex flex-col">
      <Text variant="headingLg">Indicators</Text>
      <Text variant="bodyMd" color="subdued" className="mt-2">
        Select indicators to download data
      </Text>
      <Divider className="my-4" />
      <SearchInput
        name="indicator-search"
        label="Indicator Search"
        onChange={setSearch}
      />

      <div className="mt-4">
        <Checkbox onChange={onSelectAll} name="all-indicators">
          Select all indicators
        </Checkbox>
        {filtered ? (
          <div className="mt-3">
            <ScrollArea>
              <div
                className="flex flex-col gap-4 max-h-[580px]"
                ref={indicatorRef}
              >
                {['District Performance', 'District Profile', 'Targets'].map(
                  (item, index) => (
                    <IndicatorContent
                      key={item + index}
                      heading={item}
                      list={filtered[item]}
                      onChange={onChange}
                      selected={selectedIndicators[item]}
                    />
                  )
                )}
              </div>
            </ScrollArea>
          </div>
        ) : (
          <Text variant="bodyMd">No indicators found</Text>
        )}
      </div>
    </div>
  );
};

const IndicatorContent = ({
  list,
  heading,
  onChange,
  selected,
}: {
  heading: string;
  onChange: any;
  selected: any;
  list: {
    label: string;
    value: string;
  }[];
}) => {
  return (
    <section className="pr-4">
      <div className=" border-none bg-surfaceDefault flex items-center gap-2 justify-between w-full">
        <Text variant="headingSm">{heading}</Text>
        <Icon source={Icons.info} color="default" />
      </div>
      <div>
        <Divider className="mt-2 mb-3" />
        {list.length > 0 ? (
          <CheckboxGroup
            onChange={(e) => onChange(e, heading)}
            name={`indicator-checkbox-${heading}`}
            title={heading}
            titleHidden
            options={list}
            value={selected}
          />
        ) : (
          <Text variant="bodyMd">No indicators found</Text>
        )}
      </div>
    </section>
  );
};
