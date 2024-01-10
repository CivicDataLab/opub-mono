'use client'
import { useFetch } from '@/lib/api';
import dynamic from 'next/dynamic';
const MapChart = dynamic(
    () => import('opub-ui/viz').then((mod) => mod.MapChart),
    {
      ssr: false,
    }
  );
export const MapComponent = () => {

    const { data: mapFile, isLoading: mapLoading } = useFetch(
        `assam-mapFile`,
        `/files/assam.json`
      );

      const mapDataFn = (
        value: boolean,
        type: 'default' | 'hover' | 'selected' = 'default'
      ) => {
        return value
          ? `var(--mapareadistrict-${type})`
          : 'var(--mapareadistrict-disabled)';
      };
    return (
        !mapLoading ? (
            <MapChart
              features={mapFile.features}
              mapZoom={7}
              zoomOnClick={false}
              mapProperty="enabled"
              mapDataFn={mapDataFn}
              fillOpacity={1}
              className="w-full h-full"
            />
          ) : (
            <div className="flex justify-center items-center">Loading...</div>
          )
    )
}