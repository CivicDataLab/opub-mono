import React from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@radix-ui/react-collapsible';
import {
  Icon,
  Input,
  RadioGroup,
  RadioItem,
  Separator,
  Text,
} from 'opub-ui/src';

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
      'District Performance': [],
      'District Profile': [],
      Targets: [],
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
              filtered['District Performance'][0]
                ? filtered['District Performance'][0].slug
                : ''
            }
          >
            <div className="overflow-y-auto">
              <div
                className="flex flex-col gap-8 max-h-[680px]"
                ref={indicatorRef}
              >
                <IndicatorContent
                  heading="District Performance"
                  list={filtered['District Performance']}
                  disable={disable}
                />
                <IndicatorContent
                  heading="District Profile"
                  list={filtered['District Profile']}
                  disable={disable}
                />
                <IndicatorContent
                  heading="Targets"
                  list={filtered['Targets']}
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
  const [open, setOpen] = React.useState(false);
  return (
    <Collapsible asChild open={open} onOpenChange={setOpen}>
      <section>
        <CollapsibleTrigger className="border-none rounded-2 shadow-button bg-background hover:cursor-pointer w-full flex justify-between items-center py-2 px-4">
          <Text variant="headingSm" color={disable ? 'subdued' : 'default'}>
            {heading}
          </Text>
          <Icon source={open ? Icons.up : Icons.down} />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <Separator className="my-3" />
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
        </CollapsibleContent>
      </section>
    </Collapsible>
  );
};
