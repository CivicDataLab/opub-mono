import L from 'leaflet';

import { features } from '../../../assets/json/assam.json';

const legendData = [
  {
    label: '331+',
    color: '#a50f15',
  },
  {
    label: '326 - 330',
    color: '#de2d26',
  },
  {
    label: '321 - 325',
    color: '#fb6a4a',
  },
  {
    label: '316 - 320',
    color: '#fc9272',
  },
  {
    label: '311 - 315',
    color: '#fcbba1',
  },
  {
    label: '0 - 310',
    color: '#fee5d9',
  },
];

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

const legendHeading = {
  heading: 'Districts',
  subheading: 'Average Rainfall (mm)',
};

export function initMap(mapDom: HTMLElement) {
  const map = L.map(mapDom, {
    center: L.latLng(26.193, 92.3),
    zoom: 7.9,
    zoomControl: false,
  });

  // @ts-expect-error
  L.geoJSON(features, {
    style: function (feature: any) {
      return {
        fillColor: mapDataFn(feature.properties.dt_code),
        fillOpacity: 1,
        color: 'black',
        weight: 1,
      };
    },
    onEachFeature: function (feature, layer) {
      layer.bindPopup(
        `<b>${feature.properties.dt_name}</b><br/>${feature.properties.dt_code}`
      );
    },
  }).addTo(map);

  L.tileLayer(`https://tile.openstreetmap.org/{z}/{x}/{y}.png`, {
    maxZoom: 19,
  }).addTo(map);
}
