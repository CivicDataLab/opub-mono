import L from 'leaflet';

import 'tilelayer-canvas';

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

export function initMap(
  mapDom: HTMLElement,
  props: {
    center: any;
    zoom: number;
    zoomControl: boolean;
    mapDataFn: (value: number) => string;
    fillOpacity: number;
    color: string;
    weight: number;
    features: any;
    tile: string;
    maxZoom: number;
    code: string;
  },
  onTileLoad?: (map: any) => void
) {
  const map = L.map(mapDom, {
    center: L.latLng(props.center),
    zoom: props.zoom,
    zoomControl: props.zoomControl,
  });

  // @ts-expect-error
  L.geoJSON(features, {
    style: function (feature: any) {
      return {
        fillColor: props.mapDataFn(feature.properties[props.code]),
        fillOpacity: props.fillOpacity,
        color: props.color,
        weight: props.weight,
      };
    },
    // onEachFeature: function (feature, layer) {
    //   layer.bindPopup(
    //     `<b>${feature.properties.dt_name}</b><br/>${feature.properties.dt_code}`
    //   );
    // },
  }).addTo(map);

  let tiles = L.tileLayer
    // @ts-expect-error
    .canvas(props.tile, {
      maxZoom: props.maxZoom,
    })
    .addTo(map);

  return { map, tiles };
}