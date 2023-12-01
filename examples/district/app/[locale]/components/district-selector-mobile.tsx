import { Button, Divider, Icon, SearchInput, Text, Tray } from 'opub-ui';
import {
  assamDistrictCategory,
  availableDistricts,
  filterDistricts,
} from '../home.config';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Icons from '@/components/icons';
import React from 'react';

export const DistrictSelectorMobile = () => {
  const [search, setSearch] = React.useState('');
  const [districtList, setDistrictList] = React.useState(assamDistrictCategory);

  // filter districtList based on search
  React.useEffect(() => {
    if (search) {
      const filteredDistricts = filterDistricts(search.toLowerCase());
      setDistrictList(filteredDistricts);
    } else {
      setDistrictList(assamDistrictCategory);
    }
  }, [search]);

  return (
    <div className="md:hidden flex p-3 mt-6 flex-col gap-4 bg-surfaceDefault shadow-basicSm">
      <div className="flex flex-col gap-2">
        <Text variant="headingLg" fontWeight="semibold">
          Districts
        </Text>
        <Text variant="bodyMd" color="subdued">
          Select district to view insights
        </Text>
        <Divider className="mt-1" />
      </div>
      <div className="flex flex-col gap-3">
        {availableDistricts.map((district) => (
          <Link
            key={district.slug}
            href={district.slug}
            className={cn(
              'flex items-center gap-2 cursor-pointer text-textInteractive hover:underline'
            )}
          >
            <Icon source={Icons.diamond} color="highlight" />
            <Text variant="bodyLg" fontWeight="medium" color="inherit">
              {district.name}
            </Text>
          </Link>
        ))}
      </div>
      <Tray
        trigger={
          <Button variant="interactive" kind="secondary">
            View All Districts
          </Button>
        }
        size="extended"
      >
        <div>
          <Text variant="headingLg" fontWeight="semibold">
            Districts
          </Text>
          <Text
            variant="bodyMd"
            fontWeight="regular"
            color="subdued"
            className="block mt-2"
          >
            Select district to view insights
          </Text>
          <Divider className="my-4" />
          <div className="flex flex-col gap-3">
            {availableDistricts.map((district) => (
              <Link
                key={district.slug}
                href={district.slug}
                className={cn(
                  'flex items-center gap-2 cursor-pointer text-textInteractive hover:underline'
                )}
              >
                <Icon source={Icons.diamond} color="highlight" />
                <Text variant="bodyLg" fontWeight="medium" color="inherit">
                  {district.name}
                </Text>
              </Link>
            ))}
          </div>
          <Divider className="my-4" />
          <SearchInput
            name="district-search"
            label="Search Search"
            onChange={setSearch}
            className="px-1"
          />

          <div className="mt-8 flex flex-col gap-4">
            {Object.values(districtList).map((category) => (
              <div key={category.name}>
                <div className="flex items-center justify-between gap-1">
                  <Text variant="headingSm" fontWeight="medium" color="subdued">
                    {category.name}
                  </Text>
                </div>
                <Divider className="mt-2 mb-3" />
                <div className="flex flex-col gap-3">
                  {category.districts.map((district) => (
                    <Text
                      key={district}
                      variant="bodyLg"
                      fontWeight="medium"
                      color="disabled"
                    >
                      {district}
                    </Text>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Tray>
    </div>
  );
};
