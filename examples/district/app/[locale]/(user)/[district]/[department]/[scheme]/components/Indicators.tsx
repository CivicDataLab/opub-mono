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
  loading,
  indicatorRef,
  disable,
}: {
  data: { [key: string]: IndicatorsProps };
  scheme: string;
  loading: boolean;
  indicatorRef: any;
  disable: boolean;
}) => {
  if (loading)
    return (
      <div className="p-4">
        <Text variant="headingMd">Loading...</Text>
      </div>
    );

  const indicators = data[scheme];
  console.log(disable, 'aaa');

  return (
    <div className="flex flex-col gap-4">
      <Text variant="headingLg">Indicators</Text>
      <Input
        name="indicator-search"
        label="Indicator Search"
        labelHidden
        prefix={<Icon source={Icons.search} />}
        placeholder="Search"
      />
      <div>
        <RadioGroup
          onChange={(val) => {
            console.log(val);
          }}
          name="radio1"
          defaultValue={indicators['Targets'][0].slug}
        >
          <div className="overflow-y-auto">
            <div
              className="flex flex-col gap-8 max-h-[680px]"
              ref={indicatorRef}
            >
              <IndicatorContent
                heading="Targets"
                list={indicators['Targets']}
                disable={disable}
              />
              <IndicatorContent
                heading="District Profile"
                list={indicators['District Profile']}
                disable={disable}
              />
              <IndicatorContent
                heading="District Performance"
                list={indicators['District Performance']}
                disable={disable}
              />
            </div>
          </div>
        </RadioGroup>
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
      {list.map((child, index) => {
        return (
          <RadioItem
            key={child.label + index}
            value={child.slug}
            disabled={disable}
          >
            {child.label}
          </RadioItem>
        );
      })}
    </section>
  );
};
