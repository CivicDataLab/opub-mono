'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const MapChart = dynamic(
  () => import('opub-ui/viz').then((mod) => mod.MapChart),
  {
    ssr: false,
  }
);
export const MapComponent = ({
  indicator,
  regions,
  mapDataloading,
  mapData,
}: {
  indicator: string;
  regions: { label: string; value: string }[];
  mapDataloading: Boolean;
  mapData: any;
}) => {
  const [map, setMap] = React.useState<any>(null);
  const mapDataFn = (value: number) => {
    let colorString;
    switch (value) {
      case 1:
        colorString = '#4575b4';
        break;
      case 2:
        colorString = '#91bfdb';
        break;
      case 3:
        colorString = '#dbeaee';
        break;
      case 4:
        colorString = '#fee090';
        break;
      case 5:
        colorString = '#fc8d59';
        break;
      case 6:
        colorString = '#d73027';
        break;
      default:
        colorString = '#4575b4';
        break;
    }
    return colorString;
  };

  const legendData = [
    {
      label: '6 High Risk',
      color: '#d73027',
    },
    {
      label: '5',
      color: '#fc8d59',
    },
    {
      label: '4',
      color: '#fee090',
    },
    {
      label: '3',
      color: '#dbeaee',
    },
    {
      label: '2',
      color: '#91bfdb',
    },
    {
      label: '1 Low Risk',
      color: '#4575b4',
    },
  ];

  React.useEffect(() => {
    const regionsArray: string[] = [];
    regions?.forEach((region) => {
      regionsArray.push(region.label);
    });

    if (map) {
      const openPopups: any[] = [];

      map.eachLayer((layer: any) => {
        const regionName = layer.feature?.properties.name;

        if (regionsArray.includes(regionName)) {
          const popup = layer.getPopup();
          if (popup) {
            openPopups.push(popup);
          } else {
            layer
              .bindPopup(
                () => {
                  return `<span>${regionName}<br/></span>`;
                },
                {
                  maxWidth: 200,
                  closeButton: false,
                  autoClose: false,
                  closeOnEscapeKey: false,
                  closeOnClick: false,
                  id: `${regionName}`,
                  className: 'opub-leaflet-popup',
                }
              )
              .openPopup();
          }
        } else {
          layer.closePopup();
          layer.unbindPopup(); // Corrected typo
          // Remove the layer from the map
          if (layer.getPopup()) {
            map.removeLayer(layer);
          }
        }
      });

      // Close the last open popup if regionsArray is empty
      if (regionsArray.length === 0 && openPopups.length > 0) {
        const lastLayer = openPopups[openPopups.length - 1];
        map.removeLayer(lastLayer);
      }
    }
  }, [map, regions]);

  return !mapDataloading ? (
    <MapChart
      features={mapData?.features}
      mapZoom={7}
      mapProperty={indicator}
      zoomOnClick={false}
      legendData={legendData}
      mapDataFn={mapDataFn}
      fillOpacity={1}
      className="h-full w-full"
      setMap={setMap}
    />
  ) : (
    <div className="flex items-center justify-center">Loading...</div>
  );
};
