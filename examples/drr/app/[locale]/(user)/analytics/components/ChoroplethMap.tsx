'use client';

import React from 'react';
import dynamic from 'next/dynamic';

import { useFetch } from '@/lib/api';
import { Text } from 'opub-ui';

const LeafletChoropleth = dynamic(
  () => import('opub-viz').then((mod) => mod.LeafletChoropleth),
  { ssr: false }
);

export function MapComponent() {
  const { data: mapFile, isLoading: mapLoading } = useFetch(
    `assam-mapFile`,
    `/files/assam.json`
  );

  const [hovered, setHovered] = React.useState('District');

  const mapDataFn = (value: number) => {
    return value >= 330
      ? '#a50f15'
      : value >= 325
      ? '#de2d26'
      : value >= 320
      ? '#fb6a4a'
      : value >= 315
      ? '#fc9272'
      : value >= 310
      ? '#fcbba1'
      : '#fee5d9';
  };

  return (
    <div className="bg-surfaceDefault shadow-basicMd p-4 flex gap-4 max-h-[682px]">
      <div className="relative w-[900px] rounded-05 shadow-basicMd hidden md:block">
        {!mapLoading && (
          <LeafletChoropleth
            features={mapFile.features}
            mapZoom={7.4}
            mapProperty={'dt_code'}
            zoomOnClick={false}
            legendData={[
              {
                color: '#a50f15',
                label: '331+',
              },
              {
                color: '#de2d26',
                label: '326 - 330',
              },
              {
                color: '#fb6a4a',
                label: '321 - 325',
              },
              {
                color: '#fc9272',
                label: '316 - 320',
              },
              {
                color: '#fcbba1',
                label: '311 - 315',
              },
              {
                color: '#fee5d9',
                label: '0 - 310',
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
      <Text>Frims Data</Text>
    </div>
  );
}
