'use client';

import { useFetch } from '@/lib/api';
import dynamic from 'next/dynamic';
import React from 'react';

const LeafletChoropleth = dynamic(
  () => import('opub-viz').then((mod) => mod.LeafletChoropleth),
  { ssr: false }
)

export function MapComponent() {
  const { data: mapFile, isLoading: mapLoading } = useFetch(
    `assam-mapFile`,
    `/files/assam.json`
  );

  const [hovered, setHovered] = React.useState('District');


  const mapDataFn = (value : number) => {
    return value
      ? 'var(--mapareadistrict-default)'
      : 'var(--mapareadistrict-disabled)';
  };

  return (
    <div className='w-[800px]'>
      
      {!mapLoading && (
          <LeafletChoropleth
            features={mapFile.features}
            mapZoom={7.4}
            zoomOnClick={false}
            mapProperty="enabled"
            mapDataFn={mapDataFn}
            click={(e) => {
              const features = e.feature.properties;
                console.log("Features" , features);
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
