'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';

import { useFetch } from '@/lib/api';

const LeafletChoropleth = dynamic(
  () => import('opub-viz/src').then((mod) => mod.LeafletChoropleth),
  { ssr: false }
);

export function MapComponent({ boundary }: { boundary: string }) {

  const { data: mapFile, isLoading: mapLoading } = useFetch(
    `assam-mapFile`,
    `/files/assam.json`
  );

  const { data: revenueMapFile, isLoading: revenueMapLoading } = useFetch(
    `assam-RevenueMapFile`,
    `/files/assam_block.json`
  );

  const searchParams = useSearchParams();
  const indicatorParam = searchParams.get('indicator');
  const SubIndicatorParam = searchParams.get('sub-indicator');

  const [hovered, setHovered] = React.useState('District');

  const mapDataFn = (value: number) => {
    return value >= 80
      ? '#a50f15'
      : value >= 70
      ? '#de2d26'
      : value >= 50
      ? '#fb6a4a'
      : value >= 40
      ? '#fc9272'
      : value >= 30
      ? '#fcbba1'
      : '#fee5d9';
  };

  return (
    <div className="relative w-[900px] rounded-05 hidden md:block">
      {!mapLoading && !revenueMapLoading && (
        <LeafletChoropleth
          features={ boundary === 'district' ? mapFile.features : revenueMapFile.features}
          mapZoom={7.4}
          mapProperty={SubIndicatorParam || indicatorParam || 'composite-score'}
          zoomOnClick={false}
          legendData={[
            {
              color: '#a50f15',
              label: '80+',
            },
            {
              color: '#de2d26',
              label: '60 - 80',
            },
            {
              color: '#fb6a4a',
              label: '50 - 60',
            },
            {
              color: '#fc9272',
              label: '40 - 50',
            },
            {
              color: '#fcbba1',
              label: '30 - 40',
            },
            {
              color: '#fee5d9',
              label: '0 - 30',
            },
          ]}
          mapDataFn={mapDataFn}
          click={(e) => {
            const features = e.feature.properties;
            console.log('Features', features);
          }}
          hideLayers
          mouseover={(e) => {
            setHovered(e.feature.properties.district);
          }}
          mouseout={() => {
            setHovered('District');
          }}
        />
      )}
    </div>
  );
}
