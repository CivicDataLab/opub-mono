import { indicatorFilter } from '../scheme.config';
import Icons from '@/components/icons';
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
  ScrollArea,
  Separator,
  Text,
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
  scheme,
  indicatorRef,
  setIndicator,
}: {
  data: { [key: string]: IndicatorsProps };
  scheme: string;

  indicatorRef: any;
  setIndicator: any;
}) => {
  const [search, setSearch] = React.useState('');
  const [filtered, setFiltered] = React.useState<any>(
    data ? data[scheme] : null
  );

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
    indicatorFilter(data[scheme], search, filteredData);
    setFiltered(filteredData);
  }, [search, data[scheme]]);

  return (
    <div className="flex flex-col">
      <Text variant="headingLg">Indicators</Text>
      <Text variant="bodyMd" color="subdued" className="mt-2">
        Select indicator to view insights
      </Text>
      <Separator className="my-4" />
      <Input
        name="indicator-search"
        label="Indicator Search"
        labelHidden
        prefix={<Icon source={Icons.search} />}
        placeholder="Search"
        onChange={setSearch}
      />
      <div className="mt-4">
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
            <div className="max-h-[500px] overflow-auto">
              <ScrollArea>
                <div className="flex flex-col gap-4 " ref={indicatorRef}>
                  {['District Performance', 'District Profile', 'Targets'].map(
                    (item) => (
                      <IndicatorContent
                        key={item}
                        heading={item}
                        list={filtered[item]}
                        defaultOpen={item === 'District Performance'}
                      />
                    )
                  )}
                </div>
              </ScrollArea>
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
  defaultOpen,
}: {
  heading: string;
  list: {
    label: string;
    slug: string;
  }[];
  defaultOpen: boolean;
}) => {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <Collapsible asChild open={open} onOpenChange={setOpen}>
      <section>
        <CollapsibleTrigger className="border-none bg-surfaceDefault flex items-center gap-2 justify-between w-full cursor-pointer">
          <Text variant="headingSm">{heading}</Text>
          <Icon source={open ? Icons.up : Icons.down} />
        </CollapsibleTrigger>
        <CollapsibleContent className="pr-4">
          <Separator className="mt-2 mb-3" />
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
        </CollapsibleContent>
      </section>
    </Collapsible>
  );
};
