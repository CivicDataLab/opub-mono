import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePRouter } from '@/hooks/use-prouter';
import { Icon, Input, Text } from 'opub-ui';

import { useFetch } from '@/lib/api';
import { cn } from '@/lib/utils';
import Icons from '@/components/icons';
import { assamDistricts } from '../home.config';

const LeafletChoropleth = dynamic(
  () => import('opub-viz').then((mod) => mod.LeafletChoropleth),
  { ssr: false }
);
export const DistrictSelector = () => {
  const [search, setSearch] = React.useState('');
  const [districtList, setDistrictList] = React.useState(assamDistricts);
  const router = usePRouter();
  const { data: mapFile, isLoading: mapLoading } = useFetch(
    `assam-mapFiles`,
    `/files/assam.json`
  );

  // filter districtList based on search
  React.useEffect(() => {
    if (search) {
      const filteredDistricts = assamDistricts.filter((district) =>
        district.name.toLowerCase().includes(search.toLowerCase())
      );
      setDistrictList(filteredDistricts);
    } else {
      setDistrictList(assamDistricts);
    }
  }, [search]);

  return (
    <div className="mx-auto px-2 mt-10 flex gap-10">
      <div className="w-full max-w-[768px] h-[520px] bg-surfaceHighlightSubdued">
        {!mapLoading && (
          <LeafletChoropleth
            features={mapFile.features}
            mapZoom={7.4}
            zoomOnClick={false}
            click={(e) => {
              const features = e.feature.properties;
              if (features.district)
                router.push(`/${features.district.toLowerCase()}`);
            }}
            hideLayers
          />
        )}
      </div>
      <div className="rounded-1 border-1 border-divider border-solid grow p-4">
        <Input
          name="district-search"
          placeholder="Search"
          label="Search District"
          labelHidden
          prefix={<Icon source={Icons.search} />}
          onChange={setSearch}
          value={search}
        />
        <div className="mt-4 overflow-y-scroll max-h-[360px]">
          {districtList.map((district) => (
            <Link
              key={district.slug}
              href={!district.enabled ? '#' : `/${district.slug}`}
              className={cn(
                'flex items-center gap-2 p-2 cursor-pointer text-interactive hover:text-interactiveHovered hover:underline',
                !district.enabled &&
                  'opacity-50 cursor-not-allowed pointer-events-none'
              )}
              aria-disabled={!district.enabled}
            >
              <Text variant="bodyLg" fontWeight="medium" color="inherit">
                {district.name}
              </Text>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
