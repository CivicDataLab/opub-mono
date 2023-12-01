import { indicatorFilter } from '../scheme.config';
import Icons from '@/components/icons';
import {
  Icon,
  RadioGroup,
  RadioItem,
  ScrollArea,
  Divider,
  Text,
  SearchInput,
} from 'opub-ui';
import React from 'react';

interface IndicatorsProps {
  Targets: {
    label: string;
    slug: string;
  }[];
  'District Profile': {
    label: string;
    slug: string;
  }[];
  'District Performance': {
    label: string;
    slug: string;
  }[];
}

export const Indicators = ({
  data,
  indicatorRef,
  setIndicator,
  indicator,
}: {
  data: IndicatorsProps | null;
  indicatorRef: any;
  setIndicator: any;
  indicator?: string;
}) => {
  const [search, setSearch] = React.useState('');
  const [filtered, setFiltered] = React.useState<any>(data);

  // filter indicators based on search
  React.useEffect(() => {
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

  return (
    <div className="flex flex-col">
      <Text variant="headingLg">Indicators</Text>
      <Text variant="bodyMd" color="subdued" className="mt-2">
        Select indicator to view insights
      </Text>
      <Divider className="my-4" />
      <SearchInput
        name="indicator-search"
        label="Indicator Search"
        onChange={setSearch}
      />

      <div className="mt-4">
        {filtered ? (
          <RadioGroup
            onChange={setIndicator}
            name="indicator-radio"
            value={indicator}
          >
            <ScrollArea>
              <div
                className="flex flex-col gap-4 max-h-[500px]"
                ref={indicatorRef}
              >
                {['District Performance', 'District Profile', 'Targets'].map(
                  (item, index) => (
                    <IndicatorContent
                      key={item + index}
                      heading={item}
                      list={filtered[item]}
                    />
                  )
                )}
              </div>
            </ScrollArea>
          </RadioGroup>
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
}: {
  heading: string;
  list: {
    label: string;
    slug: string;
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
          list.map((child, index) => {
            return (
              <RadioItem key={child.label + index} value={child.slug}>
                {child.label}
              </RadioItem>
            );
          })
        ) : (
          <Text variant="bodyMd">No indicators found</Text>
        )}
      </div>
    </section>
  );
};
