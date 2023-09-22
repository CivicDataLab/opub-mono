import { indicatorFilter } from '../scheme.config';
import Icons from '@/components/icons';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@radix-ui/react-collapsible';
import { Checkbox, CheckboxGroup, Icon, Input, Separator, Text } from 'opub-ui';
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
    // set first 5 District Performance indicators as selected by default
    const firstFive = data['District Performance'].slice(0, 5);
    setIndicators((prev: any) => {
      return {
        ...prev,
        'District Performance': firstFive.map((item: any) => item.value),
      };
    });
  }, []);

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
    <div className="flex flex-col gap-4">
      <div>
        <Text variant="headingLg">Indicators</Text>
        <Text variant="bodyMd" className="mt-1 block">
          Select indicators to download data
        </Text>
      </div>
      <Input
        name="indicator-search"
        label="Indicator Search"
        labelHidden
        prefix={<Icon source={Icons.search} />}
        placeholder="Search"
        onChange={setSearch}
      />
      <Checkbox onChange={onSelectAll} name="all-indicators">
        Select all indicators
      </Checkbox>
      <div>
        {filtered ? (
          <div className="overflow-y-auto">
            <div
              className="flex flex-col gap-8 max-h-[680px]"
              ref={indicatorRef}
            >
              {['District Performance', 'District Profile', 'Targets'].map(
                (item) => (
                  <IndicatorContent
                    key={item}
                    heading={item}
                    list={filtered[item]}
                    onChange={onChange}
                    selected={selectedIndicators[item]}
                  />
                )
              )}
            </div>
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
  const [open, setOpen] = React.useState(false);
  return (
    <Collapsible asChild open={open} onOpenChange={setOpen}>
      <section>
        <CollapsibleTrigger className="border-none rounded-2 shadow-button bg-background hover:cursor-pointer w-full flex justify-between items-center py-2 px-4">
          <Text variant="headingSm">{heading}</Text>
          <Icon source={open ? Icons.up : Icons.down} />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <Separator className="my-3" />

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
        </CollapsibleContent>
      </section>
    </Collapsible>
  );
};
