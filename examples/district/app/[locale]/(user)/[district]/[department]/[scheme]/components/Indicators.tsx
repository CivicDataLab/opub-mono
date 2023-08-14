import React from 'react';
import { Icon, Input, RadioGroup, RadioItem, Separator, Text } from 'opub-ui';

import Icons from '@/components/icons';

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
  scheme,

  indicatorRef,
  disable,
  setIndicator,
}: {
  data: { [key: string]: IndicatorsProps };
  scheme: string;

  indicatorRef: any;
  disable: boolean;
  setIndicator: any;
}) => {
  const [search, setSearch] = React.useState('');
  const [filtered, setFiltered] = React.useState(data ? data[scheme] : null);

  // filter indicators based on search
  React.useEffect(() => {
    if (search === '') {
      setFiltered(data[scheme]);
      return;
    }
    const filteredData = {
      Targets: [],
      'District Profile': [],
      'District Performance': [],
    };
    Object.keys(data).forEach((key) => {
      const filteredList: any = data[key]['Targets'].filter((item) =>
        item.label.toLowerCase().includes(search.toLowerCase())
      );
      if (filteredList.length > 0) {
        filteredData['Targets'] = filteredData['Targets'].concat(filteredList);
      }
      const filteredList2: any = data[key]['District Profile'].filter((item) =>
        item.label.toLowerCase().includes(search.toLowerCase())
      );
      if (filteredList2.length > 0) {
        filteredData['District Profile'] =
          filteredData['District Profile'].concat(filteredList2);
      }
      const filteredList3: any = data[key]['District Performance'].filter(
        (item) => item.label.toLowerCase().includes(search.toLowerCase())
      );
      if (filteredList3.length > 0) {
        filteredData['District Performance'] =
          filteredData['District Performance'].concat(filteredList3);
      }
    });
    setFiltered(filteredData);
  }, [search, data[scheme]]);

  return (
    <div className="flex flex-col gap-4">
      <Text variant="headingLg">Indicators</Text>
      <Input
        name="indicator-search"
        label="Indicator Search"
        labelHidden
        prefix={<Icon source={Icons.search} />}
        placeholder="Search"
        onChange={setSearch}
      />
      <div>
        {filtered ? (
          <RadioGroup
            onChange={(val) => {
              setIndicator(val);
            }}
            name="indicator-radio"
            defaultValue={
              filtered['Targets'][0] ? filtered['Targets'][0].slug : ''
            }
          >
            <div className="overflow-y-auto">
              <div
                className="flex flex-col gap-8 max-h-[680px]"
                ref={indicatorRef}
              >
                <IndicatorContent
                  heading="Targets"
                  list={filtered['Targets']}
                  disable={disable}
                />
                <IndicatorContent
                  heading="District Profile"
                  list={filtered['District Profile']}
                  disable={disable}
                />
                <IndicatorContent
                  heading="District Performance"
                  list={filtered['District Performance']}
                  disable={disable}
                />
              </div>
            </div>
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
  disable,
}: {
  heading: string;
  list: {
    label: string;
    slug: string;
  }[];
  disable: boolean;
}) => {
  return (
    <section>
      <div className="mb-3">
        <Text variant="headingSm" color={disable ? 'subdued' : 'default'}>
          {heading}
        </Text>
        <Separator className="mt-3" />
      </div>
      {list.length > 0 ? (
        list.map((child, index) => {
          return (
            <RadioItem
              key={child.label + index}
              value={child.slug}
              disabled={disable}
            >
              {child.label}
            </RadioItem>
          );
        })
      ) : (
        <Text variant="bodyMd">No indicators found</Text>
      )}
    </section>
  );
};
